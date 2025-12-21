import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model, Msg } from "./update";

import { view as counterView } from "../apps/counter/view";
import { view as usersView } from "../apps/users/view";
import { view as quotesView } from "../apps/quotes/view";
import { view as clockView } from "../apps/clock/view";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("div.app", [
    m("header", [m("h1", "algebraic-fx finance multi-app demo")]),
    m("div.grid", [
      counterView(model.counter, (msg) => dispatch({ type: "Counter", msg })),
      usersView(model.users, (msg) => dispatch({ type: "Users", msg })),
      quotesView(model.quotes, (msg) => dispatch({ type: "Quotes", msg })),
      clockView(model.clock, (msg) => dispatch({ type: "Clock", msg })),
    ]),
  ]);
