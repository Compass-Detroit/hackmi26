import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import * as cheerio from "cheerio";
import ProjectCard from "./ProjectCard.astro";

const baseProject = {
  _id: "project-1",
  title: "MittenHarvest AI",
  slug: { current: "mittenharvest-ai" },
};

describe("ProjectCard", () => {
  it("renders full card title and project href", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: { project: baseProject },
    });
    const $ = cheerio.load(html);

    expect($("article.project-card").length).toBe(1);
    expect($(".title-link").attr("href")).toBe(
      "/projects/project/mittenharvest-ai/",
    );
    expect($("h2").text()).toBe("MittenHarvest AI");
  });

  it("omits optional sections when optional data is absent", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: { project: baseProject },
    });
    const $ = cheerio.load(html);

    expect($(".team-badge").length).toBe(0);
    expect($(".description").length).toBe(0);
    expect($(".tag-list").length).toBe(0);
    expect($(".links a").length).toBe(0);
    expect($(".image-wrapper").length).toBe(0);
  });

  it("renders team badge and technologies when provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: {
        project: {
          ...baseProject,
          team: {
            _id: "team-1",
            name: "GrownSense",
            slug: { current: "grownsense" },
          },
          technologies: ["TypeScript", "Astro"],
        },
      },
    });
    const $ = cheerio.load(html);

    expect($(".team-badge").text().trim()).toBe("GrownSense");
    expect($(".tag-chip").length).toBe(2);
  });

  it("renders external action links safely", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: {
        project: {
          ...baseProject,
          githubUrl: "https://github.com/org/repo",
          demoUrl: "https://example.com/demo",
        },
      },
    });
    const $ = cheerio.load(html);
    const links = $(".links a");

    expect(links.length).toBe(2);

    links.each((_, el) => {
      const link = $(el);
      expect(link.attr("target")).toBe("_blank");
      expect(link.attr("rel")).toContain("noopener");
    });
  });

  it("renders compact variant as a single clickable card", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCard, {
      props: { project: baseProject, variant: "compact" },
    });
    const $ = cheerio.load(html);

    expect($("a.project-card--compact").length).toBe(1);
    expect($("article.project-card").length).toBe(0);
    expect($(".compact-info h3").text()).toBe("MittenHarvest AI");
  });
});
