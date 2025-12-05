import { m, render as fxRender } from "algebraic-fx";
import type { Renderer } from "algebraic-fx";

export { m };

export const render: Renderer = (root, vnode) => {
  fxRender(root as HTMLElement, vnode);
};
