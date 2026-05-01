/**
 * Typed data-fetching wrappers over `sanityClient.fetch`.
 *
 * Design:
 *   - Every fetcher declares its return type explicitly.
 *   - Errors are caught and logged with context; list fetchers degrade to
 *     `[]` so a Sanity outage yields an empty page rather than a build
 *     crash. Detail fetchers return `null` on error/miss.
 *   - Pages never touch GROQ strings or `sanityClient` directly.
 *
 * This keeps pages declarative (they consume typed data) and lets us swap
 * the data source (mock, cached, different CMS) without touching pages.
 */

import { sanityClient } from "./client";
import { QUERIES } from "./queries";
import type {
  HackathonProject,
  HackathonProjectPreview,
  TeamWithProjects,
} from "./schemas";

const strictSanity =
  !import.meta.env.DEV && import.meta.env.PUBLIC_SANITY_STRICT_MODE === "true";

/**
 * Wrap a fetch so a Sanity failure doesn't kill the whole build.
 * Returns `fallback` on error and logs the issue.
 */
async function safeFetch<T>(
  label: string,
  promise: Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await promise;
  } catch (err) {
    console.error(`[sanity] ${label} failed:`, err);
    if (strictSanity) throw err;
    return fallback;
  }
}

// ---- Projects --------------------------------------------------------------

export function getProjectSlugs(): Promise<string[]> {
  return safeFetch(
    "getProjectSlugs",
    sanityClient
      .fetch<string[] | null>(QUERIES.projectSlugs)
      .then((s) => s ?? []),
    [],
  );
}

export function getProjects(): Promise<HackathonProjectPreview[]> {
  return safeFetch(
    "getProjects",
    sanityClient
      .fetch<HackathonProjectPreview[] | null>(QUERIES.projectList)
      .then((p) => p ?? []),
    [],
  );
}

export function getProject(slug: string): Promise<HackathonProject | null> {
  return safeFetch(
    `getProject(${slug})`,
    sanityClient.fetch<HackathonProject | null>(QUERIES.projectBySlug, {
      slug,
    }),
    null,
  );
}

// ---- Teams -----------------------------------------------------------------

export function getTeamSlugs(): Promise<string[]> {
  return safeFetch(
    "getTeamSlugs",
    sanityClient.fetch<string[] | null>(QUERIES.teamSlugs).then((s) => s ?? []),
    [],
  );
}

export function getTeams(): Promise<TeamWithProjects[]> {
  return safeFetch(
    "getTeams",
    sanityClient
      .fetch<TeamWithProjects[] | null>(QUERIES.teamList)
      .then((t) => t ?? []),
    [],
  );
}

export function getTeam(slug: string): Promise<TeamWithProjects | null> {
  return safeFetch(
    `getTeam(${slug})`,
    sanityClient.fetch<TeamWithProjects | null>(QUERIES.teamBySlug, { slug }),
    null,
  );
}
