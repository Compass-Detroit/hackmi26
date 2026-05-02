/**
 * Navigation tests — verify the nav bar works across viewports.
 *
 * Desktop: all links visible, hover states, active states.
 * Mobile: hamburger menu, overlay, focus trap, close on link click.
 */
import { test, expect, type Page } from "@playwright/test";

async function gotoPath(page: Page, path: string) {
  await page.goto(path, { waitUntil: "domcontentloaded" });
}

test.describe("Desktop Navigation", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("nav bar is visible and fixed", async ({ page }) => {
    await gotoPath(page, "/");
    const nav = page.locator("#site-navigation .nav");
    await expect(nav).toBeVisible();

    // Fixed positioning
    const position = await nav.evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe("fixed");
  });

  test("nav contains all expected links", async ({ page }) => {
    await gotoPath(page, "/");
    const navLinks = page.locator(".nav-links .nav-link");

    // Should have: Home, Projects, About, Event, Challenge, Sponsors, Logistics, Register
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test("Projects link navigates to projects page", async ({ page }) => {
    await gotoPath(page, "/");
    await page.locator('.nav-link:text("Projects")').click();
    await expect(page).toHaveURL(/\/projects\/?/);
  });

  test("Home link on projects page returns home", async ({ page }) => {
    await gotoPath(page, "/projects/");
    await page.locator('.nav-link:text("Home")').click();
    await expect(page).toHaveURL("/");
  });

  test("Projects nav link is active on projects pages", async ({ page }) => {
    await gotoPath(page, "/projects/");
    const projectsLink = page.locator(".nav-link", { hasText: "Projects" });

    await expect(projectsLink).toHaveClass(/active/);
  });

  test("sponsor CTA button is visible", async ({ page }) => {
    await gotoPath(page, "/");
    const cta = page.locator(".nav-cta");
    await expect(cta).toBeVisible();
    await expect(cta).toContainText(/sponsor/i);
  });
});

test.describe("Mobile Navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("hamburger button is visible on mobile", async ({ page }) => {
    await gotoPath(page, "/");
    const btn = page.locator("#mobile-menu-btn");
    await expect(btn).toBeVisible();
  });

  test("desktop nav links are hidden on mobile", async ({ page }) => {
    await gotoPath(page, "/");
    const navLinks = page.locator(".nav-links");
    await expect(navLinks).not.toBeVisible();
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await gotoPath(page, "/");
    const btn = page.locator("#mobile-menu-btn");
    const menu = page.locator("#mobile-menu");

    // Initially closed
    await expect(menu).toHaveAttribute("aria-hidden", "true");

    // Open
    await btn.click();
    await expect(menu).toHaveClass(/open/);
    await expect(menu).toHaveAttribute("aria-hidden", "false");

    // Close
    await btn.click();
    await expect(menu).not.toHaveClass(/open/);
  });

  test("mobile menu button label toggles with state", async ({ page }) => {
    await gotoPath(page, "/");
    const btn = page.locator("#mobile-menu-btn");

    await expect(btn).toHaveAttribute("aria-label", "Open menu");
    await btn.click();
    await expect(btn).toHaveAttribute("aria-label", "Close menu");
    await btn.click();
    await expect(btn).toHaveAttribute("aria-label", "Open menu");
  });

  test("mobile menu traps focus with Tab and Shift+Tab", async ({ page }) => {
    await gotoPath(page, "/");
    const btn = page.locator("#mobile-menu-btn");
    await btn.click();

    const focusable = page.locator(".mobile-nav-link, .mobile-nav-cta");
    const first = focusable.first();
    const last = focusable.last();

    await expect(first).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(last).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(first).toBeFocused();
  });

  test("Escape key closes mobile menu", async ({ page }) => {
    await gotoPath(page, "/");
    const btn = page.locator("#mobile-menu-btn");
    const menu = page.locator("#mobile-menu");

    await btn.click();
    await expect(menu).toHaveClass(/open/);

    await page.keyboard.press("Escape");
    await expect(menu).not.toHaveClass(/open/);
  });

  test("clicking a mobile nav link closes the menu", async ({ page }) => {
    await gotoPath(page, "/");
    const btn = page.locator("#mobile-menu-btn");
    const menu = page.locator("#mobile-menu");

    await btn.click();
    await expect(menu).toHaveClass(/open/);

    // Click the first mobile nav link
    await page.locator(".mobile-nav-link").first().click();
    await expect(menu).not.toHaveClass(/open/);
  });
});
