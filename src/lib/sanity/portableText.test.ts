import { describe, it, expect } from "vitest";
import {
  portableTextToPlainText,
  truncatePlainText,
  HACKATHON_CARD_DESCRIPTION_CHARS,
} from "../sanity/portableText";

// ---------------------------------------------------------------------------
// portableTextToPlainText
// ---------------------------------------------------------------------------

describe("portableTextToPlainText", () => {
  it("returns empty string for non-array input", () => {
    expect(portableTextToPlainText(undefined)).toBe("");
    expect(portableTextToPlainText(null)).toBe("");
    expect(portableTextToPlainText("string")).toBe("");
    expect(portableTextToPlainText(42)).toBe("");
  });

  it("returns empty string for empty array", () => {
    expect(portableTextToPlainText([])).toBe("");
  });

  it("extracts text from a single block", () => {
    const blocks = [
      {
        _type: "block",
        children: [{ _type: "span", text: "Hello world" }],
      },
    ];
    expect(portableTextToPlainText(blocks)).toBe("Hello world");
  });

  it("concatenates multiple children within a block", () => {
    const blocks = [
      {
        _type: "block",
        children: [
          { _type: "span", text: "Hello " },
          { _type: "span", text: "world" },
        ],
      },
    ];
    expect(portableTextToPlainText(blocks)).toBe("Hello world");
  });

  it("concatenates multiple blocks with space separator", () => {
    const blocks = [
      {
        _type: "block",
        children: [{ _type: "span", text: "First." }],
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "Second." }],
      },
    ];
    expect(portableTextToPlainText(blocks)).toBe("First. Second.");
  });

  it("skips non-block types", () => {
    const blocks = [
      { _type: "image", asset: {} },
      {
        _type: "block",
        children: [{ _type: "span", text: "Visible" }],
      },
    ];
    expect(portableTextToPlainText(blocks)).toBe("Visible");
  });

  it("skips children without text property", () => {
    const blocks = [
      {
        _type: "block",
        children: [
          { _type: "span", text: "A" },
          { _type: "inlineImage" }, // no text
          { _type: "span", text: "B" },
        ],
      },
    ];
    expect(portableTextToPlainText(blocks)).toBe("AB");
  });

  it("collapses whitespace", () => {
    const blocks = [
      {
        _type: "block",
        children: [{ _type: "span", text: "  hello   world  " }],
      },
    ];
    expect(portableTextToPlainText(blocks)).toBe("hello world");
  });

  it("handles unicode and punctuation safely", () => {
    const blocks = [
      {
        _type: "block",
        children: [{ _type: "span", text: "Build AI 🚀 for Michigan — now!" }],
      },
    ];
    expect(portableTextToPlainText(blocks)).toBe(
      "Build AI 🚀 for Michigan — now!",
    );
  });
});

// ---------------------------------------------------------------------------
// truncatePlainText
// ---------------------------------------------------------------------------

describe("truncatePlainText", () => {
  it("returns text unchanged when under limit", () => {
    expect(truncatePlainText("short", 100)).toBe("short");
  });

  it("returns text unchanged when exactly at limit", () => {
    const text = "x".repeat(50);
    expect(truncatePlainText(text, 50)).toBe(text);
  });

  it("truncates at word boundary with ellipsis", () => {
    const text = "hello beautiful world";
    const result = truncatePlainText(text, 14);
    // Should cut before "world" → "hello beautiful" is 15, too long
    // Should cut before "beautiful" → "hello"
    expect(result).toBe("hello…");
  });

  it("uses custom ellipsis", () => {
    const text = "hello beautiful world";
    const result = truncatePlainText(text, 6, "...");
    expect(result).toBe("hello...");
  });

  it("returns slice + ellipsis when no word boundary found", () => {
    const text = "superlongwordwithoutspaces";
    const result = truncatePlainText(text, 5);
    // No whitespace in slice → regex strips nothing → raw slice + ellipsis
    expect(result).toBe("super…");
  });

  it("does not split surrogate pairs mid-character", () => {
    const text = "abc😀def";
    const result = truncatePlainText(text, 4);
    expect(result).toBe("abc😀…");
  });

  it("HACKATHON_CARD_DESCRIPTION_CHARS is a reasonable value", () => {
    expect(HACKATHON_CARD_DESCRIPTION_CHARS).toBeGreaterThan(100);
    expect(HACKATHON_CARD_DESCRIPTION_CHARS).toBeLessThan(500);
  });
});
