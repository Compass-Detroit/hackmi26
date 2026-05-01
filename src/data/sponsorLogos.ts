export type SponsorLogo = {
  src: string;
  alt: string;
  href?: string;
  surface?: "light";
};

export type SponsorTierKey = "diamond" | "platinum" | "gold" | "community";

export const sponsorLogosByTier: Record<SponsorTierKey, SponsorLogo[]> = {
  /** Use optional surface: "light" for light background logos */
  diamond: [
    {
      src: "/images/sponsors/dia-techtown-300x.webp",
      alt: "TechTown Detroit",
      surface: "light",
    },
  ],
  platinum: [
    {
      src: "/images/sponsors/platinum-ibm-300x.webp",
      alt: "IBM",
      href: "https://www.ibm.com",
      surface: "light",
    },
    {
      src: "/images/sponsors/platinum-google-300x.webp",
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
    {
      src: "/images/sponsors/gold-mlh-300x.webp",
      alt: "MLH",
    },
    {
      src: "/images/sponsors/gold-kaggle-300x.webp",
      alt: "Kaggle",
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
