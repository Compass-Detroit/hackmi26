import { describe, it, expect } from "vitest";
import { withBase } from "./nav";

describe("withBase", () => {
  describe("with root base '/'", () => {
    const base = "/";

    it("prefixes anchor hrefs", () => {
      expect(withBase(base, "#about")).toBe("/#about");
    });

    it("passes through absolute paths unchanged", () => {
      expect(withBase(base, "/hackathon/")).toBe("/hackathon/");
    });

    it("passes through external https URLs", () => {
      expect(withBase(base, "https://ibm.biz/hack-michigan")).toBe(
        "https://ibm.biz/hack-michigan",
      );
    });

    it("passes through mailto: links", () => {
      expect(withBase(base, "mailto:info@example.com")).toBe(
        "mailto:info@example.com",
      );
    });
  });

  describe("with non-root base '/hackmi26/'", () => {
    const base = "/hackmi26/";

    it("prefixes anchor hrefs with base", () => {
      expect(withBase(base, "#about")).toBe("/hackmi26/#about");
    });

    it("prepends base to absolute paths", () => {
      expect(withBase(base, "/hackathon/")).toBe("/hackmi26/hackathon/");
    });

    it("passes through external URLs unchanged", () => {
      expect(withBase(base, "https://ibm.biz/hack")).toBe(
        "https://ibm.biz/hack",
      );
    });

    it("passes through http URLs unchanged", () => {
      expect(withBase(base, "http://example.com")).toBe("http://example.com");
    });

    it("passes through mailto: unchanged", () => {
      expect(withBase(base, "mailto:x@y.com")).toBe("mailto:x@y.com");
    });
  });
});
