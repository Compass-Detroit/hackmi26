---
name: hackmi-astro
description: >-
  HackMI marketing site: Astro 5 structure, BaseLayout, constants, logos, sections.
  Use when editing this repo, routes, content, or Vercel deploy for hackmichigan.com.
---

# HackMI / Astro

- Stack: Astro 5 SSG + TypeScript + Three.js. No React, Vue, or Svelte integrations installed.
- Styling: scoped `<style>` in each `.astro` component + CSS custom properties in `src/styles/global.css`. No Tailwind.
- Refer to `ui-ux-pro-max` for visual inspiration only (style/color/typography/ux/landing domains).
  Skip the `--stack` search step from that skill — use `global.css` design tokens directly instead.

<!-- If @astrojs/react is added (npm install @astrojs/react), React components go in src/components/react/
     and are imported into .astro files with client:load / client:idle / client:visible directives.
     Add a `react` note here and enable the --stack react search in ui-ux-pro-max.
     Same pattern applies for @astrojs/vue, @astrojs/svelte, @astrojs/solid-js, @astrojs/preact. -->

---

## Repo map

- Home page: `src/pages/index.astro`
- URLs, copy, external links: `src/data/event.ts`, `src/data/nav.ts`
- Logo configuration (which logos appear where): `src/data/siteLogos.ts`
- Event schedule/agenda: `src/data/eventAgenda.ts`
- Global CSS custom properties + resets: `src/styles/global.css`
- Components: `src/components/`
- Layouts: `src/layouts/`
- Data: `src/data/`
- Site logos (wordmarks, event branding): `public/images/site/`
- Org logos (NSBE, SHPE, etc.): `public/images/org/`
- Sponsor logos: `public/images/sponsors/`
- Fonts: `public/fonts/`
- Astro config: `astro.config.mjs`
- Package: `package.json`

---

## Active components

These are imported and rendered in `src/pages/index.astro`. Edit freely.

| Component                | Role                                |
| ------------------------ | ----------------------------------- |
| `BaseLayout.astro`       | HTML shell, meta tags, font imports |
| `ThreeBackground.astro`  | Three.js animated canvas background |
| `Navigation.astro`       | Top nav bar                         |
| `Hero.astro`             | Above-the-fold headline + CTA       |
| `AboutSection.astro`     | Challenge description               |
| `SponsorsSection.astro`  | Sponsor logo grid                   |
| `EventDetails.astro`     | Agenda tabs (Thu/Fri/Sat)           |
| `LogisticsSection.astro` | Rules, deliverables, evaluation     |
| `SignupSection.astro`    | Registration / Devpost CTA          |
| `FinalAgenticCTA.astro`  | Closing call-to-action              |
| `Footer.astro`           | Footer links + org logos            |

---

## Notes

- Legacy template components (blog/projects/about/card cluster) were removed during the Sanity migration.
- `SponsorCTA.astro` remains active and can be edited when refining sponsor-focused CTA messaging.

---

## Design system

CSS custom properties are defined in `src/styles/global.css`. Reference them via `var(--token-name)`
inside scoped `<style>` blocks. Do not hard-code hex values — use existing tokens or add new ones
to `global.css` and use them everywhere.
