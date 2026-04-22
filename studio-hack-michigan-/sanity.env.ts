/**
 * Resolve Sanity project + dataset for Studio and CLI.
 *
 * Precedence (first non-empty wins):
 * 1. SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET — Studio-only (e.g. point local Studio at a dev dataset)
 * 2. PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET — same names as the Astro site (`astro.config.mjs`)
 * 3. Built-in defaults (production project; use env to override)
 *
 * Sanity CLI loads `.env` from this directory when you run `sanity dev` / `sanity deploy`.
 * You can also place a repo-root `.env` and duplicate or symlink vars, or export them in the shell.
 */
const DEFAULT_PROJECT_ID = 'f188znys'
const DEFAULT_DATASET = 'production'

function firstNonEmpty(...values: (string | undefined)[]): string | undefined {
  for (const v of values) {
    const t = v?.trim()
    if (t) return t
  }
  return undefined
}

export const sanityEnv = {
  projectId:
    firstNonEmpty(process.env.SANITY_STUDIO_PROJECT_ID, process.env.PUBLIC_SANITY_PROJECT_ID) ??
    DEFAULT_PROJECT_ID,
  dataset:
    firstNonEmpty(process.env.SANITY_STUDIO_DATASET, process.env.PUBLIC_SANITY_DATASET) ??
    DEFAULT_DATASET,
} as const
