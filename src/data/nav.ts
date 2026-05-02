/**
 * Site navigation links and primary CTA labels.
 *
 * Used by `Navigation.astro` and `Footer.astro` so the link set stays
 * consistent across header and footer.
 */
import { EVENT_URLS } from "./event";

export interface SectionAnchor {
  readonly href: string;
  readonly nav: string;
  readonly footer: string;
}

// Order mirrors the on-page section order in `src/pages/index.astro`
// (About → EventDetails → Challenge → Sponsors → Logistics) so that the
// scroll-spy active state advances monotonically as the user scrolls.
export const SECTION_ANCHORS: readonly SectionAnchor[] = [
  { href: "#about", nav: "About", footer: "About" },
  { href: "#event-details", nav: "Event", footer: "Details" },
  { href: "#challenge", nav: "Challenge", footer: "Challenge" },
  { href: "#sponsors", nav: "Sponsors", footer: "Sponsors" },
  { href: "#logistics", nav: "Logistics", footer: "Logistics" },
] as const;

export const PRIMARY_CTA = {
  hacker: { href: EVENT_URLS.hackerRegistration, label: "Register" },
  sponsor: { href: EVENT_URLS.sponsorInquiry, label: "Sponsor" },
  sponsorLong: { href: EVENT_URLS.sponsorInquiry, label: "Become a sponsor" },
} as const;

/**
 * Prefix an anchor-style href (`#foo`) or site-root path (`/projects/`)
 * with the deployed base URL. Absolute external URLs and `mailto:` links
 * pass through unchanged.
 */
export function withBase(base: string, href: string): string {
  if (href.startsWith("http") || href.startsWith("mailto:")) return href;
  if (href.startsWith("#")) return `${base}${href}`;
  return `${base.replace(/\/$/, "")}${href}`;
}
