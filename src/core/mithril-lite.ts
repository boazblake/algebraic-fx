// Minimal Mithril-style vdom + renderer, SVG support, no lifecycle, no fragments.

// -----------------------------------------------------------------------------
// VNODE
// -----------------------------------------------------------------------------

export type VnodeAttrs = Record<string, any> | null;
export type VnodeChild = Vnode<any> | null;
export type VnodeChildren = VnodeChild[] | null;

export type Vnode<T = any> = {
  tag: string;
  key: any;
  attrs: VnodeAttrs;
  children: VnodeChildren;
  text: string | null;
  dom: T | null;
};

export function Vnode(
  tag: string,
  key: any,
  attrs: VnodeAttrs,
  children: VnodeChildren,
  text: string | null,
  dom: any | null
): Vnode {
  return { tag, key, attrs, children, text, dom };
}

// Normalize a single node into a vnode or null
Vnode.normalize = function (node: any): VnodeChild {
  if (Array.isArray(node)) {
    const normalized = Vnode.normalizeChildren(node);
    // Return first element or null for arrays
    return normalized.length > 0 ? normalized[0] : null;
  }
  if (node == null || typeof node === "boolean") return null;
  if (typeof node === "object") return node as Vnode;
  return Vnode("#", null, null, null, String(node), null);
};

// Normalize children: returns a dense array, no nulls
Vnode.normalizeChildren = function (input: any[]): Vnode[] {
  const out: Vnode[] = [];
  let keyed = 0;
  let elems = 0;

  for (let i = 0; i < input.length; i++) {
    const child = Vnode.normalize(input[i]);
    if (child == null) continue;
    out.push(child);
    if (child.tag !== "#") {
      elems++;
      if (child.key != null) keyed++;
    }
  }

  if (elems > 0 && keyed !== 0 && keyed !== elems) {
    throw new TypeError(
      "All element children must either all have keys or none."
    );
  }

  return out;
};

// -----------------------------------------------------------------------------
// HYPERSCRIPT
// -----------------------------------------------------------------------------

const hasOwn = {}.hasOwnProperty;
const emptyAttrs: Record<string, any> = {};
const selectorParser = /(^|#|\.)([^#\.]+)/g;
const selectorCache: Record<string, { tag: string; attrs: any }> =
  Object.create(null);

const isEmpty = (o: Record<string, any>): boolean => {
  for (const k in o) if (hasOwn.call(o, k)) return false;
  return true;
};

function compileSelector(selector: string) {
  let match: RegExpExecArray | null;
  let tag = "div";
  const classes: string[] = [];
  let attrs: any = {};

  while ((match = selectorParser.exec(selector))) {
    const type = match[1];
    const value = match[2];
    if (type === "" && value !== "") tag = value;
    else if (type === "#") attrs.id = value;
    else if (type === ".") classes.push(value);
  }

  if (classes.length) attrs.class = classes.join(" ");
  if (isEmpty(attrs)) attrs = emptyAttrs;
  const result = { tag, attrs };
  selectorCache[selector] = result;
  return result;
}

function execSelector(state: { tag: string; attrs: any }, vnode: Vnode): Vnode {
  vnode.tag = state.tag;
  let a = vnode.attrs;

  if (a == null) {
    vnode.attrs = state.attrs;
    return vnode;
  }

  if (state.attrs !== emptyAttrs) {
    const merged: any = { ...state.attrs, ...a };
    if (state.attrs.class != null && a.class != null) {
      merged.class = state.attrs.class + " " + a.class;
    }
    vnode.attrs = merged;
  }

  return vnode;
}

// m(selector, attrs?, ...children)
export function m(selector: string, ...rest: any[]): Vnode {
  if (typeof selector !== "string") {
    throw new Error("Selector must be a string");
  }

  let attrs: any = null;
  let i = 0;

  if (
    rest.length &&
    (rest[0] == null ||
      (typeof rest[0] === "object" && !Array.isArray(rest[0])))
  ) {
    attrs = rest[0];
    i = 1;
  }

  const children = Vnode.normalizeChildren(rest.slice(i));
  const vnode = Vnode(
    "",
    attrs && attrs.key,
    attrs || null,
    children,
    null,
    null
  );
  const state = selectorCache[selector] || compileSelector(selector);
  return execSelector(state, vnode);
}

// -----------------------------------------------------------------------------
// DOM RENDERER
// -----------------------------------------------------------------------------

const namespaceMap: Record<string, string> = {
  svg: "http://www.w3.org/2000/svg",
  math: "http://www.w3.org/1998/Math/MathML",
};

function getNameSpace(vnode: Vnode): string | undefined {
  return (vnode.attrs && vnode.attrs.xmlns) || namespaceMap[vnode.tag];
}

function createNodes(
  parent: Node,
  vnodes: Vnode[],
  start: number,
  end: number,
  nextSibling: Node | null,
  ns: string | undefined
) {
  for (let i = start; i < end; i++) {
    const v = vnodes[i];
    createNode(parent, v, ns, nextSibling);
  }
}

function createNode(
  parent: Node,
  vnode: Vnode,
  ns: string | undefined,
  nextSibling: Node | null
) {
  if (vnode.tag === "#") {
    const doc = parent.ownerDocument;
    if (!doc) throw new Error("Parent node has no ownerDocument");
    const t = (vnode.dom = doc.createTextNode(vnode.text || ""));
    insertDOM(parent, t, nextSibling);
  } else {
    createElement(parent, vnode, ns, nextSibling);
  }
}

function createElement(
  parent: Node,
  vnode: Vnode,
  ns: string | undefined,
  nextSibling: Node | null
) {
  const tag = vnode.tag;
  const attrs = vnode.attrs;
  ns = getNameSpace(vnode) || ns;

  const doc = parent.ownerDocument as Document;
  const el =
    ns != null ? doc.createElementNS(ns, tag) : (doc.createElement(tag) as any);
  vnode.dom = el;

  if (attrs != null) setAttrs(vnode, attrs, ns);
  insertDOM(parent, el, nextSibling);

  const kids = vnode.children;
  if (kids != null) createNodes(el, kids as Vnode[], 0, kids.length, null, ns);
}

function updateNodes(
  parent: Node,
  oldRaw: Vnode[] | undefined,
  newRaw: Vnode[] | undefined,
  nextSibling: Node | null,
  ns: string | undefined
) {
  const old = oldRaw || [];
  const vnodes = newRaw || [];

  if (old === vnodes) return;
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
      if (o === v) continue;
      updateNode(parent, o, v, getNextSibling(old, i + 1, nextSibling), ns);
    }
    if (old.length > common) removeNodes(parent, old, common, old.length);
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
    if (o === v) continue;
    updateNode(parent, o, v, getNextSibling(old, i + 1, nextSibling), ns);
  }

  if (mismatch) {
    // Fallback: replace entire keyed segment
    removeNodes(parent, old, 0, old.length);
    createNodes(parent, vnodes, 0, vnodes.length, nextSibling, ns);
    return;
  }

  if (old.length > minLen) removeNodes(parent, old, minLen, old.length);
  if (vnodes.length > minLen)
    createNodes(parent, vnodes, minLen, vnodes.length, nextSibling, ns);
}

