import { describe, it, expect, beforeEach } from "vitest";
import { m, render, Vnode } from "../src/core/mithril-lite.js";

describe("mithril-lite: Hyperscript", () => {
  it("creates simple element", () => {
    const v = m("div");
    expect(v.tag).toBe("div");
    expect(v.attrs).toEqual({});
    expect(v.children).toEqual([]);
  });

  it("parses selector with id", () => {
    const v = m("div#main");
    expect(v.tag).toBe("div");
    expect(v.attrs?.id).toBe("main");
  });

  it("parses selector with classes", () => {
    const v = m("div.foo.bar");
    expect(v.tag).toBe("div");
    expect(v.attrs?.class).toBe("foo bar");
  });

  it("combines selector and attrs", () => {
    const v = m("div.foo", { class: "bar", id: "x" });
    expect(v.attrs?.class).toBe("foo bar");
    expect(v.attrs?.id).toBe("x");
  });

  it("handles text children", () => {
    const v = m("div", "hello");
    expect(v.children.length).toBe(1);
    expect(v.children[0]?.tag).toBe("#");
    expect(v.children[0]?.text).toBe("hello");
  });

  it("handles multiple children", () => {
    const v = m("div", m("span", "a"), m("span", "b"));
    expect(v.children.length).toBe(2);
    expect(v.children[0]?.tag).toBe("span");
    expect(v.children[1]?.tag).toBe("span");
  });

  it("handles nested arrays", () => {
    const v = m("div", [m("span", "a"), [m("span", "b"), m("span", "c")]]);
    expect(v.children.length).toBe(3);
  });

  it("filters out null/undefined/false children", () => {
    const v = m("div", null, false, undefined, "text");
    expect(v.children.length).toBe(1);
    expect(v.children[0]?.text).toBe("text");
  });

  it("supports keys", () => {
    const v = m("div", { key: "unique" }, "content");
    expect(v.key).toBe("unique");
  });

  it("throws on mixed keyed/unkeyed siblings", () => {
    expect(() => {
      m("div", m("span", { key: "a" }), m("span"));
    }).toThrow(/keys/);
  });
});

