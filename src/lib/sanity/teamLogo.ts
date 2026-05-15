import { urlFor } from "./client";
import type { SanityImage } from "./schemas";

/** Recommended upload size for `team.logo` in Sanity — keep in sync with studio field description. */
export const TEAM_LOGO_MAX_WIDTH = 600;
export const TEAM_LOGO_MAX_HEIGHT = 300;

/** True when Sanity returned an image field with a resolvable asset (optional field may be unset or empty). */
export function hasTeamLogo(
  logo: SanityImage | null | undefined,
): logo is SanityImage {
  if (!logo || typeof logo !== "object") return false;
  const asset = (logo as { asset?: { _ref?: string; _id?: string } }).asset;
  if (!asset || typeof asset !== "object") return false;
  return Boolean(asset._ref ?? asset._id);
}

/** Build a Sanity CDN URL that fits within the logo bounds without square-cropping. */
export function teamLogoUrl(image: SanityImage): string {
  return urlFor(image)
    .width(TEAM_LOGO_MAX_WIDTH)
    .height(TEAM_LOGO_MAX_HEIGHT)
    .fit("max")
    .url();
}
