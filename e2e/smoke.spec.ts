/**
 * Smoke tests — verify the core pages load without errors.
 *
 * "canary in the coal mine"
 * If these fail, something big / fundamental is broken (bad build, missing env var, Sanity outage, etc.).
 */
import { test, expect, type Page } from "@playwright/test";

async function gotoPath(page: Page, path: string) {
  await page.goto(path, { waitUntil: "domcontentloaded" });
}

test.describe("Smoke Tests", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await gotoPath(page, "/");
    await expect(page).toHaveTitle(/HackMI/);
  });

  test("homepage has no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await gotoPath(page, "/");

    // Filter out known non-critical warnings
    const realErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("deprecated") &&
        !e.includes("DevTools") &&
        !e.includes("Outdated Optimize Dep"),
    );
    expect(realErrors).toEqual([]);
  });

  test("projects page loads", async ({ page }) => {
    await gotoPath(page, "/projects/");
    await expect(page).toHaveTitle(/Projects/i);
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    await gotoPath(page, "/this-does-not-exist/");
    // Astro SSG serves 404.html for unknown paths
    await expect(page.locator(".eyebrow")).toContainText("404");
  });
});
