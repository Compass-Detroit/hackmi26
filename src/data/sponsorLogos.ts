export type SponsorLogo = {
  src: string;
  alt: string;
  href?: string;
  surface?: "light";
};

export type SponsorTierKey =
  | "diamond"
  | "platinum"
  | "gold"
  | "community"
  | "media";

export const sponsorLogosByTier: Record<SponsorTierKey, SponsorLogo[]> = {
  /** Use optional surface: "light" for light background logos */
  diamond: [
    {
      src: "/images/sponsors/dia-techtown-300x.webp",
      alt: "TechTown Detroit, the celebration of entrepreneurship, innovation, and small business support",
      surface: "light",
    },
  ],
  platinum: [
    {
      src: "/images/sponsors/platinum-ibm-300x.webp",
      alt: "IBM, Let's create smarter business",
      href: "https://www.ibm.com",
      surface: "light",
    },
    {
      src: "/images/sponsors/platinum-google-300x.webp",
      alt: "Google, AI for everyone, Building for everyone",
    },
    {
      src: "/images/sponsors/platinum-mtw-300x.webp",
      alt: "MTW, Founder-first. Future-focused. Fearlessly Michigan.",
    },
  ],
  gold: [
    {
      src: "/images/sponsors/gold-dte-300x.webp",
      alt: "DTE Energy, providing energy solutions for Michigan",
    },
    {
      src: "/images/sponsors/gold-littleceasars-300x.webp",
      alt: "Little Caesars, Pizza! Pizza!",
    },
    {
      src: "/images/sponsors/gold-mlh-300x.webp",
      alt: "MLH, focuses on empowering developers and fostering community through their core values, notably, 'Learn. Build. Share'",
    },
    {
      src: "/images/sponsors/gold-kaggle-300x.webp",
      alt: "Kaggle, a platform for data science and machine learning competitions",
    },
  ],
  community: [
    {
      src: "/images/sponsors/com-nsbe-300x.webp",
      alt: "NSBE, a community of Black engineers and scientists who are passionate about technology and innovation",
    },
    {
      src: "/images/sponsors/com-gdg-detroit2.png",
      alt: "GDG Detroit, a community of developers who are passionate about technology and innovation",
    },
    {
      src: "/images/sponsors/com-dhh-300x.webp",
      alt: "Detroit Hacker House, a community-driven space for learning, collaboration, and innovation",
    },
    {
      src: "/images/sponsors/com-shpe-600x.webp",
      alt: "Transforming lives in Detroit by inspiring and motivating young Hispanic students to excel in STEM education",
    },
    {
      src: "/images/sponsors/com-dev-of-detroit.webp",
      alt: "Dev of Detroit, Build what lasts",
    },
    {
      src: "/images/sponsors/com-devops-detroit.webp",
      alt: "DevOps Detroit, dedicated to empowering Detroit’s tech community through collaboration, education, and innovation",
    },
    {
      src: "/images/sponsors/com-tq-techqueria-300x.webp",
      alt: "Where Latiné talent drives tech innovation",
    },
  ],
  media: [
    {
      src: "/images/sponsors/media-startMidwest.webp",
      alt: "The storytelling engine for Midwest innovation and entrepreneurship.",
    },
  ],
};
