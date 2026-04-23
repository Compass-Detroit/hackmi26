/**
 * CMS integration tests — verify Sanity-driven pages render correctly.
 *
 * Astro's preview server injects a dev toolbar that adds extra elements
 * to the DOM. Use specific selectors (class names, data attrs)
 * instead of raw `h1` to avoid matching toolbar headings.
 */
import { test, expect, type Page } from "@playwright/test";

async function gotoPath(page: Page, path: string) {
  return page.goto(path, { waitUntil: "domcontentloaded" });
}

test.describe("Hackathon Projects Page", () => {
  test("renders project cards or empty state", async ({ page }) => {
    await gotoPath(page, "/hackathon/");

    const cards = page.locator("article, .glass-card");
    const empty = page.locator(".empty-state");

    const cardCount = await cards.count();
    const emptyCount = await empty.count();

    expect(cardCount + emptyCount).toBeGreaterThan(0);
  });

  test("page header has title and subtitle", async ({ page }) => {
    await gotoPath(page, "/hackathon/");
    await expect(page.locator(".page-title")).toContainText("Hackathon");
    await expect(page.locator(".page-subtitle")).toBeVisible();
  });
});

test.describe("Project Detail Page", () => {
  test("renders project detail if data exists", async ({ page }) => {
    const response = await gotoPath(
      page,
      "/hackathon/project/mittenharvest-ai/",
    );

    if (!response || response.status() === 404) {
      test.skip();
      return;
    }

    // Use the specific class for the project title
    await expect(page.locator(".project-title")).toBeVisible();
  });

  test("has meta description", async ({ page }) => {
    const response = await gotoPath(
      page,
      "/hackathon/project/mittenharvest-ai/",
    );

    if (!response || response.status() === 404) {
      test.skip();
      return;
    }

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");

    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(0);
  });
});

test.describe("Team Detail Page", () => {
  test("renders team page if teams exist", async ({ page }) => {
    const response = await gotoPath(page, "/hackathon/team/grownsense/");

    if (!response || response.status() === 404) {
      test.skip();
      return;
    }

    // Use specific class to avoid matching Astro dev toolbar h1s
    await expect(page.locator(".team-name")).toBeVisible();
  });
});
