// src/renderer.ts
import m from "mithril";
export const h = m; // hyperscript factory
export const renderer = (root, vnode) => {
    m.render(root, vnode);
};
