/** Max plain-text length allowed in Sanity for `hackathonProject.description` (keep in sync with schema). */
export const HACKATHON_DESCRIPTION_MAX_CHARS = 5000;

/** Plain characters shown on hackathon listing cards before ellipsis. */
export const HACKATHON_CARD_DESCRIPTION_CHARS = 220;

/**
 * Approximate plain text from Sanity portable text blocks (for previews and length checks).
 */
export function portableTextToPlainText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";
  let out = "";
  for (const block of blocks as { _type?: string; children?: unknown[] }[]) {
    if (block?._type !== "block" || !Array.isArray(block.children)) continue;
    for (const child of block.children) {
      if (
        child &&
        typeof child === "object" &&
        "text" in child &&
        typeof (child as { text: unknown }).text === "string"
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
  if (text.length <= maxLength) return text;
  const slice = text.slice(0, maxLength).replace(/\s+\S*$/, "");
  return slice.length > 0 ? `${slice}${ellipsis}` : ellipsis;
}
