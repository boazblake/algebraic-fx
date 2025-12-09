/**
 * Server-side renderer producing an escaped HTML string from a VNode tree.
 *
 * Key features:
 *  - Escapes text and attribute values
 *  - Supports nested VNodes, arrays, and primitives
 *  - Handles void HTML elements
 *  - Compatible with mithril-lite.ts Vnode structure
 *
 * Use this for SSR or pre-rendering static HTML.
 */
/**
 * Convert a vnode tree into an HTML string.
 *
 * CORRECTED: Now works with mithril-lite.ts Vnode structure using 'attrs' instead of 'props'.
 *
 * @param node A vnode, array, string, number, or null
 * @returns Escaped HTML string
 *
 * Text is escaped via escapeText.
 * Attributes are escaped via escapeAttr.
 *
 * @example
 * renderToString(m("div", "Hello")) === "<div>Hello</div>"
 * renderToString(m("div", { class: "test" }, "Hi")) === '<div class="test">Hi</div>'
 */
export declare const renderToString: (node: unknown) => string;
//# sourceMappingURL=render-to-string.d.ts.map