import { describe, expect, it } from "vitest";
import { sponsorLogosByTier, type SponsorTierKey } from "./sponsorLogos";

const ALL_TIERS: SponsorTierKey[] = [
  "diamond",
  "platinum",
  "gold",
  "community",
  "media",
];

describe("sponsorLogos data integrity", () => {
  it("has an entry for every SponsorTierKey", () => {
    for (const tier of ALL_TIERS) {
      expect(
        sponsorLogosByTier[tier],
        `tier "${tier}" is missing from sponsorLogosByTier`,
      ).toBeDefined();
    }
  });

  it("every tier has at least one logo", () => {
    for (const tier of ALL_TIERS) {
      expect(
        sponsorLogosByTier[tier].length,
        `tier "${tier}" has no logos`,
      ).toBeGreaterThan(0);
    }
  });

  it("every logo has a non-empty src", () => {
    for (const tier of ALL_TIERS) {
      for (const logo of sponsorLogosByTier[tier]) {
        expect(logo.src.trim(), `logo in "${tier}" has empty src`).not.toBe("");
      }
    }
  });

  it("every logo has a non-empty alt", () => {
    for (const tier of ALL_TIERS) {
      for (const logo of sponsorLogosByTier[tier]) {
        expect(
          logo.alt.trim(),
          `logo "${logo.src}" in "${tier}" has empty alt`,
        ).not.toBe("");
      }
    }
  });

  it("every logo alt starts with the sponsor's name (not a generic description)", () => {
    // A generic description starts with a lowercase article/verb — that means the
    // brand name was dropped.  Pattern: must start with an uppercase letter or digit.
    for (const tier of ALL_TIERS) {
      for (const logo of sponsorLogosByTier[tier]) {
        expect(
          /^[A-Z0-9]/.test(logo.alt),
          `logo "${logo.src}" alt "${logo.alt}" should start with the brand name (uppercase)`,
        ).toBe(true);
      }
    }
  });

  it("every logo src starts with /images/sponsors/ or /images/site/", () => {
    for (const tier of ALL_TIERS) {
      for (const logo of sponsorLogosByTier[tier]) {
        expect(
          logo.src.startsWith("/images/sponsors/") ||
            logo.src.startsWith("/images/site/"),
          `logo src "${logo.src}" should be under /images/sponsors/ or /images/site/`,
        ).toBe(true);
      }
    }
  });

  it("every href (when present) is an absolute https URL", () => {
    for (const tier of ALL_TIERS) {
      for (const logo of sponsorLogosByTier[tier]) {
        if (logo.href !== undefined) {
          expect(
            logo.href.startsWith("https://"),
            `logo href "${logo.href}" should start with https://`,
          ).toBe(true);
        }
      }
    }
  });

  it("every logo has an href (all sponsors are linked)", () => {
    for (const tier of ALL_TIERS) {
      for (const logo of sponsorLogosByTier[tier]) {
        expect(
          logo.href,
          `logo "${logo.src}" in tier "${tier}" is missing an href`,
        ).toBeDefined();
      }
    }
  });

  it("surface is either 'light' or absent", () => {
    for (const tier of ALL_TIERS) {
      for (const logo of sponsorLogosByTier[tier]) {
        if (logo.surface !== undefined) {
          expect(logo.surface).toBe("light");
        }
      }
    }
  });
});
