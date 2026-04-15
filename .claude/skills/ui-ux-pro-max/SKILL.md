---
name: ui-ux-pro-max
description: "UI/UX design intelligence. 50 styles, 21 palettes, 50 font pairings, 20 charts, 1 stack (Astro + scoped CSS). Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, check UI/UX code. Projects: website, landing page, .astro. Elements: button, modal, navbar, sidebar, card, table, form, chart. Styles: glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, responsive, skeuomorphism, flat design. Topics: color palette, accessibility, animation, layout, typography, font pairing, spacing, hover, shadow, gradient."
---

<!-- STACK SCOPE: This skill is tailored for Astro 5 + scoped component CSS (no Tailwind, no React/Vue/Svelte).
     If a framework integration is added to the project, extend the stack section below:
     - @astrojs/react  → add `react` row; use --stack react in search.py; components in src/components/react/
     - @astrojs/vue    → add `vue` row; use --stack vue in search.py; components in src/components/vue/
     - @astrojs/svelte → add `svelte` row; use --stack svelte in search.py; components in src/components/svelte/
     - @astrojs/solid-js / @astrojs/preact → same pattern as react
     To verify current integrations: check astro.config.mjs integrations[] and package.json dependencies. -->

# UI/UX Pro Max - Design Intelligence

Searchable database of UI styles, color palettes, font pairings, chart types, product recommendations,
and UX guidelines. Tailored for Astro 5 + scoped component CSS.

## Prerequisites

Check if Python is installed:

```bash
python3 --version || python --version
```

If Python is not installed, install it based on user's OS:

**macOS:**

```bash
brew install python3
```

**Ubuntu/Debian:**

```bash
sudo apt update && sudo apt install python3
```

**Windows:**

```powershell
winget install Python.Python.3.12
```

---

## How to Use This Skill

When user requests UI/UX work (design, build, create, implement, review, fix, improve), follow this workflow:

### Step 1: Analyze User Requirements

Extract key information from user request:

- **Product type**: landing page, event site, portfolio, etc.
- **Style keywords**: minimal, playful, professional, elegant, dark mode, etc.
- **Industry**: tech, education, hackathon, etc.
- **Stack**: Astro + scoped `<style>` + CSS custom properties (this project — see Step 3)

### Step 2: Search Relevant Domains

Use `search.py` multiple times to gather comprehensive information. Search until you have enough context.

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

**Recommended search order:**

1. **Product** - Get style recommendations for product type
2. **Style** - Get detailed style guide (colors, effects)
3. **Typography** - Get font pairings with Google Fonts imports
4. **Color** - Get color palette (Primary, Secondary, CTA, Background, Text, Border)
5. **Landing** - Get page structure (if landing page)
6. **Chart** - Get chart recommendations (if dashboard/analytics)
7. **UX** - Get best practices and anti-patterns

> **Note:** Skip the `--stack` search step for this project. The stack is Astro + scoped CSS —
> use the Astro patterns in Step 3 directly instead of a database lookup.
>
> <!-- If a framework integration (React, Vue, Svelte) is added, re-enable:
>      python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack <stack-name> -->

### Step 3: Astro Stack Patterns

This project uses **Astro 5 SSG with scoped `<style>` blocks and CSS custom properties**. No Tailwind.

#### Scoped styles

Each `.astro` component has a `<style>` block. Styles are automatically scoped to that component.

```astro
<style>
  .card {
    background: var(--color-surface);
    color: var(--color-text);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    transition: box-shadow 200ms ease;
  }

  .card:hover {
    box-shadow: var(--shadow-elevated);
  }
</style>
```

#### Design tokens

CSS custom properties live in `src/styles/global.css`. Always use `var(--token-name)` — never
hard-code hex values. Check `global.css` for existing tokens before introducing new ones. If a new
token is needed, define it in `global.css` and use it everywhere.

#### Interactivity

Astro components are static by default. For simple interactions (toggles, hover effects, tab switching)
use a `<script>` block inside the component:

```astro
<script>
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => { /* ... */ });
  });
</script>
```

<!-- If @astrojs/react or another framework is added, interactive islands replace <script> blocks.
     Components get client:load, client:idle, or client:visible directives on import:
     <ReactComponent client:visible />
     Update this section when that happens. -->

#### Responsive layout

Use CSS media queries inside scoped `<style>` blocks. No breakpoint utility classes.

```astro
<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  @media (min-width: 768px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (min-width: 1024px) {
    .grid { grid-template-columns: repeat(3, 1fr); }
  }
</style>
```

---

## Search Reference

### Available Domains

| Domain       | Use For                              | Example Keywords                                         |
| ------------ | ------------------------------------ | -------------------------------------------------------- |
| `product`    | Product type recommendations         | SaaS, e-commerce, portfolio, healthcare, beauty, service |
| `style`      | UI styles, colors, effects           | glassmorphism, minimalism, dark mode, brutalism          |
| `typography` | Font pairings, Google Fonts          | elegant, playful, professional, modern                   |
| `color`      | Color palettes by product type       | saas, ecommerce, healthcare, beauty, fintech, service    |
| `landing`    | Page structure, CTA strategies       | hero, hero-centric, testimonial, pricing, social-proof   |
| `chart`      | Chart types, library recommendations | trend, comparison, timeline, funnel, pie                 |
| `ux`         | Best practices, anti-patterns        | animation, accessibility, z-index, loading               |
| `prompt`     | AI prompts, CSS keywords             | (style name)                                             |

### Stack

| Stack   | Focus                                                                  |
| ------- | ---------------------------------------------------------------------- |
| `astro` | Scoped `<style>`, CSS custom properties, `<script>` for interactivity |

