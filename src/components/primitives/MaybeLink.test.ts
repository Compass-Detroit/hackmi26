import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import * as cheerio from "cheerio";
import MaybeLink, { mergeRelTokens, buildLinkAttrs } from "./MaybeLink.astro";

// ---------------------------------------------------------------------------
// Pure-function unit tests (fast, no Astro container)
// ---------------------------------------------------------------------------

describe("mergeRelTokens", () => {
  it("deduplicates tokens case-insensitively", () => {
    expect(mergeRelTokens("noopener", "NOOPENER", "noreferrer")).toBe(
      "noopener noreferrer",
    );
  });

  it("flattens space-separated strings", () => {
    expect(mergeRelTokens("noopener noreferrer", "sponsored")).toBe(
      "noopener noreferrer sponsored",
    );
  });

  it("skips null / undefined args", () => {
    expect(mergeRelTokens(undefined, "noopener", null)).toBe("noopener");
  });

  it("returns empty string when all args are empty", () => {
    expect(mergeRelTokens(undefined, null, "")).toBe("");
  });
});

describe("buildLinkAttrs", () => {
  it("adds target + noopener noreferrer for external links", () => {
    const attrs = buildLinkAttrs("https://example.com", false);
    expect(attrs.target).toBe("_blank");
    expect(attrs.rel).toBe("noopener noreferrer");
  });

  it("prepends sponsored for external sponsored links", () => {
    const attrs = buildLinkAttrs("https://example.com", true);
    expect(attrs.rel).toContain("sponsored");
    expect(attrs.rel).toContain("noopener");
    expect(attrs.rel).toContain("noreferrer");
    expect(attrs.target).toBe("_blank");
  });

  it("only adds sponsored rel for internal sponsored links", () => {
    const attrs = buildLinkAttrs("/about/", true);
    expect(attrs.rel).toBe("sponsored");
    expect(attrs.target).toBeUndefined();
  });

  it("returns empty object for plain internal links", () => {
    expect(buildLinkAttrs("/about/", false)).toEqual({});
  });

  it("merges caller-provided rel without duplicates", () => {
    const attrs = buildLinkAttrs("https://example.com", false, "nofollow");
    expect(attrs.rel).toBe("noopener noreferrer nofollow");
  });

  it("does not duplicate noopener when caller also passes it", () => {
    const attrs = buildLinkAttrs("https://example.com", false, "noopener");
    expect(attrs.rel).toBe("noopener noreferrer");
  });
});

// ---------------------------------------------------------------------------
// Component integration tests (Astro container)
// ---------------------------------------------------------------------------

describe("MaybeLink", () => {
  it("renders a span when href is absent", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MaybeLink, {
      props: { class: "logo-wrap" },
      slots: { default: "Compass" },
    });
    const $ = cheerio.load(html);

    expect($("span").length).toBe(1);
    expect($("a").length).toBe(0);
    expect($("span").hasClass("logo-wrap")).toBe(true);
  });

  it("renders a span when href is null", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MaybeLink, {
      props: { href: null, sponsored: true },
      slots: { default: "No link" },
    });
    const $ = cheerio.load(html);

    expect($("span").length).toBe(1);
    expect($("a").length).toBe(0);
  });

  it("renders an anchor when href is set", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MaybeLink, {
      props: { href: "/projects/" },
      slots: { default: "Projects" },
    });
    const $ = cheerio.load(html);

    expect($("a").length).toBe(1);
    expect($("a").attr("href")).toBe("/projects/");
  });

  it("applies safe rel attrs for external links", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MaybeLink, {
      props: { href: "https://example.com" },
      slots: { default: "External" },
    });
    const $ = cheerio.load(html);

    expect($("a").attr("target")).toBe("_blank");
    expect($("a").attr("rel")).toContain("noopener");
    expect($("a").attr("rel")).toContain("noreferrer");
    expect($("a").attr("rel")).not.toContain("sponsored");
  });

  it("adds sponsored + safe rel attrs for sponsored external links", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MaybeLink, {
      props: { href: "https://example.com", sponsored: true },
      slots: { default: "External sponsor" },
    });
    const $ = cheerio.load(html);

    expect($("a").attr("target")).toBe("_blank");
    expect($("a").attr("rel")).toContain("sponsored");
    expect($("a").attr("rel")).toContain("noopener");
    expect($("a").attr("rel")).toContain("noreferrer");
  });

  it("does not add target/rel for internal links", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MaybeLink, {
      props: { href: "/projects/" },
      slots: { default: "Home" },
    });
    const $ = cheerio.load(html);

    expect($("a").attr("target")).toBeUndefined();
    expect($("a").attr("rel")).toBeUndefined();
  });

  it("adds rel=sponsored for sponsored internal links", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MaybeLink, {
      props: { href: "/projects/", sponsored: true },
      slots: { default: "Projects" },
    });
    const $ = cheerio.load(html);

    expect($("a").attr("target")).toBeUndefined();
    expect($("a").attr("rel")).toBe("sponsored");
  });

  it("merges caller-provided rel with auto-generated tokens", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MaybeLink, {
      props: { href: "https://example.com", rel: "nofollow" },
      slots: { default: "External" },
    });
    const $ = cheerio.load(html);

    const rel = $("a").attr("rel") ?? "";
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
    expect(rel).toContain("nofollow");
  });

  it("does not duplicate noopener when caller also passes it", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MaybeLink, {
      props: { href: "https://example.com", rel: "noopener" },
      slots: { default: "External" },
    });
    const $ = cheerio.load(html);

    const rel = $("a").attr("rel") ?? "";
    const tokens = rel.split(/\s+/);
    expect(tokens.filter((t) => t === "noopener").length).toBe(1);
  });

  it("passes through extra HTML attributes to the anchor", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MaybeLink, {
      props: { href: "/about/", "aria-label": "About us", "data-track": "1" },
      slots: { default: "About" },
    });
    const $ = cheerio.load(html);

    expect($("a").attr("aria-label")).toBe("About us");
    expect($("a").attr("data-track")).toBe("1");
  });
});
