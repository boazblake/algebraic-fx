// Minimal Mithril-style vdom + renderer, SVG support, no lifecycle, no fragments.
// -----------------------------------------------------------------------------
// LIS (keyed diff support)
// -----------------------------------------------------------------------------
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
    return { tag, key, attrs, children: children || [], text, dom };
}
Vnode.normalize = function normalize(node) {
    if (Array.isArray(node)) {
        const normalized = Vnode.normalizeChildren(node);
        return normalized.length > 0 ? normalized[0] : null;
    }
    if (node == null || typeof node === "boolean")
        return null;
    if (typeof node === "object")
        return node;
    return Vnode("#", null, null, [], String(node), null);
};
Vnode.normalizeChildren = function normalizeChildren(input) {
    const len = input.length;
    const out = new Array(len);
    let ptr = 0;
    let keyed = 0;
    let elems = 0;
    for (let i = 0; i < len; i++) {
        const raw = input[i];
        if (Array.isArray(raw)) {
            const nested = Vnode.normalizeChildren(raw);
            const nLen = nested.length;
            for (let j = 0; j < nLen; j++) {
                const child = nested[j];
                out[ptr++] = child;
                if (child.tag !== "#") {
                    elems++;
                    if (child.key != null)
                        keyed++;
                }
            }
            continue;
        }
        const child = Vnode.normalize(raw);
        if (child == null)
            continue;
        out[ptr++] = child;
        if (child.tag !== "#") {
            elems++;
            if (child.key != null)
                keyed++;
        }
    }
    if (elems > 0 && keyed !== 0 && keyed !== elems) {
        throw new TypeError("All element children must either all have keys or none.");
    }
    return ptr === out.length ? out : out.slice(0, ptr);
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
    selectorParser.lastIndex = 0;
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
    const a = vnode.attrs;
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
function isVnode(x) {
    return (x != null &&
        typeof x === "object" &&
        typeof x.tag === "string" &&
        "children" in x &&
        "attrs" in x);
}
export function m(selector, ...rest) {
    if (typeof selector !== "string") {
        throw new Error("Selector must be a string");
    }
    let attrs = null;
    let i = 0;
    if (rest.length) {
        const first = rest[0];
        if (first == null ||
            (typeof first === "object" && !Array.isArray(first) && !isVnode(first))) {
            attrs = first;
            i = 1;
        }
    }
    const children = Vnode.normalizeChildren(rest.slice(i));
    const vnode = Vnode("", attrs && attrs.key, attrs || null, children, null, null);
    const state = selectorCache[selector] || compileSelector(selector);
    return execSelector(state, vnode);
}
// -----------------------------------------------------------------------------
// DOM RENDERER
// -----------------------------------------------------------------------------
const SVG_NS = "http://www.w3.org/2000/svg";
const MATH_NS = "http://www.w3.org/1998/Math/MathML";
function getNsFast(vnode, inherited) {
    const a = vnode.attrs;
    if (a && a.xmlns)
        return a.xmlns;
    const t = vnode.tag;
    if (t === "svg")
        return SVG_NS;
    if (t === "math")
        return MATH_NS;
    return inherited;
}
// Simple pooling for common tags
const pool = {
    div: [],
    span: [],
    li: [],
    ul: [],
    p: [],
};
function getPooledElement(tag, doc) {
    const list = pool[tag];
    if (list && list.length > 0) {
        const el = list.pop();
        el.innerHTML = "";
        return el;
    }
    return doc.createElement(tag);
}
function recycleNode(vnode, parent) {
    const dom = vnode.dom;
    if (!dom)
        return;
    if (dom.parentNode === parent)
        parent.removeChild(dom);
    const tag = vnode.tag;
    const list = pool[tag];
    if (list)
        list.push(dom);
}
// Create a range of nodes
function createNodes(parent, vnodes, start, end, nextSibling, ns, doc) {
    for (let i = start; i < end; i++) {
        const v = vnodes[i];
        createNode(parent, v, nextSibling, ns, doc);
    }
}
function createNode(parent, vnode, nextSibling, ns, doc) {
    if (vnode.tag === "#") {
        const t = (vnode.dom = doc.createTextNode(vnode.text || ""));
        insertDOM(parent, t, nextSibling);
    }
    else {
        createElement(parent, vnode, ns, nextSibling, doc);
    }
}
function createElement(parent, vnode, ns, nextSibling, doc) {
    const tag = vnode.tag;
    const attrs = vnode.attrs;
    const nodeNs = getNsFast(vnode, ns);
    const el = nodeNs
        ? doc.createElementNS(nodeNs, tag)
        : getPooledElement(tag, doc);
    vnode.dom = el;
    if (attrs != null)
        setAttrs(vnode, attrs, nodeNs);
    insertDOM(parent, el, nextSibling);
    const kids = vnode.children;
    if (kids != null && kids.length > 0) {
        createNodes(el, kids, 0, kids.length, null, nodeNs, doc);
    }
}
function updateNodes(parent, oldRaw, newRaw, nextSibling, ns, doc) {
    const old = oldRaw || [];
    const vnodes = newRaw || [];
    if (old === vnodes)
        return;
    const oldLen = old.length;
    const newLen = vnodes.length;
    if (oldLen === 0) {
        if (newLen > 0) {
            createNodes(parent, vnodes, 0, newLen, nextSibling, ns, doc);
        }
        return;
    }
    if (newLen === 0) {
        removeNodes(parent, old, 0, oldLen);
        return;
    }
    const oldKeyed = old[0] != null && old[0].key != null;
    const newKeyed = vnodes[0] != null && vnodes[0].key != null;
    if (oldKeyed !== newKeyed) {
        removeNodes(parent, old, 0, oldLen);
        createNodes(parent, vnodes, 0, newLen, nextSibling, ns, doc);
        return;
    }
    if (!newKeyed) {
        const common = oldLen < newLen ? oldLen : newLen;
        for (let i = 0; i < common; i++) {
            const o = old[i];
            const v = vnodes[i];
            if (o === v)
                continue;
            const next = getNextSibling(old, i + 1, nextSibling);
            updateNode(parent, o, v, next, ns, doc);
        }
        if (oldLen > common) {
            removeNodes(parent, old, common, oldLen);
        }
        if (newLen > common) {
            createNodes(parent, vnodes, common, newLen, nextSibling, ns, doc);
        }
        return;
    }
    const oldIndexByKey = new Map();
    for (let i = 0; i < oldLen; i++) {
        const o = old[i];
        if (o != null && o.key != null)
            oldIndexByKey.set(o.key, i);
    }
    const consumedOldIndices = new Set();
    const newIndexToOldIndex = new Int32Array(newLen);
    newIndexToOldIndex.fill(-1);
    for (let newIndex = 0; newIndex < newLen; newIndex++) {
        const v = vnodes[newIndex];
        const key = v != null ? v.key : null;
        const oldIndex = key != null ? (oldIndexByKey.get(key) ?? -1) : -1;
        newIndexToOldIndex[newIndex] = oldIndex;
        if (oldIndex >= 0) {
            const oldV = old[oldIndex];
            consumedOldIndices.add(oldIndex);
            if (oldV !== v) {
                updateNode(parent, oldV, v, null, ns, doc);
            }
        }
    }
    for (let i = 0; i < oldLen; i++) {
        if (!consumedOldIndices.has(i)) {
            removeNode(parent, old[i]);
        }
    }
    const increasing = lis(Array.from(newIndexToOldIndex));
    const stablePositions = new Set(increasing);
    let nextDom = nextSibling;
    for (let i = newLen - 1; i >= 0; i--) {
        const v = vnodes[i];
        if (!v)
            continue;
        const oldIndex = newIndexToOldIndex[i];
        let dom = v.dom;
        if (oldIndex < 0) {
            createNode(parent, v, nextDom, ns, doc);
            dom = v.dom;
        }
        else {
            if (!stablePositions.has(i) && dom) {
                if (dom.nextSibling !== nextDom) {
                    insertDOM(parent, dom, nextDom);
                }
            }
        }
        nextDom = dom;
    }
}
function updateNode(parent, old, vnode, nextSibling, ns, doc) {
    if (old === vnode)
        return;
    if (old.tag === "#" && vnode.tag === "#") {
        vnode.dom = old.dom;
        const dom = old.dom;
        if (dom && old.text !== vnode.text) {
            dom.nodeValue = vnode.text ?? "";
        }
        return;
    }
    if (old.tag === vnode.tag) {
        const oldDom = old.dom;
        vnode.dom = oldDom;
        const oldChildren = old.children;
        const newChildren = vnode.children;
        if (oldChildren.length === 0 &&
            newChildren.length === 0 &&
            vnode.text != null &&
            old.tag !== "#") {
            const el = oldDom;
            const firstChild = el && el.firstChild;
            const oldText = (firstChild && firstChild.nodeValue) || "";
            if (oldText !== vnode.text) {
                el.textContent = vnode.text;
            }
            return;
        }
        const nextNs = getNsFast(vnode, ns);
        if (old.attrs !== vnode.attrs) {
            updateAttrs(vnode, old.attrs, vnode.attrs, nextNs);
        }
        updateNodes(oldDom, oldChildren, newChildren, null, nextNs, doc);
        return;
    }
    removeNode(parent, old);
    createNode(parent, vnode, nextSibling, ns, doc);
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
    recycleNode(vnode, parent);
}
function getNextSibling(vnodes, i, next) {
    const len = vnodes.length;
    for (; i < len; i++) {
        const v = vnodes[i];
        if (v && v.dom)
            return v.dom;
    }
    return next;
}
// -----------------------------------------------------------------------------
// ATTRIBUTES
// -----------------------------------------------------------------------------
function setAttrs(vnode, attrs, ns) {
    for (const k in attrs) {
        if (hasOwn.call(attrs, k))
            setAttr(vnode, k, null, attrs[k], ns);
    }
}
function setAttr(vnode, key, old, value, ns) {
    if (key === "key")
        return;
    const dom = vnode.dom;
    if (key.slice(0, 2) === "on") {
        dom[key] = typeof value === "function" ? value : null;
        return;
    }
    if (value == null) {
        removeAttr(vnode, key, old, ns);
        return;
    }
    if (key === "value") {
        if (dom.value !== value)
            dom.value = value;
        return;
    }
    if (key === "checked") {
        const b = !!value;
        if (dom.checked !== b)
            dom.checked = b;
        return;
    }
    if (key === "selected") {
        const b = !!value;
        if (dom.selected !== b)
            dom.selected = b;
        return;
    }
    if (key === "style") {
        updateStyle(dom, old, value);
        return;
    }
    if (key === "class") {
        dom.className = value;
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
    if (key.slice(0, 2) === "on") {
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
            if (ov != null && (!attrs || attrs[k] == null)) {
                removeAttr(vnode, k, ov, ns);
            }
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
            if (k.indexOf("-") !== -1)
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
    const doc = dom.ownerDocument;
    updateNodes(dom, prev, list, null, ns === "http://www.w3.org/1999/xhtml" ? undefined : (ns ?? undefined), doc);
    dom.vnodes = list;
}
//# sourceMappingURL=mithril-lite.js.map