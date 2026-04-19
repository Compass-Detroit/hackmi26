/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-order"],
  rules: {
    // Keep this repo flexible; we mainly want to catch actual CSS mistakes,
    // not enforce modernized color notation or strict selector conventions.
    "alpha-value-notation": null,
    "color-function-alias-notation": null,
    "color-function-notation": null,
    "media-feature-range-notation": null,
    "no-descending-specificity": null,
    "no-empty-source": null,
    "comment-empty-line-before": null,
    "property-no-deprecated": null,
    "property-no-vendor-prefix": null,
    "rule-empty-line-before": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "declaration-block-no-duplicate-properties": null,
    "keyframes-name-pattern": null,
    "selector-class-pattern": null,
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] },
    ],
    "value-keyword-case": null,
    // Consistent ordering of custom properties within a declaration block.
    "order/order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      "rules",
      "at-rules",
    ],
  },
  overrides: [
    {
      files: ["**/*.astro"],
      customSyntax: "postcss-html",
    },
  ],
};
