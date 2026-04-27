import { describe, it, expect } from "vitest";
import {
  memberSocialLinks,
  MEMBER_SOCIAL_FIELDS,
} from "../sanity/memberSocials";
import type { TeamMember } from "../sanity/schemas";

describe("MEMBER_SOCIAL_FIELDS", () => {
  it("has a known set of fields in render order", () => {
    const fields = MEMBER_SOCIAL_FIELDS.map((f) => f.field);
    expect(fields).toEqual([
      "github",
      "linkedin",
      "twitter",
      "bluesky",
      "mastodon",
      "instagram",
      "website",
    ]);
  });

  it("has human-readable labels for every field", () => {
    for (const social of MEMBER_SOCIAL_FIELDS) {
      expect(social.label.length).toBeGreaterThan(0);
    }
  });
});

describe("memberSocialLinks", () => {
  it("returns empty array for member with no socials", () => {
    const member: TeamMember = { name: "Ada" };
    expect(memberSocialLinks(member)).toEqual([]);
  });

  it("returns only populated fields", () => {
    const member: TeamMember = {
      name: "Ada",
      github: "https://github.com/ada",
      twitter: "https://x.com/ada",
    };
    const result = memberSocialLinks(member);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      field: "github",
      label: "GitHub",
      href: "https://github.com/ada",
    });
    expect(result[1]).toMatchObject({
      field: "twitter",
      label: "X",
      href: "https://x.com/ada",
    });
  });

  it("skips empty strings and whitespace-only values", () => {
    const member: TeamMember = {
      name: "Ada",
      github: "",
      linkedin: "   ",
      website: "https://ada.dev",
    };
    const result = memberSocialLinks(member);
    expect(result).toHaveLength(1);
    expect(result[0]!.field).toBe("website");
  });

  it("returns all socials when fully populated", () => {
    const member: TeamMember = {
      name: "Ada",
      github: "https://github.com/ada",
      linkedin: "https://linkedin.com/in/ada",
      twitter: "https://x.com/ada",
      bluesky: "https://bsky.app/profile/ada",
      mastodon: "https://mastodon.social/@ada",
      instagram: "https://instagram.com/ada",
      website: "https://ada.dev",
    };
    const result = memberSocialLinks(member);
    expect(result).toHaveLength(7);
    // Verify render order matches MEMBER_SOCIAL_FIELDS
    expect(result.map((r) => r.field)).toEqual(
      MEMBER_SOCIAL_FIELDS.map((f) => f.field),
    );
  });
});
