// src/apps/clock/view.ts

import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model, Msg } from "./types";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("div.card", [
    m("h2", "Clock"),
    m("div", `now: ${model.nowMs}`),
    m("div.row", [
      m(
        "button",
        { onclick: () => dispatch({ type: "clock.start" }) },
        "start"
      ),
      m("button", { onclick: () => dispatch({ type: "clock.stop" }) }, "stop"),
    ]),
  ]);