function updateNode(
  parent: Node,
  old: Vnode,
  vnode: Vnode,
  nextSibling: Node | null,
  ns: string | undefined
) {
  if (old === vnode) return;

  if (old.tag === vnode.tag) {
    if (vnode.tag === "#") {
      if (old.text !== vnode.text) {
        (old.dom as any).nodeValue = vnode.text;
      }
      vnode.dom = old.dom;
    } else {
      vnode.dom = old.dom;
      if (old.attrs !== vnode.attrs)
        updateAttrs(vnode, old.attrs, vnode.attrs, ns);
      updateNodes(
        vnode.dom as unknown as Node,
        old.children as Vnode[],
        vnode.children as Vnode[],
        null,
        ns
      );
    }
  } else {
    removeNode(parent, old);
    createNode(parent, vnode, ns, nextSibling);
  }
}

function insertDOM(parent: Node, dom: Node, next: Node | null) {
  if (next) parent.insertBefore(dom, next);
  else parent.appendChild(dom);
}

function removeNodes(
  parent: Node,
  vnodes: Vnode[],
  start: number,
  end: number
) {
  for (let i = start; i < end; i++) {
    const v = vnodes[i];
    removeNode(parent, v);
  }
}

function removeNode(parent: Node, vnode: Vnode) {
  const dom = vnode.dom as any;
  if (dom && dom.parentNode === parent) parent.removeChild(dom);
}

function getNextSibling(
  vnodes: Vnode[],
  i: number,
  next: Node | null
): Node | null {
  for (; i < vnodes.length; i++) {
    const v = vnodes[i];
    if (v && v.dom) return v.dom as any;
  }
  return next;
}

// -----------------------------------------------------------------------------
// ATTRIBUTES (strict mithril-lite)
// -----------------------------------------------------------------------------

function setAttrs(vnode: Vnode, attrs: any, ns: string | undefined) {
  for (const k in attrs)
    if (hasOwn.call(attrs, k)) setAttr(vnode, k, null, attrs[k], ns);
}

function setAttr(
  vnode: Vnode,
  key: string,
  old: any,
  value: any,
  ns: string | undefined
) {
  if (key === "key") return;
  const dom = vnode.dom as any;

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

function removeAttr(
  vnode: Vnode,
  key: string,
  old: any,
  ns: string | undefined
) {
  const dom = vnode.dom as any;

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

function updateAttrs(
  vnode: Vnode,
  old: any,
  attrs: any,
  ns: string | undefined
) {
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
      if (nv !== ov) setAttr(vnode, k, ov, nv, ns);
    }
  }
}

function updateStyle(dom: any, old: any, style: any) {
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
      if (k.includes("-")) dom.style.setProperty(k, String(v));
      else dom.style[k] = String(v);
    }
  }
}

// -----------------------------------------------------------------------------
// PUBLIC RENDER
// -----------------------------------------------------------------------------

export function render(dom: HTMLElement, vnodes: any | any[]) {
  if (!dom) throw new TypeError("Root DOM is null");

  const ns = dom.namespaceURI;
  const prev = (dom as any).vnodes as Vnode[] | undefined;

  if (prev == null) dom.textContent = "";

  const list = Vnode.normalizeChildren(
    Array.isArray(vnodes) ? vnodes : [vnodes]
  );

  updateNodes(
    dom,
    prev,
    list,
    null,
    ns === "http://www.w3.org/1999/xhtml" ? undefined : (ns ?? undefined)
  );
  (dom as any).vnodes = list;
}
