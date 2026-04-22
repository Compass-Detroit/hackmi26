import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

const tsFiles = ["**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs}"];

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.astro/**",
      "**/*.d.ts",
      // Sanity Studio is its own workspace with its own deps + eslint
      // config. It isn't installed at the repo root, so skip it here.
      "studio-hack-michigan-/**",
    ],
  },

  // Astro recommended rules (flat config)
  ...astro.configs["flat/recommended"],
  // TS/JS rules (scoped so it doesn't override the Astro parser)
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: tsFiles,
  })),
];
