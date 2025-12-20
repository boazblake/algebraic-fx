import { renderApp, render } from "algebraic-fx";
import type { AppEnv } from "./env";
import { program } from "./program";

const root = document.getElementById("app");
if (!root) throw new Error("#app not found");

const env: AppEnv = {
  document,
  window,
  apiBaseUrl: "https://jsonplaceholder.typicode.com",
  now: () => Date.now(),
  log: (...args) => console.log(...args),
};

const renderer = (el: Element, vnode: unknown): void => {
  render(el as HTMLElement, vnode as any);
};

renderApp(root, program, env, renderer);
