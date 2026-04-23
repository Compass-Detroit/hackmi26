import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { fetchMock } = vi.hoisted(() => ({
  fetchMock: vi.fn(),
}));

vi.mock("./client", () => ({
  sanityClient: {
    fetch: fetchMock,
  },
}));

import {
  getProject,
  getProjectSlugs,
  getProjects,
  getTeam,
  getTeamSlugs,
  getTeams,
} from "./fetchers";
import { QUERIES } from "./queries";

describe("sanity fetchers", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchMock.mockReset();
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("getProjects returns empty array when query returns null", async () => {
    fetchMock.mockResolvedValueOnce(null);

    await expect(getProjects()).resolves.toEqual([]);
    expect(fetchMock).toHaveBeenCalledWith(QUERIES.projectList);
  });

  it("getProjects returns fallback on fetch failure", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network failure"));

    await expect(getProjects()).resolves.toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("getProject passes slug query params and returns fallback on errors", async () => {
    fetchMock.mockRejectedValueOnce(new Error("boom"));

    await expect(getProject("mittenharvest-ai")).resolves.toBeNull();
    expect(fetchMock).toHaveBeenCalledWith(QUERIES.projectBySlug, {
      slug: "mittenharvest-ai",
    });
  });

  it("getProjectSlugs and getTeamSlugs normalize null to []", async () => {
    fetchMock.mockResolvedValueOnce(null);
    fetchMock.mockResolvedValueOnce(null);

    await expect(getProjectSlugs()).resolves.toEqual([]);
    await expect(getTeamSlugs()).resolves.toEqual([]);
  });

  it("getTeams returns fallback on failures", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down"));

    await expect(getTeams()).resolves.toEqual([]);
  });

  it("getTeam returns fetched value when available", async () => {
    const team = {
      _id: "team-1",
      _type: "team",
      name: "GrownSense",
      slug: { current: "grownsense" },
      projects: [],
    };
    fetchMock.mockResolvedValueOnce(team);

    await expect(getTeam("grownsense")).resolves.toEqual(team);
    expect(fetchMock).toHaveBeenCalledWith(QUERIES.teamBySlug, {
      slug: "grownsense",
    });
  });
});
