/**
 * Server-side renderer producing an escaped HTML string from a VNode tree.
 *
 * Key features:
 *  - Escapes text and attribute values
 *  - Supports nested VNodes, arrays, and primitives
 *  - Handles void HTML elements
 *
 * Use this for SSR or pre-rendering static HTML.
 */
/**
 * Convert a vnode tree into an HTML string.
 *
 * @param node A vnode, array, string, number, or null
 * @returns Escaped HTML string
 *
 * Text is escaped via escapeText.
 * Attributes are escaped via escapeAttr.
 *
 * @example
 * renderToString(m("div", "Hello")) === "<div>Hello</div>"
 */
export declare const renderToString: (node: unknown) => string;
//# sourceMappingURL=render-to-string.d.ts.map