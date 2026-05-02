/**
 * GROQ queries as named constants.
 *
 * Why constants?
 *   - One place to review what fields are pulled (security/perf).
 *   - Projection strings are composable — the preview projection is reused
 *     by both the listing query and the reverse-reference on team pages.
 *   - Consumers don't hand-roll GROQ strings, which kept leaking `...`
 *     splats into the old call sites and over-fetching.
 *
 * Naming: `*Query` returns a document or array; `*Projection` is a fragment
 * that gets embedded in a larger query.
 */

/** Fields needed to render a project card anywhere on the site. */
export const projectPreviewProjection = `{
  _id,
  title,
  slug,
  description,
  mainImage,
  technologies,
  githubUrl,
  demoUrl,
  "team": team->{ _id, name, slug }
}`;

/** Fields needed for the project detail page. */
export const projectDetailProjection = `{
  _id,
  title,
  slug,
  description,
  mainImage,
  technologies,
  track,
  githubUrl,
  demoUrl,
  videoUrl,
  "team": team->{ _id, name, slug }
}`;

/** Fields needed for the team detail page, including reverse-referenced projects. */
export const teamDetailProjection = `{
  _id,
  name,
  slug,
  logo,
  members,
  "projects": *[_type == "hackathonProject" && references(^._id) && defined(slug.current)] ${projectPreviewProjection}
}`;

export const QUERIES = {
  projectSlugs: `*[_type == "hackathonProject" && defined(slug.current)] | order(slug.current asc).slug.current`,
  projectList: `*[_type == "hackathonProject" && defined(slug.current)] ${projectPreviewProjection} | order(title asc)`,
  projectBySlug: `*[_type == "hackathonProject" && slug.current == $slug][0] ${projectDetailProjection}`,

  teamSlugs: `*[_type == "team" && defined(slug.current)] | order(slug.current asc).slug.current`,
  teamList: `*[_type == "team"] ${teamDetailProjection} | order(name asc)`,
  teamBySlug: `*[_type == "team" && slug.current == $slug][0] ${teamDetailProjection}`,
} as const;
