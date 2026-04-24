/**
 * Component tests for MemberCard.
 *
 * MemberCard imports `memberSocialLinks` from `../../lib/sanity` — this
 * function is a pure TS function that doesn't touch `sanity:client`, so
 * no mocking is needed. The Container API resolves the import chain fine.
 */
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, it, expect } from "vitest";
import * as cheerio from "cheerio";
import MemberCard from "./MemberCard.astro";

describe("MemberCard", () => {
  it("renders member name", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MemberCard, {
      props: { member: { name: "Ada Lovelace" } },
    });
    const $ = cheerio.load(html);

    expect($("h3").text()).toBe("Ada Lovelace");
  });

  it("renders optional role", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MemberCard, {
      props: { member: { name: "Ada", role: "Lead Dev" } },
    });
    const $ = cheerio.load(html);

    expect($(".member-role").text()).toBe("Lead Dev");
  });

  it("omits role paragraph when no role", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MemberCard, {
      props: { member: { name: "Ada" } },
    });
    const $ = cheerio.load(html);

    expect($(".member-role").length).toBe(0);
  });

  it("renders social links in correct order", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MemberCard, {
      props: {
        member: {
          name: "Ada",
          github: "https://github.com/ada",
          website: "https://ada.dev",
          linkedin: "https://linkedin.com/in/ada",
        },
      },
    });
    const $ = cheerio.load(html);
    const links = $(".member-social-link")
      .map((_, el) => $(el).text().trim())
      .get();

    // Order follows MEMBER_SOCIAL_FIELDS: github → linkedin → website
    expect(links).toEqual(["GitHub", "LinkedIn", "Website"]);
  });

  it("social links open in new tab with rel", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MemberCard, {
      props: {
        member: {
          name: "Ada",
          github: "https://github.com/ada",
        },
      },
    });
    const $ = cheerio.load(html);
    const link = $(".member-social-link").first();

    expect(link.attr("target")).toBe("_blank");
    expect(link.attr("rel")).toContain("noopener");
    expect(link.attr("href")).toBe("https://github.com/ada");
  });

  it("omits socials list when member has none", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MemberCard, {
      props: { member: { name: "Ada" } },
    });
    const $ = cheerio.load(html);

    expect($(".member-socials").length).toBe(0);
  });
});
