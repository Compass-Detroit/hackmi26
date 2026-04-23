import crypto from "node:crypto";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function timingSafeEqualString(a, b) {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/** Dev-only: same-origin proxy so `fetch("/api/trigger-deploy")` works during `astro dev` (avoids browser CORS to n8n). */
function triggerDeployDevProxy() {
  return {
    name: "trigger-deploy-dev-proxy",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathOnly = (req.url ?? "").split("?")[0];
        if (
          pathOnly !== "/api/trigger-deploy" &&
          pathOnly !== "/api/trigger-deploy/"
        ) {
          next();
          return;
        }
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }
        const env = loadEnv(server.config.mode, process.cwd(), "");
        const secret = env.DEPLOY_TRIGGER_SECRET?.trim();
        if (secret) {
          const raw = await readRequestBody(req);
          let body = {};
          if (raw) {
            try {
              body = JSON.parse(raw);
            } catch {
              body = {};
            }
          }
          const auth = req.headers.authorization;
          let token = auth?.startsWith("Bearer ")
            ? auth.slice(7).trim()
            : undefined;
          if (token === undefined && typeof body.passphrase === "string") {
            token = body.passphrase;
          }
          if (token === undefined || !timingSafeEqualString(token, secret)) {
            res.statusCode = 401;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Unauthorized" }));
            return;
          }
        }

        const webhookUrl = env.N8N_VERCEL_DEPLOY_WEBHOOK_URL;
        if (!webhookUrl) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error:
                "Set N8N_VERCEL_DEPLOY_WEBHOOK_URL in .env for the deploy button locally",
            }),
          );
          return;
        }
        try {
          const upstream = await fetch(webhookUrl, { method: "POST" });
          const upstreamText = await upstream.text();
          if (!upstream.ok) {
            const snippet = upstreamText.slice(0, 800);
            console.error(
              "[trigger-deploy] n8n HTTP",
              upstream.status,
              snippet || "(empty body)",
            );
            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: `Webhook returned ${upstream.status}`,
                // Dev server only — helps debug n8n 4xx/5xx without opening n8n UI
                details: snippet || undefined,
              }),
            );
            return;
          }
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true }));
        } catch {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Proxy request failed" }));
        }
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://hackmichigan.com",
  base: "/",
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/deploy/"),
    }),
  ],
  vite: {
    plugins: [triggerDeployDevProxy()],
  },
});
