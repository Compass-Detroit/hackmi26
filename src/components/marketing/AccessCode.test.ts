/**
 * Component tests for AccessCode.
 *
 * How this works:
 *   1. `experimental_AstroContainer` creates a tiny Astro renderer in memory
 *   2. We call `container.renderToString(Component, { props })` to get HTML
 *   3. We use `cheerio` (jQuery-like API) to query the HTML and assert
 *
 * No build step needed — the Container API renders the component directly.
 */
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, it, expect } from "vitest";
import * as cheerio from "cheerio";
import AccessCode from "./AccessCode.astro";

describe("AccessCode", () => {
  it("renders the HACKMI access code", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AccessCode);
    const $ = cheerio.load(html);

    expect($(".access-code").text()).toBe("HACKMI");
  });

  it("renders the default label", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AccessCode);

    expect(html).toContain("IBM platform access code:");
  });

  it("accepts a custom label", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AccessCode, {
      props: { label: "Access code:" },
    });

    expect(html).toContain("Access code:");
    expect(html).not.toContain("IBM platform");
  });

  it("applies marginTop and marginBottom as inline styles", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AccessCode, {
      props: { marginTop: 2, marginBottom: 1.5 },
    });
    const $ = cheerio.load(html);
    const style = $(".access-code-hint").attr("style") ?? "";

    expect(style).toContain("margin-top: 2rem");
    expect(style).toContain("margin-bottom: 1.5rem");
  });

  it("defaults to zero margins", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AccessCode);
    const $ = cheerio.load(html);
    const style = $(".access-code-hint").attr("style") ?? "";

    expect(style).toContain("margin-top: 0rem");
    expect(style).toContain("margin-bottom: 0rem");
  });
});
