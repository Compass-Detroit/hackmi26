/**
 * Sponsors section tests — verify sponsor tiers render correctly.
 *
 * Checks heading structure, logo presence, link attributes, and the
 * placeholder slot pattern for open-inventory tiers.
 */
import { test, expect, type Page } from "@playwright/test";

async function gotoHome(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
}

test.describe("Sponsors Section", () => {
  test("sponsors section is present with correct heading", async ({ page }) => {
    await gotoHome(page);
    const section = page.locator("#sponsors");
    await expect(section).toBeAttached();
    await expect(section.locator("#sponsors-heading")).toContainText(
      "Sponsors",
    );
  });

  test("all tier headings are rendered", async ({ page }) => {
    await gotoHome(page);
    const tierHeadings = ["Diamond", "Platinum", "Gold", "Community", "Media"];
    for (const heading of tierHeadings) {
      await expect(
        page.locator("#sponsors").getByRole("heading", { name: heading }),
        `tier heading "${heading}" should be visible`,
      ).toBeAttached();
    }
  });

  test("sponsor logo images have alt text", async ({ page }) => {
    await gotoHome(page);
    const imagesWithoutAlt = page.locator("#sponsors img:not([alt])");
    expect(await imagesWithoutAlt.count()).toBe(0);
  });

  test("sponsor logo images have non-empty alt text", async ({ page }) => {
    await gotoHome(page);
    const alts = await page
      .locator("#sponsors img.sponsor-logo")
      .evaluateAll((imgs) => imgs.map((img) => (img as HTMLImageElement).alt));

    expect(alts.length).toBeGreaterThan(0);
    for (const alt of alts) {
      expect(alt.trim(), `sponsor logo has empty alt`).not.toBe("");
    }
  });

  test("linked sponsor logos have rel=sponsored and rel=noopener", async ({
    page,
  }) => {
    await gotoHome(page);
    const linkedLogos = page.locator("#sponsors a.sponsor-logo-link");
    const count = await linkedLogos.count();

    // IBM has an href — so at least one linked logo must exist
    expect(count).toBeGreaterThan(0);

    const rels = await linkedLogos.evaluateAll((anchors) =>
      anchors.map((a) => a.getAttribute("rel") ?? ""),
    );
    for (const rel of rels) {
      expect(rel, `linked sponsor logo should have rel=sponsored`).toContain(
        "sponsored",
      );
      expect(rel, `linked sponsor logo should have rel=noopener`).toContain(
        "noopener",
      );
    }
  });

  test("placeholder slots are rendered for open-inventory tiers", async ({
    page,
  }) => {
    await gotoHome(page);
    // At least one tier has open slots — verify placeholder `+` signs exist
    const placeholders = page.locator("#sponsors .sponsor-slot__plus");
    expect(await placeholders.count()).toBeGreaterThan(0);
  });

  test("media tier section is present", async ({ page }) => {
    await gotoHome(page);
    const mediaTier = page.locator("#sponsors section.sponsor-tier--media");
    await expect(mediaTier).toBeAttached();
    await expect(mediaTier.locator("#tier-media-heading")).toContainText(
      "Media",
    );
  });

  test("sponsor section has aria-labelledby wired to heading", async ({
    page,
  }) => {
    await gotoHome(page);
    const section = page.locator("#sponsors");
    const labelledBy = await section.getAttribute("aria-labelledby");
    expect(labelledBy).toBe("sponsors-heading");
  });
});

test.describe("Sponsors Section — Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("sponsors section renders on mobile", async ({ page }) => {
    await gotoHome(page);
    const section = page.locator("#sponsors");
    await expect(section).toBeAttached();
  });

  test("all tier headings are present on mobile", async ({ page }) => {
    await gotoHome(page);
    const tierHeadings = ["Diamond", "Platinum", "Gold", "Community", "Media"];
    for (const heading of tierHeadings) {
      await expect(
        page.locator("#sponsors").getByRole("heading", { name: heading }),
      ).toBeAttached();
    }
  });
});
