import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Production URL for sitemap/RSS; override in Vercel if preview domains differ.
  site: 'https://hackmichigan.com',
  // Root path for Vercel (or any host at domain root). Use a subpath only if deployed under one.
  base: '/',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
