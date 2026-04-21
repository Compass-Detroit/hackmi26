import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
import { loadEnv } from "vite";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV || "development",
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  site: "https://hackmichigan.com",
  base: "/",
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap(),
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID || "f188znys",
      dataset: PUBLIC_SANITY_DATASET || "production",
      useCdn: false, // Set to true for production if you want to use the CDN
      studioUrl: "/studio", // Optional: If you plan to host Sanity Studio inside Astro
    }),
  ],
});
