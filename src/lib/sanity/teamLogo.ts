import { urlFor, hasSanityImage } from "./client";
import type { SanityImage } from "./schemas";

/** Recommended upload size for `team.logo` in Sanity — keep in sync with studio field description. */
export const TEAM_LOGO_MAX_WIDTH = 600;
export const TEAM_LOGO_MAX_HEIGHT = 300;

/**
 * Domain-specific alias for `hasSanityImage`.
 * True when Sanity returned a team logo with a resolvable asset reference.
 */
export const hasTeamLogo = hasSanityImage;

/** Build a Sanity CDN URL that fits within the logo bounds without square-cropping. */
export function teamLogoUrl(image: SanityImage): string {
  return urlFor(image)
    .width(TEAM_LOGO_MAX_WIDTH)
    .height(TEAM_LOGO_MAX_HEIGHT)
    .fit("max")
    .url();
}
