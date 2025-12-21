import { renderApp, render } from "algebraic-fx";
import { program } from "./program/index";
import { makeEnv } from "./env";
const root = document.getElementById("app");
if (!root) throw new Error("#app not found");

const env = makeEnv();

const renderer = (el: Element, vnode: unknown): void => {
  render(el as HTMLElement, vnode as any);
};

renderApp(root, program, env, renderer);
