import { describe, expect, it, vi } from "vitest";

const chain = {
  width: vi.fn().mockReturnThis(),
  height: vi.fn().mockReturnThis(),
  fit: vi.fn().mockReturnThis(),
  url: vi.fn(() => "https://cdn.sanity.io/team-logo.webp"),
};

vi.mock("./client", () => ({
  urlFor: vi.fn(() => chain),
  hasSanityImage: vi.fn((logo: unknown) => {
    if (!logo || typeof logo !== "object") return false;
    const asset = (logo as { asset?: { _ref?: string; _id?: string } }).asset;
    if (!asset || typeof asset !== "object") return false;
    return Boolean(asset._ref ?? asset._id);
  }),
}));

import {
  hasTeamLogo,
  teamLogoUrl,
  TEAM_LOGO_MAX_HEIGHT,
  TEAM_LOGO_MAX_WIDTH,
} from "./teamLogo";

describe("hasTeamLogo", () => {
  it("returns false when logo is missing or has no asset", () => {
    expect(hasTeamLogo(undefined)).toBe(false);
    expect(hasTeamLogo(null)).toBe(false);
    expect(hasTeamLogo({ _type: "image" })).toBe(false);
    expect(hasTeamLogo({ _type: "image", asset: {} })).toBe(false);
  });

  it("returns true when logo has an asset reference (_ref)", () => {
    expect(hasTeamLogo({ _type: "image", asset: { _ref: "image-abc" } })).toBe(
      true,
    );
  });

  it("returns true when logo has an expanded asset ID (_id)", () => {
    expect(hasTeamLogo({ _type: "image", asset: { _id: "image-xyz" } })).toBe(
      true,
    );
  });
});

describe("teamLogoUrl", () => {
  it("requests the wide logo bounds without cropping", () => {
    const image = { _type: "image", asset: { _ref: "image-abc" } };
    expect(teamLogoUrl(image)).toBe("https://cdn.sanity.io/team-logo.webp");
    expect(chain.width).toHaveBeenCalledWith(TEAM_LOGO_MAX_WIDTH);
    expect(chain.height).toHaveBeenCalledWith(TEAM_LOGO_MAX_HEIGHT);
    expect(chain.fit).toHaveBeenCalledWith("max");
  });
});
