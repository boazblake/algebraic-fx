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

import type { Vnode, VnodeChild } from "./mithril-lite.js";

type Primitive = string | number | boolean | null | undefined;

// Escape text node content
const escapeText = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Escape attribute values (stricter) - now includes newline/tab escaping
const escapeAttr = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "&#10;")
    .replace(/\r/g, "&#13;")
    .replace(/\t/g, "&#9;");

// Type guard for Vnode (compatible with mithril-lite.ts structure)
const isVnode = (n: unknown): n is Vnode =>
  !!n &&
  typeof n === "object" &&
  "tag" in (n as any) &&
  typeof (n as any).tag === "string";

const VOID = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

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
export const renderToString = (node: unknown): string => {
  if (node === null || node === false || node === true) return "";

  if (typeof node === "string") return escapeText(node);
  if (typeof node === "number") return escapeText(String(node));

  if (Array.isArray(node)) {
    let out = "";
    for (let i = 0; i < node.length; i++) {
      out += renderToString(node[i]);
    }
    return out;
  }

  if (!isVnode(node)) return "";

  const { tag, attrs, children, text } = node;

  // Handle text nodes (tag === "#")
  if (tag === "#") {
    return text != null ? escapeText(text) : "";
  }

  // Build attribute string from attrs (not props!)
  const rawAttrs: Record<string, unknown> = attrs || {};
  const attrStr = Object.entries(rawAttrs)
    .filter(([k, v]) => {
      // Skip special keys and non-serializable values
      if (k === "key") return false;
      if (k.startsWith("on")) return false; // Skip event handlers
      if (v === null || v === false || v === undefined) return false;
      if (typeof v === "function") return false;
      return true;
    })
    .map(([k, v]) => {
      if (v === true) return k;

      // Handle style object
      if (k === "style" && typeof v === "object" && v !== null) {
        const styleStr = Object.entries(v as Record<string, any>)
          .filter(([, val]) => val != null)
          .map(([prop, val]) => `${prop}: ${val}`)
          .join("; ");
        return styleStr ? `style="${escapeAttr(styleStr)}"` : "";
      }

      return `${k}="${escapeAttr(String(v))}"`;
    })
    .filter(Boolean)
    .join(" ");

  const open = attrStr ? `<${tag} ${attrStr}>` : `<${tag}>`;
  if (VOID.has(tag)) return open;

  // Render children
  const kids = children || [];
  let inner = "";
  for (let i = 0; i < kids.length; i++) {
    const child = kids[i];
    if (child != null) {
      inner += renderToString(child);
    }
  }

  return `${open}${inner}</${tag}>`;
};
