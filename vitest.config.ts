/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

/**
 * Vitest config that hooks into Astro's build pipeline.
 *
 * Using `getViteConfig` from `astro/config` instead of a plain Vite config
 * so that virtual modules like `sanity:client` resolve correctly when
 * testing components via the Astro Container API.
 */
export default getViteConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
