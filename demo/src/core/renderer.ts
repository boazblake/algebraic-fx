import { m, render as mithrilRender } from "algebraic-fx"; // adjust path if needed

/**
 * Renderer compatible with algebraic-fx's renderApp.
 */
const render = (root: Element, vnode: any): void => {
  mithrilRender(root as HTMLElement, vnode);
};

export { m, render };
