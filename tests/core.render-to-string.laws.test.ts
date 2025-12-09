// tests/core.renderToString.laws.test.ts
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { renderToString } from "../src/core/render-to-string.ts";

describe("renderToString (fast-check invariants)", () => {
  it("purity: same vnode → same string", () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), (tag, txt) => {
        const vnode = { tag, attrs: {}, children: [txt] };
        expect(renderToString(vnode)).toBe(renderToString(vnode));
      })
    );
  });

  it("escaping: < > & must be escaped", () => {
    const vnode = { tag: "div", attrs: {}, children: ["<&>"] };
    const s = renderToString(vnode);
    expect(s).toContain("&lt;&amp;&gt;");
  });

  it("JSON round-trip should preserve rendering", () => {
    fc.assert(
      fc.property(
        fc.record({
          tag: fc.string(),
          attrs: fc.dictionary(fc.string(), fc.string()),
          children: fc.array(fc.string()),
        }),
        (node) => {
          const one = renderToString(node);
          const two = renderToString(JSON.parse(JSON.stringify(node)));
          expect(one).toBe(two);
        }
      )
    );
  });
});
