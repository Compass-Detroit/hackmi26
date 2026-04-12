# Michigan Hackathon 2026

A dark-themed Astro portfolio/blog template with Three.js particles and modern animations.

[![Version](https://img.shields.io/badge/version-1.1.0-blue)](https://github.com/Compass-Detroit/hackmi26/releases/tag/v1.1.0)
[![Astro](https://img.shields.io/badge/Astro-5.0-purple)](https://astro.build/)
[![Three.js](https://img.shields.io/badge/Three.js-0.160-blue)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Deploy by connecting this repository to [Vercel](https://vercel.com/docs/frameworks/astro).

Release notes: [CHANGELOG.md](CHANGELOG.md).

## Features

- **Dark Theme** - Professional dark color palette with blue/purple accents
- **Three.js Particles** - 5000 particle system with animated 3D effects
- **HackMI landing sections** - about, sponsors, event details, logistics, signup, and IBM Agentic campaign CTA
- **Configurable site and partner imagery** (header brand, org logos, footer sponsors)
- **Richer site footer** - sponsor strip when logos are configured, navigation anchors, and event blurb
- **Responsive** - Mobile-first design with floating navbar
- **Animations** - Smooth transitions and hover effects
- **TypeScript** - Type-safe development

## Quick Start

```bash
# Clone this template
git clone https://github.com/Compass-Detroit/hackmi26.git
cd astro-darkness

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Adding Content

### Blog Posts

Create markdown files in `src/content/blog/`:

```markdown
---
title: 'Your Post Title'
description: 'Brief description'
pubDate: 2025-12-15
tags: ['astro', 'three.js']
---

Your content here...
```

### Projects

Create markdown files in `src/content/projects/`:

```markdown
---
title: 'Your Project'
description: 'Project description'
github: 'https://github.com/...'
tags: ['react', 'typescript']
featured: true
---
```

## Customization

Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --color-bg-dark: #0F172A;
  --color-primary: #3B82F6;
  --color-accent-purple: #8B5CF6;
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}
```

## Project Structure

```
src/
├── components/    # Reusable components
├── content/       # Blog posts & projects (Markdown)
├── layouts/       # Page layouts
├── pages/         # Routes
└── styles/        # Global styles
```

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [Three.js](https://threejs.org/) - 3D graphics
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- Google Fonts (Space Grotesk + DM Sans)

## Design

![design](https://github.com/user-attachments/assets/6cb07159-e8ff-4422-86e8-90dd25f7b6ba)




## License

MIT - see [LICENSE](LICENSE)

---

Made by [kpab](https://github.com/kpab)
