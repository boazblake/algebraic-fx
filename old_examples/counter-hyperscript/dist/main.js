import { renderApp } from "effects-vdom";
import { renderer } from './renderer';
import { init } from "./init";
import { update } from "./update";
import { view } from './view';
import { registerGlobalIO } from './utils';
export const program = {
    init,
    update,
    view,
};
const root = document.getElementById("app");
const app = renderApp(renderer)(root, program);
registerGlobalIO(app.dispatch).forEach(io => io.run());
