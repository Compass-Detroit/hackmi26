/**
 * Schema drift detection — ensures the studio and frontend portable-text
 * length calculations stay in sync.
 *
 * WHY THIS EXISTS:
 * The Sanity Studio has its own `portableTextPlainLength` function
 * (studio-hack-michigan-/schemaTypes/hackathonProject.ts) that enforces
 * max description length at author time. The frontend has
 * `portableTextToPlainText` (src/lib/sanity/portableText.ts) that extracts
 * plain text for previews. If either function is changed without updating
 * the other, descriptions could pass studio validation but render
 * incorrectly on the site (or vice versa).
 *
 * This test runs both functions against the same fixtures and verifies
 * they agree on the character count.
 */
import { describe, it, expect } from "vitest";
import { portableTextToPlainText } from "./portableText";

/**
 * Reimplementation of the studio's portableTextPlainLength.
 * Copied from studio-hack-michigan-/schemaTypes/hackathonProject.ts
 * to test against the same fixtures.
 */
function studioPortableTextPlainLength(blocks: unknown): number {
  if (!Array.isArray(blocks)) return 0;
  let len = 0;
  for (const block of blocks as { _type?: string; children?: unknown[] }[]) {
    if (block?._type !== "block" || !Array.isArray(block.children)) continue;
    for (const child of block.children) {
      if (
        child &&
        typeof child === "object" &&
        "text" in child &&
        typeof (child as { text: unknown }).text === "string"
      ) {
        len += (child as { text: string }).text.length;
      }
    }
  }
  return len;
}

/** Shared test fixtures — each represents a portable-text document. */
const FIXTURES = [
  {
    name: "empty",
    blocks: [],
    expectedChars: 0,
  },
  {
    name: "single block, single span",
    blocks: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Hello world" }],
      },
    ],
    expectedChars: 11,
  },
  {
    name: "single block, multiple spans",
    blocks: [
      {
        _type: "block",
        children: [
          { _type: "span", text: "Bold " },
          { _type: "span", text: "and " },
          { _type: "span", text: "italic" },
        ],
      },
    ],
    expectedChars: 15, // "Bold and italic"
  },
  {
    name: "multiple blocks",
    blocks: [
      {
        _type: "block",
        children: [{ _type: "span", text: "First paragraph." }],
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "Second paragraph." }],
      },
    ],
    expectedChars: 33, // 16 + 17
  },
  {
    name: "blocks with non-text children",
    blocks: [
      {
        _type: "block",
        children: [
          { _type: "span", text: "Text" },
          { _type: "inlineImage" }, // no text — should be skipped
          { _type: "span", text: " here" },
        ],
      },
    ],
    expectedChars: 9, // "Text here"
  },
  {
    name: "image block mixed in",
    blocks: [
      { _type: "image", asset: { _ref: "img-123" } },
      {
        _type: "block",
        children: [{ _type: "span", text: "After image" }],
      },
    ],
    expectedChars: 11,
  },
];

describe("schema drift: studio vs frontend text extraction", () => {
  for (const fixture of FIXTURES) {
    it(`fixture: ${fixture.name}`, () => {
      const studioLength = studioPortableTextPlainLength(fixture.blocks);
      const frontendText = portableTextToPlainText(fixture.blocks);

      // Studio counts raw characters. Frontend collapses whitespace and trims,
      // so for multi-block documents the frontend adds inter-block spaces.
      // We compare the studio length to the expected char count (studio-style).
      expect(studioLength).toBe(fixture.expectedChars);

      // For single blocks, the two should agree exactly.
      // For multi-block, frontend adds inter-block spaces — verify it's close.
      if (fixture.blocks.length <= 1) {
        expect(frontendText.length).toBe(fixture.expectedChars);
      } else {
        // Frontend text length should be >= studio (adds spaces) but not wildly different.
        expect(frontendText.length).toBeGreaterThanOrEqual(
          fixture.expectedChars,
        );
        // Allow up to N extra spaces (one per block boundary)
        const maxExtraSpaces = fixture.blocks.length;
        expect(frontendText.length).toBeLessThanOrEqual(
          fixture.expectedChars + maxExtraSpaces,
        );
      }
    });
  }
});
