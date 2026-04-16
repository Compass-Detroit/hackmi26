export type SponsorLogo = {
  src: string;
  alt: string;
  href?: string;
  surface?: "light";
};

export type SponsorTierKey = "host" | "diamond" | "gold";

export const sponsorLogosByTier: Record<SponsorTierKey, SponsorLogo[]> = {
  /** Use optional surface: "light" for light background logos */
  host: [
    {
      src: "/images/sponsors/host-techtown-300x.webp",
      alt: "TechTown Detroit",
      href: "https://techtowndetroit.org",
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
      href: "https://www.google.com",
    },
  ],
  gold: [
    {
      src: "/images/sponsors/gold-dte-300x.webp",
      alt: "DTE Energy",
      href: "https://www.dteenergy.com",
    },
    {
      src: "/images/sponsors/gold-littlecaesars-300x.webp",
      alt: "Little Caesars",
      href: "https://littlecaesars.com",
    },
  ],
};

