import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model } from "./init";
import type { Msg } from "./update";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("section.card", [
    m("h2", "Clock"),
    m("div.row", [
      m(
        "button",
        { onclick: () => dispatch({ type: "clock.start" }) },
        "Start"
      ),
      m(
        "button",
        {
          onclick: () => dispatch({ type: "clock.stop" }),
        },
        "Stop"
      ),
      m("div.muted", new Date(model.nowMs).toLocaleTimeString()),
    ]),
  ]);
