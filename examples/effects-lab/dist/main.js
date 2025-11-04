import { renderApp, browserEnv, runDomIO } from "effects-vdom";
import { renderer } from "./renderer";
import { program } from "./program";
import { registerGlobalIO } from "./utils/globalIO";
const root = document.getElementById("app");
export const app = renderApp(renderer)(root, program);
const resizeEffect = registerGlobalIO(app.dispatch);
runDomIO(resizeEffect, browserEnv());
