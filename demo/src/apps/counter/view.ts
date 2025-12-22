import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model, Msg } from "./types";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("section.card", [
    m("h2", "Counter"),
    m("div", String(model.count)),
    m("div.row", [
      m(
        "button",
        { onclick: () => dispatch({ type: "counter.decrement" }) },
        "-"
      ),
      m(
        "button",
        { onclick: () => dispatch({ type: "counter.increment" }) },
        "+"
      ),
    ]),
  ]);
