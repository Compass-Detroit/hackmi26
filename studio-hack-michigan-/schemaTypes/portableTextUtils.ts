/**
 * Shared portable-text utilities for Sanity studio schema validators.
 *
 * Extracted so both `hackathonProject` and `team` schemas use the same
 * character-counting logic. Keep in sync with `src/lib/sanity/portableText.ts`
 * on the Astro side.
 */

/** Count plain-text characters across portable-text blocks. */
export function portableTextPlainLength(blocks: unknown): number {
  if (!Array.isArray(blocks)) return 0
  let len = 0
  for (const block of blocks as {_type?: string; children?: unknown[]}[]) {
    if (block?._type !== 'block' || !Array.isArray(block.children)) continue
    for (const child of block.children) {
      if (
        child &&
        typeof child === 'object' &&
        'text' in child &&
        typeof (child as {text: unknown}).text === 'string'
      ) {
        len += (child as {text: string}).text.length
      }
    }
  }
  return len
}
