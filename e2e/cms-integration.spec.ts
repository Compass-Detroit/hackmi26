/**
 * CMS integration tests — verify Sanity-driven pages render correctly.
 *
 * Astro's preview server injects a dev toolbar that adds extra elements
 * to the DOM. Use specific selectors (class names, data attrs)
 * instead of raw `h1` to avoid matching toolbar headings.
 */
import { test, expect, type Page } from "@playwright/test";

const PROJECTS_PATH = "/projects/";
const requireCmsData = process.env.E2E_REQUIRE_CMS_DATA === "true";

async function gotoPath(page: Page, path: string) {
  return page.goto(path, { waitUntil: "domcontentloaded" });
}

/**
 * Navigate to projects listing, open first project card if present.
 * Returns false (and asserts empty-state) when CMS has no data,
 * unless E2E_REQUIRE_CMS_DATA=true forces a hard failure.
 */
async function openFirstProjectFromListing(page: Page): Promise<boolean> {
  await gotoPath(page, PROJECTS_PATH);

  const cards = page.locator("article.project-card");
  const empty = page.locator(".empty-state");
  const cardCount = await cards.count();

  if (cardCount === 0) {
    await expect(empty).toBeVisible();
    if (requireCmsData) {
      expect(cardCount).toBeGreaterThan(0);
    }
    return false;
  }

  const firstLink = cards.first().locator("a.title-link");
  await expect(firstLink).toBeVisible();
  const href = await firstLink.getAttribute("href");
  expect(href).toMatch(/^\/projects\/project\/[^/]+\/$/);
  await gotoPath(page, href!);
  await expect(page).toHaveURL(/\/projects\/project\/[^/]+\/$/);
  await expect(page.locator(".project-title")).toBeVisible();
  return true;
}

test.describe("Projects Page", () => {
  test("renders project cards or empty state", async ({ page }) => {
    await gotoPath(page, PROJECTS_PATH);

    const cards = page.locator("article.project-card");
    const empty = page.locator(".empty-state");

    const cardCount = await cards.count();
    const emptyCount = await empty.count();

    expect(cardCount + emptyCount).toBeGreaterThan(0);
  });

  test("page header has title and subtitle", async ({ page }) => {
    await gotoPath(page, PROJECTS_PATH);
    await expect(page.locator(".page-title")).toContainText("Projects");
    await expect(page.locator(".page-subtitle")).toBeVisible();
  });
});

test.describe("Project Detail Page", () => {
  test("project detail is reachable from listing", async ({ page }) => {
    await openFirstProjectFromListing(page);
  });

  test("project detail has meta description when route is reachable", async ({
    page,
  }) => {
    const hasProject = await openFirstProjectFromListing(page);
    if (!hasProject) return;

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");

    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(0);
  });
});

test.describe("Team Detail Page", () => {
  test("team detail is reachable from project team link", async ({ page }) => {
    const hasProject = await openFirstProjectFromListing(page);
    if (!hasProject) return;

    const teamLink = page.locator(".team-link").first();
    await expect(teamLink).toBeVisible();
    const href = await teamLink.getAttribute("href");
    expect(href).toMatch(/^\/projects\/team\/[^/]+\/$/);
    await gotoPath(page, href!);
    await expect(page).toHaveURL(/\/projects\/team\/[^/]+\/$/);
    await expect(page.locator(".team-name")).toBeVisible();
  });
});

test.describe("Variants Page", () => {
  test("internal variants route is noindex", async ({ page }) => {
    await gotoPath(page, "/projects/variants/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/i,
    );
  });

  test("variant image URLs are resolved, not object stringified", async ({
    page,
  }) => {
    await gotoPath(page, "/projects/variants/");
    const images = page.locator(".hz-card__image img, .spot-card__bg img");
    const count = await images.count();
    if (count === 0) return;

    const srcs = await images.evaluateAll((nodes) =>
      nodes
        .map((node) => node.getAttribute("src") || "")
        .filter((value) => value.length > 0),
    );

    expect(srcs.length).toBeGreaterThan(0);
    for (const src of srcs) {
      expect(src).not.toContain("[object Object]");
    }
  });
});
