/**
 * Partner & org imagery — files live under public/images/ (see folders below).
 * Use root-relative paths: `/images/org/...` and `/images/sponsors/...`
 */
export type SiteLogo = {
  src: string;
  alt: string;
  href?: string;
};

/**
 * Primary header lockup (home link). Put the file under `public/` — e.g. `public/images/site/logo.svg`.
 */
export const siteHeaderBrand = {
  logoSrc: "/images/site/compass-logo.svg",
  /** Used for accessibility and when the logo is shown without a wordmark. */
  logoAlt: "Compass Detroit",
} as const;

/** Shown in the main nav (e.g. host org, chapter, venue). */
export const headerOrganizationalLogos: SiteLogo[] = [
  // TODO: Removed the display of these in the nav. They all appeared in the header and caused duplicate with compass logo and would cause responsiveness issues even when compass logo was removed. Can re-add if we want to show GDG Detroit and Detroit Hacker House in the header as well, but for now just keeping compass logo in the header and all three in the footer.
  {
    src: "/images/org/compass-logo.svg",
    alt: "Compass Detroit",
    href: "https://compassdetroit.com",
  },
  {
    src: "/images/site/gdg-detroit-logo.svg",
    alt: "GDG Detroit",
    href: "https://gdg.community.dev/gdg-detroit/",
  },
  {
    src: "/images/site/detroit-hacker-house-logo.png",
    alt: "Detroit Hacker House",
    href: "https://detroithackerhouse.com",
  },
];

/** Shown in the site footer (sponsors, supporters). */
export const footerSponsorLogos: SiteLogo[] = [
  {
    src: "/images/site/compass-logo.svg",
    alt: "Compass Detroit",
    href: "https://compassdetroit.com",
  },
  {
    src: "/images/site/gdg-detroit-logo-footer.svg",
    alt: "GDG Detroit",
    href: "https://gdg.community.dev/gdg-detroit/",
  },
  {
    src: "/images/site/detroit-hacker-house-logo.png",
    alt: "Detroit Hacker House",
    href: "https://detroithackerhouse.com",
  },
];

/** Join Astro `import.meta.env.BASE_URL` with a root-relative `/images/...` path. */
export function publicAssetUrl(baseUrl: string, rootPath: string): string {
  return `${baseUrl}${rootPath.replace(/^\//, "")}`;
}
