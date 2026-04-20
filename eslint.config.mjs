import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

const tsFiles = ["**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs}"];

export default [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.astro/**", "**/*.d.ts"],
  },

  // Astro recommended rules (flat config)
  ...astro.configs["flat/recommended"],
  // TS/JS rules (scoped so it doesn't override the Astro parser)
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: tsFiles,
  })),
];
