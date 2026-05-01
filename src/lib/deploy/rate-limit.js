/**
 * Shared in-memory rate limiter for the deploy-trigger endpoint.
 *
 * Used by:
 *   - `api/trigger-deploy.js`   (Vercel serverless, Web Fetch Request)
 *   - `astro.config.mjs`        (Astro/Vite dev middleware, Node IncomingMessage)
 *
 * Each runtime calls `createDeployRateLimiter()` to get its own state map; we
 * never share state across processes (and Vercel functions are stateless per
 * invocation, so the limiter only meaningfully throttles within a single warm
 * lambda — that's fine for the deploy button's threat model).
 *
 * Header lookup is abstracted via the `getHeader` arg so the same code works
 * for both `request.headers.get(name)` (Fetch) and `req.headers[name]` (Node).
 */

export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_ATTEMPTS = 12;
export const SUCCESS_COOLDOWN_MS = 20_000;
const PRUNE_THRESHOLD = 500;

/** @typedef {{ windowStart: number; attempts: number; cooldownUntil: number }} RateState */
/** @typedef {{ allowed: true; key: string } | { allowed: false; retryAfterMs: number }} RateResult */

/**
 * @param {(name: string) => string | null | undefined} getHeader
 * @returns {string}
 */
export function clientKeyFromHeaders(getHeader) {
  const forwarded = getHeader("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = getHeader("x-real-ip")?.trim();
  return forwarded || realIp || "unknown";
}

/**
 * Build a per-process rate limiter. Returns an object with `check` and
 * `applySuccessCooldown` so callers don't have to manage the Map directly.
 */
export function createDeployRateLimiter() {
  /** @type {Map<string, RateState>} */
  const state = new Map();

  function prune(now) {
    if (state.size < PRUNE_THRESHOLD) return;
    for (const [key, s] of state) {
      if (
        now - s.windowStart > RATE_LIMIT_WINDOW_MS * 5 &&
        s.cooldownUntil <= now
      ) {
        state.delete(key);
      }
    }
  }

  /**
   * @param {string} key  client identifier (typically IP-derived)
   * @returns {RateResult}
   */
  function check(key) {
    const now = Date.now();
    prune(now);

    const s = state.get(key) ?? {
      windowStart: now,
      attempts: 0,
      cooldownUntil: 0,
    };

    if (now - s.windowStart >= RATE_LIMIT_WINDOW_MS) {
      s.windowStart = now;
      s.attempts = 0;
    }

    if (s.cooldownUntil > now) {
      state.set(key, s);
      return { allowed: false, retryAfterMs: Math.max(1000, s.cooldownUntil - now) };
    }

    if (s.attempts >= RATE_LIMIT_ATTEMPTS) {
      state.set(key, s);
      return {
        allowed: false,
        retryAfterMs: Math.max(1000, RATE_LIMIT_WINDOW_MS - (now - s.windowStart)),
      };
    }

    s.attempts += 1;
    state.set(key, s);
    return { allowed: true, key };
  }

  /** Mark `key` as successful and start the cool-down window. */
  function applySuccessCooldown(key) {
    const s = state.get(key);
    if (!s) return;
    s.cooldownUntil = Date.now() + SUCCESS_COOLDOWN_MS;
    state.set(key, s);
  }

  return { check, applySuccessCooldown };
}
