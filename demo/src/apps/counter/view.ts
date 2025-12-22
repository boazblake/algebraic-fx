import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Msg, Model } from "./update";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("section.card", [
    m("h2", "Counter"),
    m("div.row", [
      m(
        "button",
        { onclick: () => dispatch({ type: "counter.decrement" }) },
        "-"
      ),
      m("div.big", String(model.count)),
      m(
        "button",
        { onclick: () => dispatch({ type: "counter.increment" }) },
        "+"
      ),
    ]),
  ]);
