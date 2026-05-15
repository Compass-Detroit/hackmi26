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

/**
 * Open the first team page via a project detail's team link.
 * Returns false when CMS has no project/team data (unless E2E_REQUIRE_CMS_DATA).
 */
async function openFirstTeamPage(page: Page): Promise<boolean> {
  const hasProject = await openFirstProjectFromListing(page);
  if (!hasProject) return false;

  const teamLink = page.locator(".team-link").first();
  await expect(teamLink).toBeVisible();
  const href = await teamLink.getAttribute("href");
  expect(href).toMatch(/^\/projects\/team\/[^/]+\/$/);
  await gotoPath(page, href!);
  await expect(page).toHaveURL(/\/projects\/team\/[^/]+\/$/);
  await expect(page.locator(".team-name")).toBeVisible();
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
    await openFirstTeamPage(page);
  });

  test("team page content uses the narrow page container", async ({ page }) => {
    const hasTeam = await openFirstTeamPage(page);
    if (!hasTeam) return;

    const narrow = page.locator(".page-container--narrow");
    await expect(narrow).toBeVisible();
    await expect(narrow.locator(".team-name")).toBeVisible();

    const projectsSection = page.locator(".projects-section");
    const projectsCount = await projectsSection.count();
    expect(projectsCount).toBeLessThanOrEqual(1);
    if (projectsCount > 0) {
      await expect(narrow.locator(".projects-section")).toBeVisible();
    }
  });

  test("team projects section renders compact project cards when present", async ({
    page,
  }) => {
    const hasTeam = await openFirstTeamPage(page);
    if (!hasTeam) return;

    const projectsSection = page.locator(".projects-section");
    if ((await projectsSection.count()) === 0) return;

    await expect(projectsSection.locator("h2")).toContainText("Projects");
    const compactCards = projectsSection.locator("a.project-card--compact");
    await expect(compactCards.first()).toBeVisible();
    expect(await compactCards.count()).toBeGreaterThan(0);
  });

  test("team description renders portable text when present", async ({
    page,
  }) => {
    const hasTeam = await openFirstTeamPage(page);
    if (!hasTeam) return;

    const descriptionParagraphs = page.locator(
      ".page-container--narrow .team-description p",
    );
    if ((await descriptionParagraphs.count()) === 0) return;

    await expect(descriptionParagraphs.first()).toBeVisible();
  });

  test("team members section renders member cards when present", async ({
    page,
  }) => {
    const hasTeam = await openFirstTeamPage(page);
    if (!hasTeam) return;

    const membersSection = page.locator(".members-section");
    if ((await membersSection.count()) === 0) return;

    await expect(membersSection.locator("h2")).toContainText("Team Members");
    const memberCards = membersSection.locator(".member-card");
    await expect(memberCards.first()).toBeVisible();
    expect(await memberCards.count()).toBeGreaterThan(0);
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
