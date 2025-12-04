// core/render-to-string.ts
// Minimal vnode → HTML string renderer, with correct escaping for text and attributes.
// Escape text node content
const escapeText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// Escape attribute values (stricter)
const escapeAttr = (s) => s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
const isVNode = (n) => !!n && typeof n === "object" && "tag" in n;
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
export const renderToString = (node) => {
    if (node === null || node === false || node === true)
        return "";
    if (typeof node === "string")
        return escapeText(node);
    if (typeof node === "number")
        return escapeText(String(node));
    if (Array.isArray(node)) {
        let out = "";
        for (let i = 0; i < node.length; i++) {
            out += renderToString(node[i]);
        }
        return out;
    }
    if (!isVNode(node))
        return "";
    const { tag, props = {}, children = [] } = node;
    const rawProps = props || {};
    const attrs = Object.entries(rawProps)
        .filter(([, v]) => v !== null && v !== false && typeof v !== "function")
        .map(([k, v]) => {
        if (v === true)
            return k;
        return `${k}="${escapeAttr(String(v))}"`;
    })
        .join(" ");
    const open = attrs ? `<${tag} ${attrs}>` : `<${tag}>`;
    if (VOID.has(tag))
        return open;
    const kids = Array.isArray(children)
        ? children
        : [children];
    let inner = "";
    for (let i = 0; i < kids.length; i++) {
        inner += renderToString(kids[i]);
    }
    return `${open}${inner}</${tag}>`;
};
//# sourceMappingURL=render-to-string.js.map