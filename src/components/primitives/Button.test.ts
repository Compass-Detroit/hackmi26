import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import * as cheerio from "cheerio";
import Button from "./Button.astro";

describe("Button", () => {
  it("renders a button element by default", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      slots: { default: "Register" },
    });
    const $ = cheerio.load(html);

    expect($("button").length).toBe(1);
    expect($("button").attr("type")).toBe("button");
    expect($("button").hasClass("btn-primary")).toBe(true);
  });

  it("renders an anchor when href is provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { href: "/hackathon/" },
      slots: { default: "Projects" },
    });
    const $ = cheerio.load(html);

    expect($("a").length).toBe(1);
    expect($("a").attr("href")).toBe("/hackathon/");
  });

  it("auto-adds external link safety attrs for https href", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { href: "https://ibm.biz/hack-michigan" },
      slots: { default: "Register" },
    });
    const $ = cheerio.load(html);

    expect($("a").attr("target")).toBe("_blank");
    expect($("a").attr("rel")).toContain("noopener");
  });

  it("does not force external attrs for internal links", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { href: "/hackathon/" },
      slots: { default: "Projects" },
    });
    const $ = cheerio.load(html);

    expect($("a").attr("target")).toBeUndefined();
    expect($("a").attr("rel")).toBeUndefined();
  });

  it("applies accent utility classes", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: {
        accent: ["sponsor-glow", "block-on-mobile"],
      },
      slots: { default: "Sponsor" },
    });
    const $ = cheerio.load(html);

    expect($("button").hasClass("btn-sponsor-glow")).toBe(true);
    expect($("button").hasClass("btn-block-on-mobile")).toBe(true);
  });
});
