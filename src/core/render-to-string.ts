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

import type { VChild, VNode, Props } from "./types.js";

type Primitive = string | number | boolean | null | undefined;

// Escape text node content
const escapeText = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Escape attribute values (stricter)
const escapeAttr = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const isVNode = (n: unknown): n is VNode =>
  !!n && typeof n === "object" && "tag" in (n as any);

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
 * @param node A vnode, array, string, number, or null
 * @returns Escaped HTML string
 *
 * Text is escaped via escapeText.
 * Attributes are escaped via escapeAttr.
 *
 * @example
 * renderToString(m("div", "Hello")) === "<div>Hello</div>"
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

  if (!isVNode(node)) return "";

  const { tag, props = {} as Props, children = [] } = node;

  const rawProps: Record<string, unknown> = props || {};
  const attrs = Object.entries(rawProps)
    .filter(([, v]) => v !== null && v !== false && typeof v !== "function")
    .map(([k, v]) => {
      if (v === true) return k;
      return `${k}="${escapeAttr(String(v))}"`;
    })
    .join(" ");

  const open = attrs ? `<${tag} ${attrs}>` : `<${tag}>`;
  if (VOID.has(tag)) return open;

  const kids = Array.isArray(children)
    ? (children as Primitive[])
    : ([children as Primitive] as Primitive[]);

  let inner = "";
  for (let i = 0; i < kids.length; i++) {
    inner += renderToString(kids[i]);
  }

  return `${open}${inner}</${tag}>`;
};
