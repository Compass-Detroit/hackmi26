/**
 * Accessibility tests — automated a11y checks using Playwright.
 *
 * These don't replace a manual accessibility audit, but they catch
 * common issues: missing alt text, broken ARIA, heading hierarchy,
 * color contrast (when computed styles are available).
 */
import { test, expect, type Page } from "@playwright/test";

// These checks all hit the same route and are sensitive to startup contention.
// Keep this suite serial for deterministic CI behavior.
test.describe.configure({ mode: "serial" });

async function gotoPath(page: Page, path: string) {
  await page.goto(path, { waitUntil: "domcontentloaded" });
}

test.describe("Accessibility", () => {
  test("homepage has skip-to-content link", async ({ page }) => {
    await gotoPath(page, "/");
    const skipLink = page.locator('a.skip-link[href="#main-content"]');
    await expect(skipLink).toBeAttached();
  });

  test("homepage has a primary h1", async ({ page }) => {
    await gotoPath(page, "/");
    // Only check content h1s (not Astro dev toolbar etc.)
    const h1 = page.locator("main h1, .hero h1, .hero-title");
    expect(await h1.count()).toBeGreaterThanOrEqual(1);
  });

  test("all content images have alt attributes", async ({ page }) => {
    await gotoPath(page, "/");
    // Check only images within main content (exclude dev toolbar / svgs)
    const images = page.locator(
      "main img:not([alt]), .hero img:not([alt]), section img:not([alt])",
    );
    expect(await images.count()).toBe(0);
  });

  test("nav has aria-label", async ({ page }) => {
    await gotoPath(page, "/");
    const nav = page.locator("nav#site-navigation");
    await expect(nav).toHaveAttribute("aria-label", /navigation/i);
  });

  test("external links have rel=noopener", async ({ page }) => {
    await gotoPath(page, "/");
    // Only check main content links, not dev toolbar
    const relValues = await page
      .locator(
        'main a[target="_blank"], nav a[target="_blank"], footer a[target="_blank"]',
      )
      .evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("rel") ?? ""),
      );

    for (const rel of relValues) {
      expect(rel).toContain("noopener");
    }
  });

  test("hackathon page has a primary heading", async ({ page }) => {
    await gotoPath(page, "/hackathon/");
    const h1 = page.locator(".page-title, main h1");
    expect(await h1.count()).toBeGreaterThanOrEqual(1);
  });

  test("reduced motion media query exists in global styles", async ({
    page,
  }) => {
    await gotoPath(page, "/");

    const hasReducedMotion = await page.evaluate(() => {
      const sheets = Array.from(document.styleSheets);
      for (const sheet of sheets) {
        try {
          const rules = Array.from(sheet.cssRules);
          for (const rule of rules) {
            if (
              rule instanceof CSSMediaRule &&
              rule.conditionText?.includes("prefers-reduced-motion")
            ) {
              return true;
            }
          }
        } catch {
          // Cross-origin sheets throw — skip
        }
      }
      return false;
    });
    expect(hasReducedMotion).toBe(true);
  });
});

test.describe("Accessibility — Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("mobile menu has aria-hidden when closed", async ({ page }) => {
    await gotoPath(page, "/");
    const menu = page.locator("#mobile-menu");
    await expect(menu).toHaveAttribute("aria-hidden", "true");
  });

  test("mobile menu button has aria-expanded", async ({ page }) => {
    await gotoPath(page, "/");
    const btn = page.locator("#mobile-menu-btn");
    await expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  test("mobile menu exposes dialog semantics", async ({ page }) => {
    await gotoPath(page, "/");
    const menu = page.locator("#mobile-menu");

    await expect(menu).toHaveAttribute("role", "dialog");
    await expect(menu).toHaveAttribute("aria-modal", "true");
  });

  test("mobile menu moves focus to first nav link when opened", async ({
    page,
  }) => {
    await gotoPath(page, "/");
    const btn = page.locator("#mobile-menu-btn");
    const menu = page.locator("#mobile-menu");
    await btn.click();

    await expect(menu).toHaveClass(/open/);
    await expect(btn).toHaveAttribute("aria-expanded", "true");

    await expect(page.locator(".mobile-nav-link").first()).toBeFocused();
  });
});
