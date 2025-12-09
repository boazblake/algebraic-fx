import { describe, it, expect as expect2 } from "vitest";
import { renderToString } from "../src/core/render-to-string.js";
import { m as m2 } from "../src/core/mithril-lite.js";

describe("renderToString", () => {
  it("renders simple element", () => {
    expect2(renderToString(m2("div", "hello"))).toBe("<div>hello</div>");
  });

  it("renders nested elements", () => {
    expect2(renderToString(m2("div", m2("p", "text")))).toBe(
      "<div><p>text</p></div>"
    );
  });

  it("escapes text content", () => {
    expect2(renderToString(m2("div", "<script>alert('xss')</script>"))).toBe(
      "<div>&lt;script&gt;alert('xss')&lt;/script&gt;</div>"
    );
  });

  it("escapes attribute values", () => {
    expect2(
      renderToString(m2("div", { title: '<script>"test"</script>' }))
    ).toBe('<div title="&lt;script&gt;&quot;test&quot;&lt;/script&gt;"></div>');
  });

  it("escapes newlines in attributes", () => {
    expect2(renderToString(m2("div", { title: "line1\nline2" }))).toBe(
      '<div title="line1&#10;line2"></div>'
    );
  });

  it("renders void elements without closing tag", () => {
    expect2(renderToString(m2("img", { src: "test.jpg" }))).toBe(
      '<img src="test.jpg">'
    );
    expect2(renderToString(m2("br"))).toBe("<br>");
    expect2(renderToString(m2("input", { type: "text" }))).toBe(
      '<input type="text">'
    );
  });

  it("renders boolean attributes", () => {
    expect2(renderToString(m2("input", { disabled: true }))).toBe(
      "<input disabled>"
    );
    expect2(renderToString(m2("input", { disabled: false }))).toBe("<input>");
  });

  it("skips null/false/undefined attributes", () => {
    expect2(
      renderToString(m2("div", { a: null, b: false, c: undefined, d: "value" }))
    ).toBe('<div d="value"></div>');
  });

  it("skips event handlers", () => {
    expect2(renderToString(m2("button", { onclick: () => {} }, "Click"))).toBe(
      "<button>Click</button>"
    );
  });

  it("skips key attribute", () => {
    expect2(renderToString(m2("div", { key: "test" }, "content"))).toBe(
      "<div>content</div>"
    );
  });

  it("handles style object", () => {
    const result = renderToString(
      m2("div", { style: { color: "red", fontSize: "16px" } })
    );
    expect2(result).toContain('style="');
    expect2(result).toContain("color: red");
    expect2(result).toContain("fontSize: 16px");
  });

  it("renders arrays of children", () => {
    expect2(
      renderToString(m2("ul", [m2("li", "a"), m2("li", "b"), m2("li", "c")]))
    ).toBe("<ul><li>a</li><li>b</li><li>c</li></ul>");
  });

  it("filters null/false/undefined children", () => {
    expect2(
      renderToString(m2("div", null, false, undefined, "text", 123))
    ).toBe("<div>text123</div>");
  });

  it("handles numbers", () => {
    expect2(renderToString(m2("div", 42))).toBe("<div>42</div>");
  });

  it("handles empty children", () => {
    expect2(renderToString(m2("div"))).toBe("<div></div>");
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
    expect2(renderToString(textVnode)).toBe("hello");
  });
});
