/**
 * Typed shapes mirroring the Sanity studio schemas at
 * `studio-hack-michigan-/schemaTypes/`.
 *
 * These are **hand-written** (no codegen) so the two sides can drift.
 * When you change a studio schema, update this file in the same PR.
 *
 * Optional vs. required: this reflects what the Astro consumers can safely
 * assume is present at build time. Studio-required fields (title/slug on
 * project; name/slug on team) are modeled non-optional here so pages don't
 * need redundant null checks. Everything the studio marks optional is `?:`.
 */

import type { SanityImageSource } from "@sanity/image-url";

/** Sanity slug shape. */
export interface Slug {
  current: string;
  _type?: "slug";
}

/** Minimal image asset reference. Feed into `urlFor()` to build URLs. */
export type SanityImage = SanityImageSource;

/** A team member object within `team.members[]`. All socials optional. */
export interface TeamMember {
  _key?: string;
  name: string;
  role?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  bluesky?: string;
  mastodon?: string;
  instagram?: string;
  website?: string;
}

/** `team` document. */
export interface Team {
  _id: string;
  _type: "team";
  name: string;
  slug: Slug;
  logo?: SanityImage;
  teamDescription?: PortableTextBlock[];
  members?: TeamMember[];
}

/**
 * `team` document as returned by `getTeam()` — includes the reverse-referenced
 * projects we pull alongside. The `projects` array is synthesized in GROQ,
 * not stored on the document.
 */
export interface TeamWithProjects extends Team {
  projects?: HackathonProjectPreview[];
}

/** Full `hackathonProject` document as authored in Studio. */
export interface HackathonProject {
  _id: string;
  _type: "hackathonProject";
  title: string;
  slug: Slug;
  team?: TeamRef;
  description?: PortableTextBlock[];
  mainImage?: SanityImage;
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  technologies?: string[];
  track?: string;
}

/**
 * A reduced project shape for listing pages — only the fields the card
 * renderer needs. Keep in sync with `projectPreviewProjection` in queries.ts.
 */
export interface HackathonProjectPreview {
  _id: string;
  title: string;
  slug: Slug;
  team?: TeamRef;
  description?: PortableTextBlock[];
  mainImage?: SanityImage;
  technologies?: string[];
  githubUrl?: string;
  demoUrl?: string;
}

/** Minimal team info embedded on a project (post-dereference). */
export interface TeamRef {
  _id: string;
  name: string;
  slug: Slug;
}

/**
 * A narrow shape of a Portable Text block. Expanded just enough to walk
 * text children for length calculation and plain-text extraction. The
 * `astro-portabletext` renderer handles the full shape at render time.
 */
export interface PortableTextSpan {
  _type: "span";
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _key?: string;
  _type: string;
  children?: PortableTextSpan[];
  style?: string;
  markDefs?: Array<{ _key: string; _type: string; [k: string]: unknown }>;
  [k: string]: unknown;
}
