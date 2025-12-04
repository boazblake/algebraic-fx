// Minimal Mithril-style vdom + renderer, SVG support, no lifecycle, no fragments.
// Longest Increasing Subsequence on an index array.
// Returns the list of positions that form the LIS.
// Entries < 0 are ignored.
function lis(arr) {
    const n = arr.length;
    const p = new Array(n);
    const result = [];
    for (let i = 0; i < n; i++) {
        const x = arr[i];
        if (x < 0) {
            p[i] = -1;
            continue;
        }
        let lo = 0;
        let hi = result.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[result[mid]] < x)
                lo = mid + 1;
            else
                hi = mid;
        }
        if (lo === result.length)
            result.push(i);
        else
            result[lo] = i;
        p[i] = lo > 0 ? result[lo - 1] : -1;
    }
    let k = result.length > 0 ? result[result.length - 1] : -1;
    const seq = [];
    while (k >= 0) {
        seq.push(k);
        k = p[k];
    }
    seq.reverse();
    return seq;
}
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
const MAX_CACHE_SIZE = 1000;
let cacheSize = 0;
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
    // Evict half the cache if full
    if (cacheSize >= MAX_CACHE_SIZE) {
        const keys = Object.keys(selectorCache);
        // Remove the oldest half (simple deterministic policy)
        const removeCount = Math.floor(keys.length / 2);
        for (let i = 0; i < removeCount; i++) {
            delete selectorCache[keys[i]];
        }
        cacheSize -= removeCount;
    }
    selectorCache[selector] = result;
    cacheSize++;
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
/**
 * Hyperscript function for building VNodes.
 *
 * Syntax:
 *  - m("div", "text")
 *  - m("div#id.class1.class2", {...attrs}, children...)
 *  - m("svg", {...attrs}, [...children])
 *
 * Selector grammar:
 *  - tag (div)
 *  - #id (#main)
 *  - .class (.container)
 *  - combined (div#header.title.highlight)
 *
 * Keys:
 *  - pass { key: string } inside attrs to enable keyed diffing
 *
 * @returns VNode
 */
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
        createNode(parent, v, nextSibling, ns);
    }
}
function createNode(parent, vnode, nextSibling, ns) {
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
    // Fast path: nothing to do
    if (old === vnodes)
        return;
    const oldLen = old.length;
    const newLen = vnodes.length;
    // Old empty → create all new
    if (oldLen === 0) {
        if (newLen > 0) {
            createNodes(parent, vnodes, 0, newLen, nextSibling, ns);
        }
        return;
    }
    // New empty → remove all old
    if (newLen === 0) {
        removeNodes(parent, old, 0, oldLen);
        return;
    }
    const oldKeyed = old[0] != null && old[0].key != null;
    const newKeyed = vnodes[0] != null && vnodes[0].key != null;
    // Key mode switched (keyed ↔ unkeyed) → full replace
    if (oldKeyed !== newKeyed) {
        removeNodes(parent, old, 0, oldLen);
        createNodes(parent, vnodes, 0, newLen, nextSibling, ns);
        return;
    }
    // ------------------------------------------------------------
    // UNKEYED LIST (simple index-based diff)
    // ------------------------------------------------------------
    if (!newKeyed) {
        const common = Math.min(oldLen, newLen);
        // Patch common prefix
        for (let i = 0; i < common; i++) {
            const o = old[i];
            const v = vnodes[i];
            if (o === v)
                continue;
            const next = getNextSibling(old, i + 1, nextSibling);
            updateNode(parent, o, v, next, ns);
        }
        // Remove surplus old nodes
        if (oldLen > common) {
            removeNodes(parent, old, common, oldLen);
        }
        // Add surplus new nodes
        if (newLen > common) {
            createNodes(parent, vnodes, common, newLen, nextSibling, ns);
        }
        return;
    }
    // ------------------------------------------------------------
    // KEYED LIST (full reorder support: O(n log n) LIS diff)
    // ------------------------------------------------------------
    // Map: key → oldIndex
    const oldIndexByKey = new Map();
    for (let i = 0; i < oldLen; i++) {
        const o = old[i];
        if (o != null && o.key != null)
            oldIndexByKey.set(o.key, i);
    }
    // newIndexToOldIndex[i] = old index for vnodes[i], else -1
    const newIndexToOldIndex = new Array(newLen);
    for (let i = 0; i < newLen; i++)
        newIndexToOldIndex[i] = -1;
    // 1. Attempt to match + patch existing keyed nodes
    for (let newIndex = 0; newIndex < newLen; newIndex++) {
        const v = vnodes[newIndex];
        const key = v != null ? v.key : null;
        const oldIndex = key != null ? (oldIndexByKey.get(key) ?? -1) : -1;
        newIndexToOldIndex[newIndex] = oldIndex;
        if (oldIndex >= 0) {
            const oldV = old[oldIndex];
            old[oldIndex] = null; // mark as consumed
            if (oldV !== v) {
                const next = null;
                updateNode(parent, oldV, v, next, ns);
            }
        }
    }
    // 2. Remove leftover old nodes (not matched to new list)
    for (let i = 0; i < oldLen; i++) {
        const o = old[i];
        if (o != null)
            removeNode(parent, o);
    }
    // 3. Compute LIS over the positions that mapped to old nodes
    const indices = newIndexToOldIndex;
    const increasing = lis(indices); // returns positions
    const stablePositions = new Set(increasing);
    // 4. Move + insert nodes from right to left
    let nextDom = nextSibling;
    for (let i = newLen - 1; i >= 0; i--) {
        const v = vnodes[i];
        if (!v)
            continue;
        const oldIndex = indices[i];
        let dom = v.dom;
        // Node did not exist previously → create it
        if (oldIndex < 0) {
            createNode(parent, v, nextDom, ns);
            dom = v.dom;
        }
        else {
            // Existing node: reorder if necessary
            if (!stablePositions.has(i) && dom) {
                if (dom.nextSibling !== nextDom) {
                    insertDOM(parent, dom, nextDom);
                }
            }
        }
        nextDom = dom;
    }
}
function updateNode(parent, old, vnode, nextSibling, ns) {
    if (old === vnode)
        return;
    if (old.tag === vnode.tag) {
        const oldNs = ns;
        const nextNs = vnode.tag === "svg" ? "http://www.w3.org/2000/svg" : ns;
        // If namespace meaningfully changed, blow away and recreate subtree
        if (oldNs !== nextNs) {
            createNode(parent, vnode, nextSibling, nextNs);
            removeNode(parent, old);
            return;
        }
        vnode.dom = old.dom;
        if (old.attrs !== vnode.attrs)
            updateAttrs(vnode, old.attrs, vnode.attrs, nextNs);
        updateNodes(vnode.dom, old.children, vnode.children, null, nextNs);
        return;
    }
    else {
        removeNode(parent, old);
        createNode(parent, vnode, nextSibling, ns);
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
/**
 * Patch DOM tree under `root` using mithril-lite's virtual DOM diffing.
 *
 * - Supports keyed diffing (O(n log n)) with LIS algorithm
 * - Supports SVG namespace transitions
 * - Only minimal DOM updates performed
 *
 * @param root Root DOM element
 * @param vnodes VNode or array of VNodes
 */ export function render(dom, vnodes) {
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