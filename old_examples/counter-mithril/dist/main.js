import m from "mithril";
import { renderApp } from "effects-vdom";
import { init } from "./init";
import { update } from "./update";
import { view } from './view';
export const program = {
    init,
    update,
    view,
};
const renderer = (root, vnode) => m.render(root, vnode);
const root = document.getElementById("app");
const app = renderApp(renderer)(root, program);
