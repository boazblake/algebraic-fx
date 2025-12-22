import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model, Msg } from "./update";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("section.card", [
    m("h2", "Users"),
    m(
      "button",
      { onclick: () => dispatch({ type: "users.fetch" }) },
      model.loading ? "Loading..." : "Fetch"
    ),
    model.error ? m("p.error", model.error) : null,
    m(
      "ul",
      model.users.slice(0, 6).map((u) => m("li", `${u.name} (${u.email})`))
    ),
  ]);
