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
