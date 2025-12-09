import { IO } from "algebraic-fx";
import { renderApp } from "algebraic-fx";
import { browserEnv } from "@core/env";
import { render } from "@core/renderer";
import { program } from "./main/index";

const env = browserEnv();

const rootIO = IO(() => {
  const el = document.getElementById("app");
  if (!el) {
    throw new Error("Root element #app not found");
  }
  return el;
});

renderApp(render, env)(rootIO, program);