describe("mithril-lite: Rendering", () => {
  let root: HTMLDivElement;

  beforeEach(() => {
    root = document.createElement("div");
  });

  it("renders simple element", () => {
    render(root, m("span", "hello"));
    expect(root.innerHTML).toBe("<span>hello</span>");
  });

  it("renders nested elements", () => {
    render(root, m("div", m("p", "text")));
    expect(root.innerHTML).toBe("<div><p>text</p></div>");
  });

  it("renders attributes", () => {
    render(root, m("div", { id: "test", class: "foo" }));
    expect(root.innerHTML).toBe('<div id="test" class="foo"></div>');
  });

  it("renders boolean attributes", () => {
    render(root, m("input", { disabled: true, readonly: false }));
    const input = root.querySelector("input");
    expect(input?.hasAttribute("disabled")).toBe(true);
    expect(input?.hasAttribute("readonly")).toBe(false);
  });

  it("renders style as string", () => {
    render(root, m("div", { style: "color: red;" }));
    expect(root.innerHTML).toContain('style="color: red;"');
  });

  it("renders style as object", () => {
    render(root, m("div", { style: { color: "blue", fontSize: "16px" } }));
    const div = root.querySelector("div");
    expect(div?.style.color).toBe("blue");
    expect(div?.style.fontSize).toBe("16px");
  });

  it("updates text content", () => {
    render(root, m("div", "hello"));
    expect(root.innerHTML).toBe("<div>hello</div>");

    render(root, m("div", "world"));
    expect(root.innerHTML).toBe("<div>world</div>");
  });

  it("updates attributes", () => {
    render(root, m("div", { class: "foo" }));
    expect(root.innerHTML).toBe('<div class="foo"></div>');

    render(root, m("div", { class: "bar" }));
    expect(root.innerHTML).toBe('<div class="bar"></div>');
  });

  it("removes attributes", () => {
    render(root, m("div", { class: "foo", id: "test" }));
    render(root, m("div", { class: "foo" }));

    const div = root.querySelector("div");
    expect(div?.hasAttribute("id")).toBe(false);
    expect(div?.getAttribute("class")).toBe("foo");
  });

  it("handles event handlers", () => {
    let clicked = false;
    const handler = () => {
      clicked = true;
    };

    render(root, m("button", { onclick: handler }, "Click"));
    const button = root.querySelector("button") as HTMLButtonElement;
    button.click();

    expect(clicked).toBe(true);
  });

  it("updates event handlers", () => {
    let count = 0;
    const handler1 = () => {
      count = 1;
    };
    const handler2 = () => {
      count = 2;
    };

    render(root, m("button", { onclick: handler1 }));
    const button = root.querySelector("button") as HTMLButtonElement;
    button.click();
    expect(count).toBe(1);

    render(root, m("button", { onclick: handler2 }));
    button.click();
    expect(count).toBe(2);
  });

  it("renders SVG elements", () => {
    render(
      root,
      m("svg", { width: "100", height: "100" }, m("circle", { r: "50" }))
    );

    const svg = root.querySelector("svg");
    expect(svg?.namespaceURI).toBe("http://www.w3.org/2000/svg");

    const circle = svg?.querySelector("circle");
    expect(circle?.namespaceURI).toBe("http://www.w3.org/2000/svg");
  });

  it("handles form input value updates", () => {
    render(root, m("input", { value: "initial" }));
    const input = root.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("initial");

    render(root, m("input", { value: "updated" }));
    expect(input.value).toBe("updated");
  });

  it("handles checkbox checked updates", () => {
    render(root, m("input", { type: "checkbox", checked: false }));
    const input = root.querySelector("input") as HTMLInputElement;
    expect(input.checked).toBe(false);

    render(root, m("input", { type: "checkbox", checked: true }));
    expect(input.checked).toBe(true);
  });
});

describe("mithril-lite: Unkeyed List Diffing", () => {
  let root: HTMLDivElement;

  beforeEach(() => {
    root = document.createElement("div");
  });

  it("adds items to end", () => {
    render(root, m("ul", m("li", "a"), m("li", "b")));
    expect(root.querySelectorAll("li").length).toBe(2);

    render(root, m("ul", m("li", "a"), m("li", "b"), m("li", "c")));
    expect(root.querySelectorAll("li").length).toBe(3);
    expect(root.querySelectorAll("li")[2].textContent).toBe("c");
  });

  it("removes items from end", () => {
    render(root, m("ul", m("li", "a"), m("li", "b"), m("li", "c")));
    expect(root.querySelectorAll("li").length).toBe(3);

    render(root, m("ul", m("li", "a"), m("li", "b")));
    expect(root.querySelectorAll("li").length).toBe(2);
  });

  it("updates items in place", () => {
    render(root, m("ul", m("li", "a"), m("li", "b")));
    const firstLi = root.querySelector("li");

    render(root, m("ul", m("li", "x"), m("li", "y")));
    const updatedLi = root.querySelector("li");

    // Same DOM node, just updated content
    expect(firstLi).toBe(updatedLi);
    expect(updatedLi?.textContent).toBe("x");
  });

  it("replaces all when switching from keyed to unkeyed", () => {
    render(
      root,
      m("ul", m("li", { key: "a" }, "a"), m("li", { key: "b" }, "b"))
    );
    const firstLi = root.querySelector("li");

    render(root, m("ul", m("li", "x"), m("li", "y")));
    const newFirstLi = root.querySelector("li");

    // Different DOM nodes (full replace)
    expect(firstLi).not.toBe(newFirstLi);
  });
});

