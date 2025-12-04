import type { VChild, VNode } from "./types.js";

type Primitive = string | number | boolean | null | undefined;

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isVNode = (n: unknown): n is VNode =>
  !!n && typeof n === "object" && "tag" in (n as any);

const VOID = new Set<string>([
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

export const renderToString = (node: VChild | VChild[]): string => {
  if (Array.isArray(node)) {
    return node.map(renderToString).join("");
  }

  if (node === null || node === false || node === true || node === undefined) {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return escapeHtml(String(node));
  }

  if (!isVNode(node)) return "";

  const { tag, props = {}, children = [] } = node;

  const safeProps = props ?? {};
  const attrs = Object.entries(safeProps)
    .filter(([, v]) => v !== null && v !== false && typeof v !== "function")
    .map(([k, v]) => (v === true ? k : `${k}="${escapeHtml(String(v))}"`))
    .join(" ");

  const open = attrs ? `<${tag} ${attrs}>` : `<${tag}>`;
  if (VOID.has(tag)) return open;

  const kids = Array.isArray(children)
    ? (children as VChild[])
    : ([children] as VChild[]);

  const inner = kids.map(renderToString).join("");

  return `${open}${inner}</${tag}>`;
};
