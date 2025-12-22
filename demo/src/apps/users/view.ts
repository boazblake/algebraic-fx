import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model, Msg } from "./types";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("section.card", [
    m("h2", "Users"),
    m(
      "button",
      { onclick: () => dispatch({ type: "users.fetch" }) },
      "Load users"
    ),
    model.loading && m("div", "Loading…"),
    model.error && m("div.error", model.error),
    m(
      "ul",
      model.users.map((u) => m("li", `${u.name} (${u.email})`))
    ),
  ]);
