import { sanityClient } from "sanity:client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function getTeams() {
  return await sanityClient.fetch(
    `*[_type == "team"] {
      ...,
      "projects": *[_type == "hackathonProject" && references(^._id)]
    } | order(name asc)`,
  );
}

export async function getTeam(slug: string) {
  return await sanityClient.fetch(
    `*[_type == "team" && slug.current == $slug][0] {
      ...,
      "projects": *[_type == "hackathonProject" && references(^._id)]
    }`,
    { slug },
  );
}

/** Slug strings only — use in `getStaticPaths` to avoid loading full documents. */
export async function getHackathonProjectSlugs() {
  const slugs = await sanityClient.fetch<string[] | null>(
    `*[_type == "hackathonProject" && defined(slug.current)] | order(slug.current asc).slug.current`,
  );
  return slugs ?? [];
}

export async function getHackathonProjects() {
  return await sanityClient.fetch(
    `*[_type == "hackathonProject"] {
      ...,
      team->
    } | order(title asc)`,
  );
}

export async function getHackathonProject(slug: string) {
  return await sanityClient.fetch(
    `*[_type == "hackathonProject" && slug.current == $slug][0] {
      ...,
      team->
    }`,
    { slug },
  );
}
