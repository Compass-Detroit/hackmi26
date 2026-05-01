# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

This repository builds the **Hack Michigan (HackMI)** marketing site. It started from the **Darkness** Astro template; entries below include both upstream template history and HackMI-specific work.

## [Unreleased]

### Changed

- Playwright E2E specs updated to match the new `/projects/` route for the “Projects” navigation link (instead of asserting `/hackathon/`).
- Canonicalized the legacy `/hackathon/` listing URL by redirecting it to `/projects/` (detail routes under `/hackathon/*` remain unchanged).

## [1.1.3] - 2026-05-01

### Added

- `/projects/` route for hackathon project browsing (`src/pages/projects/index.astro`).
- Vercel redirect rule to enforce trailing slashes (`vercel.json`).

### Changed

- Navigation “Projects” now routes to `/projects/` (and remains active on both `/projects/` and `/hackathon/` paths) (`src/components/Navigation.astro`).
- Sponsor tier `layout` prop now uses the shared `SponsorTierKey` union (fixes `"platinum"` typing mismatch) (`src/components/SponsorTier.astro`).
- Deploy page main padding now correctly clears the fixed navigation (`src/pages/deploy.astro`).
- Refined landing copy/layout for About + Challenge sections (`src/components/AboutSection.astro`, `src/components/ChallengeSection.astro`).

### Fixed

- Gold sponsor tier now uses the correct logo tier data and layout (`src/components/SponsorsSection.astro`).

## [1.1.2] - 2026-04-22

### Added

- Optional social profile URLs on **team members** in Sanity (GitHub, LinkedIn, X, Bluesky, Mastodon, Instagram, personal website) and linked labels on hackathon **team** detail pages (`src/pages/hackathon/team/[slug].astro`).
- README: environment variables, standalone Studio usage, content model overview, **For developers** (architecture and workflow), and **Credits**.
- `tsconfig.json` **exclude** for removed `src/pages/about.astro` so the TypeScript program does not expect a deleted route file.

### Changed

- README focused on the HackMI site (Sanity-backed hackathon area, embedded Studio at `/studio`, Vercel deploy) instead of the old portfolio/blog template story.
- `astro.config.mjs`: load `PUBLIC_SANITY_*` with **Vite** `loadEnv` — `loadEnv` is not exported from `astro/config` on Astro 5.
- **Three.js background** (`ThreeBackground.astro`): run initialization on script load as well as `astro:page-load` (avoids a race where the animation never starts); when **prefers-reduced-motion** is set, still **render one frame** so the canvas is not empty.

### Removed

- **Blog and local portfolio projects**: Astro content collections (`src/content.config.ts`), `src/content/blog/`, `src/content/projects/`, blog and projects pages, and related components/layouts.
- **`@astrojs/rss`** dependency (no blog feed).
- Sanity Studio schemas **`post`** and **`project`**; Studio now registers **`team`** and **`hackathonProject`** only. Existing dataset documents of removed types are unchanged until manually deleted or migrated.
- **About** page at `src/pages/about.astro`.

## [1.1.1] - 2026-04-15

### Added

- Prettier formatting config (`prettier.config.mjs`) with a double-quote standard.
- ESLint flat config (`eslint.config.mjs`) for Astro + TypeScript, plus `lint`/`lint:fix` scripts.
- Social card image (`public/social-card.jpg`) in README.md.
- Replaced logos and images with more performant versions.
- Replaced content in various areas of the site with more relevant content.

### Changed

- README Quick Start now points to `cd hackmi26` (was `cd astro-darkness`) and documents `format`/`lint` commands.

## [1.1.0] - 2026-04-11

First tagged release for the **HackMI** fork (marketing site and Vercel-oriented deploy defaults).

### Added

- HackMI landing sections: about, sponsors, event details, logistics, signup, and IBM Agentic campaign CTA.
- `src/lib/constants.ts` for shared external URLs (`EXTERNAL_URLS`) and `EVENT_DETAILS` (name, date, location, mission).
- Configurable site and partner imagery via `src/data/siteLogos.ts` (header brand, org logos, footer sponsors) under `public/images/`.
- Richer site footer: sponsor strip when logos are configured, navigation anchors, and event blurb.

### Changed

- Astro config oriented toward **root-domain** hosting (e.g. Vercel): `base: '/'` and production `site` URL; sitemap/RSS use the same `site` value.
- `package.json` `homepage` aligned with the production domain.

### Removed

- GitHub Actions workflow that deployed static output to **GitHub Pages** (deployment is expected via Vercel or another host).

## [1.0.1] - 2026-03-28

_Released on the upstream [astro-darkness](https://github.com/kpab/astro-darkness) template._

### Fixed

- Three.js animation persistence across View Transitions navigation ([#6](https://github.com/kpab/astro-darkness/pull/6))
- Mobile hamburger menu not working after View Transitions page navigation

## [1.0.0] - 2026-01-04

_Initial [astro-darkness](https://github.com/kpab/astro-darkness) template release._

### Added

- Initial release of Darkness - Astro Dark Theme
- Dark-themed portfolio/blog template with professional color palette
- Three.js particle system with 5000 animated particles and 3D effects
- Full-featured blog system using Astro Content Collections
- Portfolio/project showcase with featured projects support
- Responsive mobile-first design with floating navigation bar
- Smooth animations and hover effects throughout
- TypeScript support for type-safe development
- MDX support for blog posts and project pages
- RSS feed generation for blog posts
- Sitemap generation for SEO
- Content collections for blog posts and projects with schema validation
- Customizable CSS variables for easy theming
- Multiple sample blog posts demonstrating features
- Sample projects showcasing portfolio capabilities
- About page with skills and features sections
- Google Fonts integration (Space Grotesk + DM Sans)
- MIT License

### Technical Stack

- Astro 5.1.0 as the static site generator
- Three.js 0.160.0 for 3D particle effects
- TypeScript 5.9.3 for type safety
- @astrojs/mdx for enhanced markdown support
- @astrojs/rss for feed generation
- @astrojs/sitemap for SEO optimization

[1.1.3]: https://github.com/Compass-Detroit/hackmi26/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/Compass-Detroit/hackmi26/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/Compass-Detroit/hackmi26/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/Compass-Detroit/hackmi26/releases/tag/v1.1.0
[1.0.1]: https://github.com/kpab/astro-darkness/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/kpab/astro-darkness/releases/tag/v1.0.0
