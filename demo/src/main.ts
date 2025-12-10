import { renderApp } from "algebraic-fx";
import { env } from "./core/env";
import { renderer } from "./core/renderer";
import { init, update, view, type Model, type Msg } from "./app/program";

// algebraic-fx expects a Program-like object
export const program = {
  init,
  update,
  view,
};

const root = document.getElementById("app");
if (!root) {
  throw new Error("#app not found");
}

renderApp(root, program, env, renderer);
