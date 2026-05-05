import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import * as cheerio from "cheerio";
import SponsorTier from "./SponsorTier.astro";
import type { SponsorLogo } from "../data/sponsorLogos";

const logo = (overrides: Partial<SponsorLogo> = {}): SponsorLogo => ({
  src: "/images/sponsors/test-logo.webp",
  alt: "Acme Corp, building the future",
  ...overrides,
});

describe("SponsorTier", () => {
  it("renders a heading with the provided text and id", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SponsorTier, {
      props: {
        heading: "Platinum",
        headingId: "tier-platinum-heading",
        logos: [logo()],
        totalSlots: 1,
        layout: "platinum",
        shape: "card",
        slotLabel: "Platinum sponsor",
      },
    });
    const $ = cheerio.load(html);

    expect($("#tier-platinum-heading").text().trim()).toBe("Platinum");
    expect($("section").attr("aria-labelledby")).toBe("tier-platinum-heading");
  });

  it("renders the correct number of logo slots", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SponsorTier, {
      props: {
        heading: "Gold",
        headingId: "tier-gold-heading",
        logos: [logo(), logo({ alt: "Beta Inc" })],
        totalSlots: 4,
        layout: "gold",
        shape: "card",
        slotLabel: "Gold sponsor",
      },
    });
    const $ = cheerio.load(html);
    const items = $("li");
    expect(items.length).toBe(4);
  });

  it("renders correct number of placeholder slots", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SponsorTier, {
      props: {
        heading: "Community",
        headingId: "tier-community-heading",
        logos: [logo()],
        totalSlots: 4,
        layout: "community",
        shape: "square",
        slotLabel: "Community sponsor",
      },
    });
    const $ = cheerio.load(html);
    const plusSlots = $(".sponsor-slot__plus");
    expect(plusSlots.length).toBe(3);
  });

  it("renders no placeholder slots when logos fill totalSlots", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SponsorTier, {
      props: {
        heading: "Diamond",
        headingId: "tier-diamond-heading",
        logos: [logo()],
        totalSlots: 1,
        layout: "diamond",
        shape: "card",
        slotLabel: "Diamond sponsor",
      },
    });
    const $ = cheerio.load(html);
    expect($(".sponsor-slot__plus").length).toBe(0);
  });

  it("renders no placeholders when logos exceed totalSlots", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SponsorTier, {
      props: {
        heading: "Gold",
        headingId: "tier-gold-heading",
        logos: [logo(), logo(), logo()],
        totalSlots: 2,
        layout: "gold",
        shape: "card",
        slotLabel: "Gold sponsor",
      },
    });
    const $ = cheerio.load(html);
    expect($(".sponsor-slot__plus").length).toBe(0);
    // All 3 logos are still rendered
    expect($(".sponsor-logo").length).toBe(3);
  });

  it("applies correct shape class to logo slots", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SponsorTier, {
      props: {
        heading: "Community",
        headingId: "tier-community-heading",
        logos: [logo()],
        totalSlots: 1,
        layout: "community",
        shape: "square",
        slotLabel: "Community sponsor",
      },
    });
    const $ = cheerio.load(html);
    expect($(".sponsor-slot--square").length).toBe(1);
    expect($(".sponsor-slot--card").length).toBe(0);
  });

  it("applies layout class to the slot grid", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SponsorTier, {
      props: {
        heading: "Media",
        headingId: "tier-media-heading",
        logos: [logo()],
        totalSlots: 1,
        layout: "media",
        shape: "square",
        slotLabel: "Media sponsor",
      },
    });
    const $ = cheerio.load(html);
    expect($(".tier-slots--media").length).toBe(1);
  });

  it("adds surface-light class when logo.surface is light", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SponsorTier, {
      props: {
        heading: "Platinum",
        headingId: "tier-platinum-heading",
        logos: [logo({ surface: "light" })],
        totalSlots: 1,
        layout: "platinum",
        shape: "card",
        slotLabel: "Platinum sponsor",
      },
    });
    const $ = cheerio.load(html);
    expect($(".sponsor-slot--surface-light").length).toBe(1);
  });

  it("logo slot aria-label includes slotLabel and logo alt", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SponsorTier, {
      props: {
        heading: "Platinum",
        headingId: "tier-platinum-heading",
        logos: [logo({ alt: "Acme Corp, building the future" })],
        totalSlots: 1,
        layout: "platinum",
        shape: "card",
        slotLabel: "Platinum sponsor",
      },
    });
    const $ = cheerio.load(html);
    const label = $(".sponsor-slot").first().attr("aria-label") ?? "";
    expect(label).toContain("Platinum sponsor");
    expect(label).toContain("Acme Corp");
  });

  it("placeholder slot aria-label identifies position and total", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SponsorTier, {
      props: {
        heading: "Community",
        headingId: "tier-community-heading",
        logos: [logo()],
        totalSlots: 3,
        layout: "community",
        shape: "square",
        slotLabel: "Community sponsor",
      },
    });
    const $ = cheerio.load(html);
    const slots = $(".sponsor-slot");
    const secondSlotLabel = slots.eq(1).attr("aria-label") ?? "";
    expect(secondSlotLabel).toContain("slot 2 of 3");
    expect(secondSlotLabel).toContain("placeholder");
  });
});
