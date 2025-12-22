import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model, Msg } from "./types";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("section.card", [
    m("h2", "Clock"),
    m("div", `now(ms): ${model.nowMs}`),
    m("button", { onclick: () => dispatch({ type: "clock.start" }) }, "Start"),
    m("button", { onclick: () => dispatch({ type: "clock.stop" }) }, "Stop"),
  ]);
