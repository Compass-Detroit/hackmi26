/**
 * Portable-text helpers.
 *
 * Twin of `studio-hack-michigan-/schemaTypes/hackathonProject.ts:portableTextPlainLength`
 * — keep them in sync. The studio-side copy enforces max length at author
 * time; this file powers preview/truncation on the site.
 */

import type { PortableTextBlock } from "./schemas";

/** Max plain-text length allowed for `hackathonProject.description`. Mirror of studio validator. */
export const HACKATHON_DESCRIPTION_MAX_CHARS = 5000;

/** Plain characters shown on hackathon listing cards before ellipsis. */
export const HACKATHON_CARD_DESCRIPTION_CHARS = 220;

/** Approximate plain text from portable-text blocks (for previews + length checks). */
export function portableTextToPlainText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";
  let out = "";
  for (const block of blocks as PortableTextBlock[]) {
    if (block?._type !== "block" || !Array.isArray(block.children)) continue;
    for (const child of block.children) {
      if (
        child &&
        typeof child === "object" &&
        typeof (child as { text?: unknown }).text === "string"
      ) {
        out += (child as { text: string }).text;
      }
    }
    out += " ";
  }
  return out.replace(/\s+/g, " ").trim();
}

export function truncatePlainText(
  text: string,
  maxLength: number,
  ellipsis = "…",
): string {
  if (maxLength <= 0) return ellipsis;

  const chars = Array.from(text);
  if (chars.length <= maxLength) return text;

  const slice = chars.slice(0, maxLength).join("");
  const wordBoundarySlice = slice.replace(/\s+\S*$/, "").trimEnd();
  const base =
    wordBoundarySlice.length > 0 ? wordBoundarySlice : slice.trimEnd();

  return base.length > 0 ? `${base}${ellipsis}` : ellipsis;
}
