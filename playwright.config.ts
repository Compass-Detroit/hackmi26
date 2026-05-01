import { defineConfig } from "@playwright/test";

/**
 * Playwright config for E2E tests against the built Astro site.
 *
 * How it works:
 *   1. `webServer` runs `npm run build && npm run preview` before tests
 *   2. Playwright opens a real Chromium browser
 *   3. Tests navigate to pages and assert on what's visible
 *   4. Visual regression snapshots use Playwright's default
 *      e2e/<spec>.ts-snapshots/ structure.
 */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  retries: 1,
  // The webServer build takes ~40s on a cold run.
  // Give each test enough headroom to wait for the server before it starts.
  timeout: 90_000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:4321",
    // Avoid requiring `npx playwright install` for local runs.
    // CI uses `npx playwright install --with-deps chromium`.
    channel: process.env.CI ? undefined : "chrome",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    viewport: { width: 1440, height: 900 },
  },
  expect: {
    timeout: 15_000,
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      scale: "css",
    },
  },
  webServer: {
    command: "npm run build && npm run preview",
    port: 4321,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
