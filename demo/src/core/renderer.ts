import { render, type Renderer } from "algebraic-fx";

export const renderer: Renderer = (root, vnode) => {
  render(root as HTMLElement, vnode);
};
