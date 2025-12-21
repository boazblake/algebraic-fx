import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model, Msg } from "./model";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("section.card", [
    m("h2", "Clock (subscription)"),
    m("div.row", [
      m(
        "button",
        {
          onclick: () => dispatch({ type: "clock.start" }),
          disabled: model.running,
        },
        "Start"
      ),
      m(
        "button",
        {
          onclick: () => dispatch({ type: "clock.stop" }),
          disabled: !model.running,
        },
        "Stop"
      ),
    ]),
    m("div.muted", `running: ${String(model.running)}`),
    m("div", `nowMs: ${model.nowMs}`),
  ]);
