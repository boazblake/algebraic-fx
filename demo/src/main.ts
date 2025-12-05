import { IO, renderApp, browserEnv } from "algebraic-fx";
import { render } from "./utils/renderer";
import { program } from "./main/index";

const root = IO(() => {
  const el = document.getElementById("app");
  if (!el) throw new Error("#app not found");
  return el as HTMLElement;
});

renderApp(render, browserEnv())(root, program).run();
