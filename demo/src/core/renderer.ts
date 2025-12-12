import { render, type Renderer } from "algebraic-fx";

export const renderer: Renderer = (root: Element, vnode: unknown): void => {
  render(root, vnode);
};
