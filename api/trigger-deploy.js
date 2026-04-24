/**
 * Vercel Serverless Function — forwards POST to n8n so the browser never calls the webhook directly (avoids CORS).
 *
 * Uses the Web Fetch handler shape expected by current Vercel Node runtimes:
 * https://vercel.com/docs/functions/runtimes/node-js
 *
 * Environment (Vercel + optional .env for local / `vercel dev`):
 *   N8N_VERCEL_DEPLOY_WEBHOOK_URL — production n8n webhook URL (required)
 *   DEPLOY_TRIGGER_SECRET — optional; if set, require matching JSON `{ "passphrase": "..." }`
 *     or header `Authorization: Bearer <secret>` (shared team passphrase, not user accounts)
 */
import crypto from "node:crypto";

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

export default {
  /**
   * @param {Request} request
   */
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const secret = process.env.DEPLOY_TRIGGER_SECRET?.trim();
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

      return Response.json({ ok: true });
    } catch {
      return Response.json({ error: "Proxy request failed" }, { status: 500 });
    }
  },
};
