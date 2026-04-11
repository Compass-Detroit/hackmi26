import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://github.com/Compass-Detroit/',
  base: '/hackmi2026',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
