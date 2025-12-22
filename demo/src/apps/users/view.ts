import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model, Msg } from "./types";
import { takeFirst } from "./model";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("section.card", [
    m("h2", "Users"),
    m("div.row", [
      m(
        "button",
        {
          onclick: () => dispatch({ type: "users.fetch" }),
          disabled: model.loading,
        },
        model.loading ? "Loading..." : "Fetch"
      ),
    ]),
    model.error ? m("div.error", model.error) : null,
    m(
      "ul",
      takeFirst(model.users, 6).map((u) => m("li", `${u.name} (${u.email})`))
    ),
  ]);
