import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model } from "./init";
import type { Msg } from "./update";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("section.card", [
    m("h2", "Users (HTTP)"),
    m("div.row", [
      m(
        "button",
        { onclick: () => dispatch({ type: "Fetch" }), disabled: model.loading },
        model.loading ? "Loading..." : "Load users"
      ),
    ]),
    model.error ? m("div.error", model.error) : null,
    model.users.length
      ? m(
          "ul",
          model.users.slice(0, 6).map((u) => m("li", `${u.name} (${u.email})`))
        )
      : m("div.muted", "No users loaded"),
  ]);
