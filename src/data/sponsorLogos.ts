export type SponsorLogo = {
  src: string;
  alt: string;
  href?: string;
  surface?: "light";
};

export type SponsorTierKey = "host" | "diamond" | "gold" | "community";

export const sponsorLogosByTier: Record<SponsorTierKey, SponsorLogo[]> = {
  /** Use optional surface: "light" for light background logos */
  host: [
    {
      src: "/images/sponsors/host-techtown-300x.webp",
      alt: "TechTown Detroit",
      surface: "light",
    },
  ],
  diamond: [
    {
      src: "/images/sponsors/dia-ibm-300x.webp",
      alt: "IBM",
      href: "https://www.ibm.com",
      surface: "light",
    },
    {
      src: "/images/sponsors/dia-google-300x.webp",
      alt: "Google",
    },
  ],
  gold: [
    {
      src: "/images/sponsors/gold-dte-300x.webp",
      alt: "DTE Energy",
    },
    {
      src: "/images/sponsors/gold-littleceasars-300x.webp",
      alt: "Little Caesars",
    },
  ],
  community: [
    {
      src: "/images/sponsors/com-nsbe-300x.webp",
      alt: "NSBE",
    },
    {
      src: "/images/site/gdg-detroit-logo.svg",
      alt: "GDG Detroit",
    },
    {
      src: "/images/sponsors/com-dhh-300x.webp",
      alt: "Detroit Hacker House",
    },
    {
      src: "/images/sponsors/com-shpe-600x.webp",
      alt: "SHPE",
    },
  ],
};
