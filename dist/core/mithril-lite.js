// Minimal Mithril-style vdom + renderer, SVG support, no lifecycle, no fragments.
export function Vnode(tag, key, attrs, children, text, dom) {
    return { tag, key, attrs, children, text, dom };
}
// Normalize a single node into a vnode or null
Vnode.normalize = function (node) {
    if (Array.isArray(node)) {
        const normalized = Vnode.normalizeChildren(node);
        // Return first element or null for arrays
        return normalized.length > 0 ? normalized[0] : null;
    }
    if (node == null || typeof node === "boolean")
        return null;
    if (typeof node === "object")
        return node;
    return Vnode("#", null, null, null, String(node), null);
};
// Normalize children: returns a dense array, no nulls
Vnode.normalizeChildren = function (input) {
    const out = [];
    let keyed = 0;
    let elems = 0;
    for (let i = 0; i < input.length; i++) {
        const child = Vnode.normalize(input[i]);
        if (child == null)
            continue;
        out.push(child);
        if (child.tag !== "#") {
            elems++;
            if (child.key != null)
                keyed++;
        }
    }
    if (elems > 0 && keyed !== 0 && keyed !== elems) {
        throw new TypeError("All element children must either all have keys or none.");
    }
    return out;
};
// -----------------------------------------------------------------------------
// HYPERSCRIPT
// -----------------------------------------------------------------------------
const hasOwn = {}.hasOwnProperty;
const emptyAttrs = {};
const selectorParser = /(^|#|\.)([^#\.]+)/g;
const selectorCache = Object.create(null);
const isEmpty = (o) => {
    for (const k in o)
        if (hasOwn.call(o, k))
            return false;
    return true;
};
function compileSelector(selector) {
    let match;
    let tag = "div";
    const classes = [];
    let attrs = {};
    while ((match = selectorParser.exec(selector))) {
        const type = match[1];
        const value = match[2];
        if (type === "" && value !== "")
            tag = value;
        else if (type === "#")
            attrs.id = value;
        else if (type === ".")
            classes.push(value);
    }
    if (classes.length)
        attrs.class = classes.join(" ");
    if (isEmpty(attrs))
        attrs = emptyAttrs;
    const result = { tag, attrs };
    selectorCache[selector] = result;
    return result;
}
function execSelector(state, vnode) {
    vnode.tag = state.tag;
    let a = vnode.attrs;
    if (a == null) {
        vnode.attrs = state.attrs;
        return vnode;
    }
    if (state.attrs !== emptyAttrs) {
        const merged = { ...state.attrs, ...a };
        if (state.attrs.class != null && a.class != null) {
            merged.class = state.attrs.class + " " + a.class;
        }
        vnode.attrs = merged;
    }
    return vnode;
}
// m(selector, attrs?, ...children)
export function m(selector, ...rest) {
    if (typeof selector !== "string") {
        throw new Error("Selector must be a string");
    }
    let attrs = null;
    let i = 0;
    if (rest.length &&
        (rest[0] == null ||
            (typeof rest[0] === "object" && !Array.isArray(rest[0])))) {
        attrs = rest[0];
        i = 1;
    }
    const children = Vnode.normalizeChildren(rest.slice(i));
    const vnode = Vnode("", attrs && attrs.key, attrs || null, children, null, null);
    const state = selectorCache[selector] || compileSelector(selector);
    return execSelector(state, vnode);
}
// -----------------------------------------------------------------------------
// DOM RENDERER
// -----------------------------------------------------------------------------
const namespaceMap = {
    svg: "http://www.w3.org/2000/svg",
    math: "http://www.w3.org/1998/Math/MathML",
};
function getNameSpace(vnode) {
    return (vnode.attrs && vnode.attrs.xmlns) || namespaceMap[vnode.tag];
}
function createNodes(parent, vnodes, start, end, nextSibling, ns) {
    for (let i = start; i < end; i++) {
        const v = vnodes[i];
        createNode(parent, v, ns, nextSibling);
    }
}
function createNode(parent, vnode, ns, nextSibling) {
    if (vnode.tag === "#") {
        const doc = parent.ownerDocument;
        if (!doc)
            throw new Error("Parent node has no ownerDocument");
        const t = (vnode.dom = doc.createTextNode(vnode.text || ""));
        insertDOM(parent, t, nextSibling);
    }
    else {
        createElement(parent, vnode, ns, nextSibling);
    }
}
function createElement(parent, vnode, ns, nextSibling) {
    const tag = vnode.tag;
    const attrs = vnode.attrs;
    ns = getNameSpace(vnode) || ns;
    const doc = parent.ownerDocument;
    const el = ns != null ? doc.createElementNS(ns, tag) : doc.createElement(tag);
    vnode.dom = el;
    if (attrs != null)
        setAttrs(vnode, attrs, ns);
    insertDOM(parent, el, nextSibling);
    const kids = vnode.children;
    if (kids != null)
        createNodes(el, kids, 0, kids.length, null, ns);
}
function updateNodes(parent, oldRaw, newRaw, nextSibling, ns) {
    const old = oldRaw || [];
    const vnodes = newRaw || [];
    if (old === vnodes)
        return;
    if (old.length === 0) {
        if (vnodes.length > 0)
            createNodes(parent, vnodes, 0, vnodes.length, nextSibling, ns);
        return;
    }
    if (vnodes.length === 0) {
        removeNodes(parent, old, 0, old.length);
        return;
    }
    const oldKeyed = old[0].key != null;
    const newKeyed = vnodes[0].key != null;
    // key mode changed → replace whole list
    if (oldKeyed !== newKeyed) {
        removeNodes(parent, old, 0, old.length);
        createNodes(parent, vnodes, 0, vnodes.length, nextSibling, ns);
        return;
    }
    // unkeyed: simple index diff
    if (!newKeyed) {
        const common = Math.min(old.length, vnodes.length);
        for (let i = 0; i < common; i++) {
            const o = old[i];
            const v = vnodes[i];
            if (o === v)
                continue;
            updateNode(parent, o, v, getNextSibling(old, i + 1, nextSibling), ns);
        }
        if (old.length > common)
            removeNodes(parent, old, common, old.length);
        if (vnodes.length > common)
            createNodes(parent, vnodes, common, vnodes.length, nextSibling, ns);
        return;
    }
    // keyed: simple, safe diff (no reordering support).
    const minLen = Math.min(old.length, vnodes.length);
    let mismatch = false;
    for (let i = 0; i < minLen; i++) {
        const o = old[i];
        const v = vnodes[i];
        if (!o || !v || o.key !== v.key) {
            mismatch = true;
            break;
        }
        if (o === v)
            continue;
        updateNode(parent, o, v, getNextSibling(old, i + 1, nextSibling), ns);
    }
    if (mismatch) {
        // Fallback: replace entire keyed segment
        removeNodes(parent, old, 0, old.length);
        createNodes(parent, vnodes, 0, vnodes.length, nextSibling, ns);
        return;
    }
    if (old.length > minLen)
        removeNodes(parent, old, minLen, old.length);
    if (vnodes.length > minLen)
        createNodes(parent, vnodes, minLen, vnodes.length, nextSibling, ns);
}
function updateNode(parent, old, vnode, nextSibling, ns) {
    if (old === vnode)
        return;
    if (old.tag === vnode.tag) {
        if (vnode.tag === "#") {
            if (old.text !== vnode.text) {
                old.dom.nodeValue = vnode.text;
            }
            vnode.dom = old.dom;
        }
        else {
            vnode.dom = old.dom;
            if (old.attrs !== vnode.attrs)
                updateAttrs(vnode, old.attrs, vnode.attrs, ns);
            updateNodes(vnode.dom, old.children, vnode.children, null, ns);
        }
    }
    else {
        removeNode(parent, old);
        createNode(parent, vnode, ns, nextSibling);
    }
}
function insertDOM(parent, dom, next) {
    if (next)
        parent.insertBefore(dom, next);
    else
        parent.appendChild(dom);
}
function removeNodes(parent, vnodes, start, end) {
    for (let i = start; i < end; i++) {
        const v = vnodes[i];
        removeNode(parent, v);
    }
}
function removeNode(parent, vnode) {
    const dom = vnode.dom;
    if (dom && dom.parentNode === parent)
        parent.removeChild(dom);
}
function getNextSibling(vnodes, i, next) {
    for (; i < vnodes.length; i++) {
        const v = vnodes[i];
        if (v && v.dom)
            return v.dom;
    }
    return next;
}
// -----------------------------------------------------------------------------
// ATTRIBUTES (strict mithril-lite)
// -----------------------------------------------------------------------------
function setAttrs(vnode, attrs, ns) {
    for (const k in attrs)
        if (hasOwn.call(attrs, k))
            setAttr(vnode, k, null, attrs[k], ns);
}
function setAttr(vnode, key, old, value, ns) {
    if (key === "key")
        return;
    const dom = vnode.dom;
    // events
    if (key.startsWith("on")) {
        dom[key] = typeof value === "function" ? value : null;
        return;
    }
    if (value == null) {
        removeAttr(vnode, key, old, ns);
        return;
    }
    if (key === "style") {
        updateStyle(dom, old, value);
        return;
    }
    if (key === "class") {
        dom.setAttribute("class", value);
        return;
    }
    if (typeof value === "boolean") {
        value ? dom.setAttribute(key, "") : dom.removeAttribute(key);
        return;
    }
    dom.setAttribute(key, String(value));
}
function removeAttr(vnode, key, old, ns) {
    const dom = vnode.dom;
    if (key.startsWith("on")) {
        dom[key] = null;
        return;
    }
    if (key === "style") {
        updateStyle(dom, old, null);
        return;
    }
    if (key === "class") {
        dom.removeAttribute("class");
        return;
    }
    dom.removeAttribute(key);
}
function updateAttrs(vnode, old, attrs, ns) {
    if (old) {
        for (const k in old) {
            const ov = old[k];
            if (ov != null && (!attrs || attrs[k] == null))
                removeAttr(vnode, k, ov, ns);
        }
    }
    if (attrs) {
        for (const k in attrs) {
            const nv = attrs[k];
            const ov = old && old[k];
            if (nv !== ov)
                setAttr(vnode, k, ov, nv, ns);
        }
    }
}
function updateStyle(dom, old, style) {
    if (style == null) {
        dom.removeAttribute("style");
        return;
    }
    if (typeof style === "string") {
        dom.setAttribute("style", style);
        return;
    }
    dom.removeAttribute("style");
    for (const k in style) {
        const v = style[k];
        if (v != null) {
            if (k.includes("-"))
                dom.style.setProperty(k, String(v));
            else
                dom.style[k] = String(v);
        }
    }
}
// -----------------------------------------------------------------------------
// PUBLIC RENDER
// -----------------------------------------------------------------------------
export function render(dom, vnodes) {
    if (!dom)
        throw new TypeError("Root DOM is null");
    const ns = dom.namespaceURI;
    const prev = dom.vnodes;
    if (prev == null)
        dom.textContent = "";
    const list = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [vnodes]);
    updateNodes(dom, prev, list, null, ns === "http://www.w3.org/1999/xhtml" ? undefined : (ns ?? undefined));
    dom.vnodes = list;
}
//# sourceMappingURL=mithril-lite.js.map