/**
 * Component tests for TeamBadge.
 *
 * TeamBadge imports `type TeamRef` from `../../lib/sanity` — since it only
 * imports a *type*, the `sanity:client` virtual module is NOT loaded at
 * runtime. TypeScript erases type-only imports during compilation.
 */
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, it, expect } from "vitest";
import * as cheerio from "cheerio";
import TeamBadge from "./TeamBadge.astro";

const mockTeam = {
  _id: "team-1",
  name: "GrownSense",
  slug: { current: "grownsense" },
};

describe("TeamBadge", () => {
  it("renders the team name", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(TeamBadge, {
      props: { team: mockTeam },
    });
    const $ = cheerio.load(html);

    expect($(".team-badge").text().trim()).toBe("GrownSense");
  });

  it("links to the correct team page", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(TeamBadge, {
      props: { team: mockTeam },
    });
    const $ = cheerio.load(html);

    expect($(".team-badge").attr("href")).toBe("/projects/team/grownsense/");
  });

  it("accepts an extra class", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(TeamBadge, {
      props: { team: mockTeam, class: "extra-class" },
    });
    const $ = cheerio.load(html);

    expect($("a").hasClass("team-badge")).toBe(true);
    expect($("a").hasClass("extra-class")).toBe(true);
  });
});
