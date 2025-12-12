import { renderApp } from "algebraic-fx";
import { program } from "./app/program";
import { env } from "./env";
import { renderer } from "./renderer";

const root = document.getElementById("app");
if (!root) throw new Error("#app not found");

renderApp(root, program, env, renderer);
