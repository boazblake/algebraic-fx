import { describe, it, expect } from "vitest";
import { renderToString } from "../src/core/render-to-string.js";
import { m } from "../src/core/mithril-lite.js";

describe("renderToString", () => {
  it("renders simple element", () => {
    expect(renderToString(m("div", "hello"))).toBe("<div>hello</div>");
  });

  it("renders nested elements", () => {
    expect(renderToString(m("div", m("p", "text")))).toBe(
      "<div><p>text</p></div>"
    );
  });

  it("escapes text content", () => {
    expect(renderToString(m("div", "<script>alert('xss')</script>"))).toBe(
      "<div>&lt;script&gt;alert('xss')&lt;/script&gt;</div>"
    );
  });

  it("escapes attribute values", () => {
    expect(renderToString(m("div", { title: '<script>"test"</script>' }))).toBe(
      '<div title="&lt;script&gt;&quot;test&quot;&lt;/script&gt;"></div>'
    );
  });

  it("escapes newlines in attributes", () => {
    expect(renderToString(m("div", { title: "line1\nline2" }))).toBe(
      '<div title="line1&#10;line2"></div>'
    );
  });

  it("renders void elements without closing tag", () => {
    expect(renderToString(m("img", { src: "test.jpg" }))).toBe(
      '<img src="test.jpg">'
    );
    expect(renderToString(m("br"))).toBe("<br>");
    expect(renderToString(m("input", { type: "text" }))).toBe(
      '<input type="text">'
    );
  });

  it("renders boolean attributes", () => {
    expect(renderToString(m("input", { disabled: true }))).toBe(
      "<input disabled>"
    );
    expect(renderToString(m("input", { disabled: false }))).toBe("<input>");
  });

  it("skips null/false/undefined attributes", () => {
    expect(
      renderToString(m("div", { a: null, b: false, c: undefined, d: "value" }))
    ).toBe('<div d="value"></div>');
  });

  it("skips event handlers", () => {
    expect(renderToString(m("button", { onclick: () => {} }, "Click"))).toBe(
      "<button>Click</button>"
    );
  });

  it("skips key attribute", () => {
    expect(renderToString(m("div", { key: "test" }, "content"))).toBe(
      "<div>content</div>"
    );
  });

  it("handles style object", () => {
    const result = renderToString(
      m("div", { style: { color: "red", fontSize: "16px" } })
    );
    expect(result).toContain('style="');
    expect(result).toContain("color: red");
    expect(result).toContain("fontSize: 16px");
  });

  it("renders arrays of children", () => {
    expect(
      renderToString(m("ul", [m("li", "a"), m("li", "b"), m("li", "c")]))
    ).toBe("<ul><li>a</li><li>b</li><li>c</li></ul>");
  });

  it("filters null/false/undefined children", () => {
    expect(renderToString(m("div", null, false, undefined, "text", 123))).toBe(
      "<div>text123</div>"
    );
  });

  it("handles numbers", () => {
    expect(renderToString(m("div", 42))).toBe("<div>42</div>");
  });

  it("handles empty children", () => {
    expect(renderToString(m("div"))).toBe("<div></div>");
  });

  it("renders text nodes (tag === '#')", () => {
    const textVnode = {
      tag: "#",
      text: "hello",
      attrs: null,
      children: [],
      key: null,
      dom: null,
    };
    expect(renderToString(textVnode)).toBe("hello");
  });
});