describe("mithril-lite: Keyed List Diffing with LIS", () => {
  let root: HTMLDivElement;

  beforeEach(() => {
    root = document.createElement("div");
  });

  it("reorders items correctly", () => {
    render(
      root,
      m(
        "ul",
        m("li", { key: "a" }, "a"),
        m("li", { key: "b" }, "b"),
        m("li", { key: "c" }, "c")
      )
    );

    const items1 = Array.from(root.querySelectorAll("li"));
    expect(items1.map((el) => el.textContent)).toEqual(["a", "b", "c"]);

    // Reverse order
    render(
      root,
      m(
        "ul",
        m("li", { key: "c" }, "c"),
        m("li", { key: "b" }, "b"),
        m("li", { key: "a" }, "a")
      )
    );

    const items2 = Array.from(root.querySelectorAll("li"));
    expect(items2.map((el) => el.textContent)).toEqual(["c", "b", "a"]);

    // Same DOM nodes, just reordered
    expect(items2[2]).toBe(items1[0]); // 'a' node
    expect(items2[1]).toBe(items1[1]); // 'b' node
    expect(items2[0]).toBe(items1[2]); // 'c' node
  });

  it("adds new keyed items", () => {
    render(
      root,
      m("ul", m("li", { key: "a" }, "a"), m("li", { key: "b" }, "b"))
    );

    render(
      root,
      m(
        "ul",
        m("li", { key: "a" }, "a"),
        m("li", { key: "x" }, "x"),
        m("li", { key: "b" }, "b")
      )
    );

    const items = Array.from(root.querySelectorAll("li"));
    expect(items.map((el) => el.textContent)).toEqual(["a", "x", "b"]);
  });

  it("removes keyed items", () => {
    render(
      root,
      m(
        "ul",
        m("li", { key: "a" }, "a"),
        m("li", { key: "x" }, "x"),
        m("li", { key: "b" }, "b")
      )
    );

    render(
      root,
      m("ul", m("li", { key: "a" }, "a"), m("li", { key: "b" }, "b"))
    );

    const items = Array.from(root.querySelectorAll("li"));
    expect(items.map((el) => el.textContent)).toEqual(["a", "b"]);
  });

  it("handles complex reorder + add + remove", () => {
    render(
      root,
      m(
        "ul",
        m("li", { key: 1 }, "1"),
        m("li", { key: 2 }, "2"),
        m("li", { key: 3 }, "3"),
        m("li", { key: 4 }, "4")
      )
    );

    // Remove 2, add 5, reorder to [4, 1, 5, 3]
    render(
      root,
      m(
        "ul",
        m("li", { key: 4 }, "4"),
        m("li", { key: 1 }, "1"),
        m("li", { key: 5 }, "5"),
        m("li", { key: 3 }, "3")
      )
    );

    const items = Array.from(root.querySelectorAll("li"));
    expect(items.map((el) => el.textContent)).toEqual(["4", "1", "5", "3"]);
  });

  it("minimal moves with LIS optimization", () => {
    // [1, 2, 3, 4, 5] -> [1, 3, 2, 4, 5]
    // LIS should be [1, 3, 4, 5], only node 2 needs to move
    render(
      root,
      m(
        "ul",
        m("li", { key: 1 }, "1"),
        m("li", { key: 2 }, "2"),
        m("li", { key: 3 }, "3"),
        m("li", { key: 4 }, "4"),
        m("li", { key: 5 }, "5")
      )
    );

    const node2Before = root.querySelectorAll("li")[1];

    render(
      root,
      m(
        "ul",
        m("li", { key: 1 }, "1"),
        m("li", { key: 3 }, "3"),
        m("li", { key: 2 }, "2"),
        m("li", { key: 4 }, "4"),
        m("li", { key: 5 }, "5")
      )
    );

    const items = Array.from(root.querySelectorAll("li"));
    expect(items.map((el) => el.textContent)).toEqual([
      "1",
      "3",
      "2",
      "4",
      "5",
    ]);

    // Node 2 should be the same DOM element (just moved)
    expect(items[2]).toBe(node2Before);
  });
});
