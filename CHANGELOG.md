# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

This repository builds the **Hack Michigan (HackMI)** marketing site. It started from the **Darkness** Astro template; entries below include both upstream template history and HackMI-specific work.

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

[1.1.1]: https://github.com/Compass-Detroit/hackmi26/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/Compass-Detroit/hackmi26/releases/tag/v1.1.0
[1.0.1]: https://github.com/kpab/astro-darkness/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/kpab/astro-darkness/releases/tag/v1.0.0
