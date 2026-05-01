import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import * as cheerio from "cheerio";
import MaybeLink from "./MaybeLink.astro";

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
});