<!-- To add a framework stack, install the integration and add a row here:
     | `react`  | Hooks, state, performance, patterns (requires @astrojs/react)         |
     | `vue`    | Composition API, Vue Router (requires @astrojs/vue)                   |
     | `svelte` | Runes, stores, SvelteKit patterns (requires @astrojs/svelte)          |
     Then re-enable the --stack search step in the workflow above. -->

---

## Example Workflow

**User request:** "Design the sponsor section for a hackathon landing page"

**AI should:**

```bash
# 1. Search product type
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "hackathon event tech conference" --domain product

# 2. Search style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dark tech minimal" --domain style

# 3. Search typography
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "tech modern professional" --domain typography

# 4. Search color palette
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "tech startup dark" --domain color

# 5. Search landing page structure
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "social-proof sponsors" --domain landing

# 6. Search UX guidelines
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "animation" --domain ux
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "accessibility" --domain ux

# No --stack search needed: use Astro patterns from Step 3 directly.
```

**Then:** Synthesize search results and implement using scoped `<style>` + `var(--token)` from `global.css`.

---

## Tips for Better Results

1. **Be specific with keywords** - "hackathon tech dark" > "event"
2. **Search multiple times** - Different keywords reveal different insights
3. **Combine domains** - Style + Typography + Color = complete design system
4. **Always check UX** - Search "animation", "z-index", "accessibility" for common issues
5. **Reference existing tokens** - Check `global.css` before inventing new values
6. **Iterate** - If first search doesn't match, try different keywords

---

## Common Rules for Professional UI

These are frequently overlooked issues that make UI look unprofessional:

### Icons & Visual Elements

| Rule                       | Do                                                     | Don't                                  |
| -------------------------- | ------------------------------------------------------ | -------------------------------------- |
| **No emoji icons**         | Use inline SVG icons (Heroicons, Lucide, Simple Icons) | Use emojis like 🎨 🚀 ⚙️ as UI icons   |
| **Stable hover states**    | Use `transition: color 200ms` or opacity               | Scale transforms that shift layout     |
| **Correct brand logos**    | Research official SVG from Simple Icons                | Guess or use incorrect logo paths      |
| **Consistent icon sizing** | Fixed `width`/`height` (e.g. 24px) via CSS            | Mix different icon sizes randomly      |

### Interaction & Cursor

| Rule                   | Do                                                        | Don't                                        |
| ---------------------- | --------------------------------------------------------- | -------------------------------------------- |
| **Cursor pointer**     | `cursor: pointer` on all clickable/hoverable elements     | Leave default cursor on interactive elements |
| **Hover feedback**     | Provide visual feedback (color, shadow, border change)    | No indication element is interactive         |
| **Smooth transitions** | `transition: <property> 150ms–300ms ease`                 | Instant state changes or too slow (>500ms)   |

### Light/Dark Mode Contrast

| Rule                      | Do                                                    | Don't                                       |
| ------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| **Glass card light mode** | `background: rgba(255,255,255,0.8)` or higher opacity | `rgba(255,255,255,0.1)` (too transparent)   |
| **Text contrast light**   | Dark text matching `var(--color-text)` token          | Low-contrast gray for body text             |
| **Muted text light**      | At least 4.5:1 contrast ratio vs. background          | Lighter-than-minimum muted text             |
| **Border visibility**     | Visible border using `var(--color-border)` token      | `rgba(255,255,255,0.1)` border (invisible)  |

### Layout & Spacing

| Rule                     | Do                                              | Don't                                  |
| ------------------------ | ----------------------------------------------- | -------------------------------------- |
| **Floating navbar**      | Use `position: fixed` with inset spacing        | Stick navbar flush to viewport edges   |
| **Content padding**      | Account for fixed navbar height via padding-top | Let content hide behind fixed elements |
| **Consistent max-width** | Use same section max-width from `global.css`    | Mix different container widths         |
| **Design tokens**        | `var(--color-primary)` from `global.css`        | Hard-code hex values in components     |

---

## Pre-Delivery Checklist

Before delivering UI code, verify these items:

### Visual Quality

- [ ] No emojis used as icons (use inline SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] Brand logos are correct (verified from Simple Icons)
- [ ] Hover states don't cause layout shift
- [ ] Colors use `var(--token-name)` from `global.css`, not hard-coded hex values

### Interaction

- [ ] All clickable elements have `cursor: pointer` in scoped style
- [ ] Hover states provide clear visual feedback
- [ ] Transitions are smooth (`transition: <prop> 150ms–300ms ease`)
- [ ] Focus states visible for keyboard navigation (`outline` not removed without replacement)

### Light/Dark Mode

- [ ] Light mode text has sufficient contrast (4.5:1 minimum)
- [ ] Glass/transparent elements visible in light mode
- [ ] Borders visible in both modes
- [ ] Test both modes before delivery

### Layout

- [ ] Floating elements have proper spacing from edges
- [ ] No content hidden behind fixed navbars
- [ ] Responsive at 320px, 768px, 1024px, 1440px using CSS media queries
- [ ] No horizontal scroll on mobile

### Accessibility

- [ ] All images have `alt` text
- [ ] Form inputs have `<label>` elements
- [ ] Color is not the only indicator
- [ ] `@media (prefers-reduced-motion: reduce)` respected in transitions/animations

### Astro-specific

- [ ] No Tailwind utility classes (this project does not use Tailwind)
- [ ] All styles in scoped `<style>` blocks or `global.css` — no inline `style=""` attributes for theming
- [ ] Simple interactivity handled by `<script>` block in the component
- [ ] No framework component syntax (no JSX/TSX, no `.vue`, no `.svelte`) unless an integration is installed
