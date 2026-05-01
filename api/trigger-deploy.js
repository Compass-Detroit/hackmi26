/**
 * Vercel Serverless Function — forwards POST to n8n so the browser never calls the webhook directly (avoids CORS).
 *
 * Uses the Web Fetch handler shape expected by current Vercel Node runtimes:
 * https://vercel.com/docs/functions/runtimes/node-js
 *
 * Environment (Vercel + optional .env for local / `vercel dev`):
 *   N8N_VERCEL_DEPLOY_WEBHOOK_URL — production n8n webhook URL (required)
 *   DEPLOY_TRIGGER_SECRET — required in production; require matching JSON `{ "passphrase": "..." }`
 *     or header `Authorization: Bearer <secret>` (shared team passphrase, not user accounts)
 */
import crypto from "node:crypto";
import {
  SUCCESS_COOLDOWN_MS,
  clientKeyFromHeaders,
  createDeployRateLimiter,
} from "../src/lib/deploy/rate-limit.js";

const limiter = createDeployRateLimiter();

/**
 * @param {string} a
 * @param {string} b
 */
function timingSafeEqualString(a, b) {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/** @param {Request} request */
function checkRateLimit(request) {
  const key = clientKeyFromHeaders((name) => request.headers.get(name));
  return limiter.check(key);
}

export default {
  /**
   * @param {Request} request
   */
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const rate = checkRateLimit(request);
    if (!rate.allowed) {
      const retryAfterSeconds = Math.ceil(rate.retryAfterMs / 1000);
      return Response.json(
        {
          error: "Too many requests. Retry later.",
          retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
          },
        },
      );
    }

    const isProd = process.env.NODE_ENV === "production";
    const secret = process.env.DEPLOY_TRIGGER_SECRET?.trim();
    if (isProd && !secret) {
      return Response.json(
        { error: "DEPLOY_TRIGGER_SECRET must be configured in production" },
        { status: 500 },
      );
    }

    if (secret) {
      let body = {};
      try {
        const ct = request.headers.get("content-type") ?? "";
        if (ct.includes("application/json")) {
          body = await request.json();
        }
      } catch {
        body = {};
      }
      const auth = request.headers.get("authorization");
      let token = auth?.startsWith("Bearer ")
        ? auth.slice(7).trim()
        : undefined;
      if (token === undefined && typeof body.passphrase === "string") {
        token = body.passphrase;
      }
      if (token === undefined || !timingSafeEqualString(token, secret)) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const webhookUrl = process.env.N8N_VERCEL_DEPLOY_WEBHOOK_URL;
    if (!webhookUrl || typeof webhookUrl !== "string") {
      return Response.json(
        { error: "N8N_VERCEL_DEPLOY_WEBHOOK_URL is not configured" },
        { status: 500 },
      );
    }

    try {
      const upstream = await fetch(webhookUrl, {
        method: "POST",
        headers: { Accept: "application/json" },
      });

      if (!upstream.ok) {
        return Response.json(
          { error: `Webhook returned ${upstream.status}` },
          { status: 502 },
        );
      }

      limiter.applySuccessCooldown(rate.key);
      return Response.json({ ok: true, cooldownMs: SUCCESS_COOLDOWN_MS });
    } catch {
      return Response.json({ error: "Proxy request failed" }, { status: 500 });
    }
  },
};
