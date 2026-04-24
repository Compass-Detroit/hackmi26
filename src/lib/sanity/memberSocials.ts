/**
 * Shared helper for rendering a team member's external profile links.
 *
 * The list of recognized social fields is defined once here so both the
 * MemberCard component and any future detail views stay in sync. The
 * order of `MEMBER_SOCIAL_FIELDS` is the render order.
 */

import type { TeamMember } from "./schemas";

export interface MemberSocial {
  field: keyof TeamMember;
  label: string;
}

export const MEMBER_SOCIAL_FIELDS = [
  { field: "github", label: "GitHub" },
  { field: "linkedin", label: "LinkedIn" },
  { field: "twitter", label: "X" },
  { field: "bluesky", label: "Bluesky" },
  { field: "mastodon", label: "Mastodon" },
  { field: "instagram", label: "Instagram" },
  { field: "website", label: "Website" },
] as const satisfies ReadonlyArray<MemberSocial>;

/**
 * Return only the social fields that the given member has populated
 * with a non-empty string. Render order follows `MEMBER_SOCIAL_FIELDS`.
 */
export function memberSocialLinks(
  member: TeamMember,
): ReadonlyArray<MemberSocial & { href: string }> {
  const out: Array<MemberSocial & { href: string }> = [];
  for (const social of MEMBER_SOCIAL_FIELDS) {
    const v = member[social.field];
    if (typeof v === "string" && v.trim().length > 0) {
      out.push({ ...social, href: v });
    }
  }
  return out;
}
