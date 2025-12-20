/**
 * Server-side renderer that converts a mithril-lite Vnode tree into an escaped HTML string.
 *
 * This is intended for SSR and static pre-rendering.
 *
 * Supported input shapes:
 *  - Vnode objects from mithril-lite (including text nodes with tag "#")
 *  - arrays of supported nodes
 *  - primitives (string/number/boolean/null/undefined)
 *
 * Escaping:
 *  - Text nodes are escaped for HTML.
 *  - Attribute values are escaped for HTML and also escape newlines/tabs.
 *
 * Limitations:
 *  - Event handlers (attrs starting with "on") are ignored.
 *  - Non-serializable attribute values (functions, nullish, false) are ignored.
 *  - Void elements are emitted without closing tags.
 */
/**
 * Convert a mithril-lite vnode tree into an escaped HTML string.
 *
 * Input: a Vnode, an array of nodes, or a primitive.
 * Output: an HTML string with text and attribute values escaped.
 *
 * Serialization rules:
 *  - `tag === "#"` renders as escaped text (using `text`).
 *  - `attrs.key` is ignored.
 *  - attributes starting with `"on"` are ignored (event handlers).
 *  - boolean `true` attributes render as bare keys (e.g. `disabled`).
 *  - `style` objects are serialized into a `style="k: v; ..."` string.
 *  - void elements are emitted without a closing tag.
 *
 * @param node A Vnode, array of nodes, string, number, boolean, null, or undefined.
 * @returns Escaped HTML string.
 *
 * @example
 * renderToString(m("div", "Hello")) === "<div>Hello</div>"
 * renderToString(m("div", { class: "test" }, "Hi")) === '<div class="test">Hi</div>'
 */
export declare const renderToString: (node: unknown) => string;
//# sourceMappingURL=render-to-string.d.ts.map