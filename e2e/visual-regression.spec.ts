/**
 * Visual regression tests — create and compare `baseline` screenshots
 *
 * How it works:
 *   First run creates `baseline` screenshots in e2e/<spec>.ts-snapshots/
 *   Subsequent runs compare against the `baseline` files
 *   If a screenshot differs beyond the threshold, the test fails
 *   To update `baseline` screenshots: `npx playwright test --update-snapshots`
 *
 * These catch unintended visual changes — CSS regressions, broken
 * layouts, spacing issues that unit tests can't detect.
 */
import { test, expect, type Page } from "@playwright/test";

async function prepareVisualPage(page: Page, path: string): Promise<void> {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await page.evaluate(async () => {
    if ("fonts" in document) {
      await document.fonts.ready;
    }
  });

  // Freeze animations and hide floating controls that add visual noise.
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
      #three-pause-toggle {
        opacity: 0 !important;
      }
    `,
  });
}

test.describe("Visual Regression — Desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("homepage hero section", async ({ page }) => {
    await prepareVisualPage(page, "/");

    const hero = page.locator(".hero");
    await expect(hero).toBeVisible();
    await expect(hero).toHaveScreenshot("homepage-hero-desktop.png", {
      maxDiffPixelRatio: 0.02,
    });
  });

  test("navigation bar", async ({ page }) => {
    await prepareVisualPage(page, "/");

    const nav = page.locator(".nav");
    await expect(nav).toBeVisible();
    await expect(nav).toHaveScreenshot("nav-desktop.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("projects grid", async ({ page }) => {
    await prepareVisualPage(page, "/projects/");
    await expect(page.locator(".project-grid")).toBeVisible();

    await expect(page).toHaveScreenshot("projects-grid-desktop.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
});

test.describe("Visual Regression — Tablet", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test("homepage hero section", async ({ page }) => {
    await prepareVisualPage(page, "/");

    const hero = page.locator(".hero");
    await expect(hero).toBeVisible();
    await expect(hero).toHaveScreenshot("homepage-hero-tablet.png", {
      maxDiffPixelRatio: 0.02,
    });
  });

  test("tablet menu overlay", async ({ page }) => {
    await prepareVisualPage(page, "/");
    const menu = page.locator("#mobile-menu");
    await page.locator("#mobile-menu-btn").click();

    await expect(menu).toHaveClass(/open/);
    await expect(page).toHaveScreenshot("mobile-menu-open-tablet.png", {
      maxDiffPixelRatio: 0.02,
    });
  });
});

test.describe("Visual Regression — Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("homepage hero section", async ({ page }) => {
    await prepareVisualPage(page, "/");

    const hero = page.locator(".hero");
    await expect(hero).toBeVisible();
    await expect(hero).toHaveScreenshot("homepage-hero-mobile.png", {
      maxDiffPixelRatio: 0.02,
    });
  });

  test("navigation bar mobile", async ({ page }) => {
    await prepareVisualPage(page, "/");

    const nav = page.locator(".nav");
    await expect(nav).toBeVisible();
    await expect(nav).toHaveScreenshot("nav-mobile.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("mobile menu overlay", async ({ page }) => {
    await prepareVisualPage(page, "/");
    const menu = page.locator("#mobile-menu");
    await page.locator("#mobile-menu-btn").click();

    await expect(menu).toHaveClass(/open/);

    await expect(page).toHaveScreenshot("mobile-menu-open.png", {
      maxDiffPixelRatio: 0.02,
    });
  });
});
