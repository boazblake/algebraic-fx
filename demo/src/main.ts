import { IO } from "algebraic-fx";
import { renderApp, browserEnv } from "algebraic-fx";
import { render } from "../utils/renderer";
import { program } from "./main/";

const root = IO(() => document.getElementById("app")!);

const app = renderApp(render, browserEnv())(root, program);

app.run();
