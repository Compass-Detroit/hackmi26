/** @type {import("prettier").Config} */
export default {
  singleQuote: false,
  jsxSingleQuote: false,
  quoteProps: "as-needed",

  // Astro
  plugins: ["prettier-plugin-astro"],
  overrides: [
    { files: "*.astro", options: { parser: "astro" } },
    { files: "*.mdx", options: { parser: "mdx" } },
  ],
};
