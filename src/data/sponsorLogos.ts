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
  | "media"
  | "fuel";

export const sponsorLogosByTier: Record<SponsorTierKey, SponsorLogo[]> = {
  /** Use optional surface: "light" for light background logos */
  diamond: [
    {
      src: "/images/sponsors/dia-techtown-300x.webp",
      alt: "TechTown Detroit, the celebration of entrepreneurship, innovation, and small business support",
      href: "https://techtowndetroit.org",
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
      href: "https://about.google",
    },
    {
      src: "/images/sponsors/platinum-mtw-300x.webp",
      alt: "MTW, Founder-first. Future-focused. Fearlessly Michigan.",
      href: "https://www.michigantechweek.com",
    },
  ],
  gold: [
    {
      src: "/images/sponsors/gold-dte-300x.webp",
      alt: "DTE Energy, providing energy solutions for Michigan",
      href: "https://www.dteenergy.com",
    },
    {
      src: "/images/sponsors/gold-littleceasars-300x.webp",
      alt: "Little Caesars, Pizza! Pizza!",
      href: "https://www.littlecaesars.com",
    },
    {
      src: "/images/sponsors/gold-mlh-300x.webp",
      alt: "MLH, focuses on empowering developers and fostering community through their core values, notably, 'Learn. Build. Share'",
      href: "https://mlh.io",
    },
    {
      src: "/images/sponsors/gold-kaggle-300x.webp",
      alt: "Kaggle, a platform for data science and machine learning competitions",
      href: "https://www.kaggle.com",
    },
  ],
  community: [
    {
      src: "/images/sponsors/com-nsbe-300x.webp",
      alt: "NSBE, a community of Black engineers and scientists who are passionate about technology and innovation",
      href: "https://www.nsbe.org",
    },
    {
      src: "/images/sponsors/com-gdg-detroit2.png",
      alt: "GDG Detroit, a community of developers who are passionate about technology and innovation",
      href: "https://gdg.community.dev/gdg-detroit/",
    },
    {
      src: "/images/sponsors/com-dhh-300x.webp",
      alt: "Detroit Hacker House, a community-driven space for learning, collaboration, and innovation",
      href: "https://detroithackerhouse.com",
    },
    {
      src: "/images/sponsors/com-shpe-600x.webp",
      alt: "SHPE, transforming lives in Detroit by inspiring and motivating young Hispanic students to excel in STEM education",
      href: "https://shpe.org",
    },
    {
      src: "/images/sponsors/com-dev-of-detroit.webp",
      alt: "Dev of Detroit, Build what lasts",
      href: "https://www.instagram.com/developersofdetroit/",
    },
    {
      src: "/images/sponsors/com-devops-detroit.webp",
      alt: "DevOps Detroit, dedicated to empowering Detroit's tech community through collaboration, education, and innovation",
      href: "https://www.devopsdetroit.io/",
    },
    {
      src: "/images/sponsors/com-tq-techqueria-300x.webp",
      alt: "Techqueria, where Latiné talent drives tech innovation",
      href: "https://techqueria.org",
    },
    {
      src: "/images/sponsors/com_AI_Collective_Detroit.png",
      alt: "AI Collective Detroit, a community of AI enthusiasts building the future",
      href: "https://www.aicollective.com/chapters/detroit",
      surface: "light",
    },
  ],
  media: [
    {
      src: "/images/sponsors/media-startMidwest.webp",
      alt: "Start Midwest, the storytelling engine for Midwest innovation and entrepreneurship",
      href: "https://www.start-midwest.com/",
    },
    {
      src: "/images/sponsors/media-whynotcollab-300x.png",
      alt: "Why Not Collab Detroit, a creative community amplifying Detroit voices",
      href: "https://www.instagram.com/whynotcollabdet/",
    },
  ],
  fuel: [
    {
      src: "/images/sponsors/fuel-luminesso-300x.png",
      alt: "Luminesso Coffee, fueling Detroit's builders one cup at a time",
      href: "https://www.luminessocoffee.com",
    },
  ],
};
