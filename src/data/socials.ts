/* Compass Detroit Links */

export interface SocialLink {
  readonly href: string;
  readonly label: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    href: "https://www.linkedin.com/company/compass-detroit/",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/Compass-Detroit/",
    label: "GitHub",
  },
] as const;
