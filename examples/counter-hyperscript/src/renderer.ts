import nanomorph from "nanomorph";
import hh from "hyperscript-helpers";
import h from "hyperscript";

let current: Element | null = null;

export const renderer = (root: Element, vnode: Element) => {
  if (!current) {
    root.appendChild(vnode);
    current = vnode;
  } else {
    current = nanomorph(current, vnode);
  }
};

// hyperscript helpers for clean syntax
export const { div, h1, button, p } = hh(h);
