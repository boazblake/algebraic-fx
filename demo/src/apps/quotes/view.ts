import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Msg } from "./update";
import type { Model } from "./init";
import { selectVisibleRows } from "./selectors";

export const view = (model: Model, dispatch: Dispatch<Msg>) => {
  const rows = selectVisibleRows(model);

  return m("section.card", [
    m("h2", "Quotes"),

    m("div.row", [
      m(
        "button",
        { onclick: () => dispatch({ type: "quotes.fetch" }) },
        model.loading ? "Loading…" : "Refresh"
      ),
      m(
        "button",
        { onclick: () => dispatch({ type: "quotes.togglePolling" }) },
        model.polling ? "Polling ON" : "Polling OFF"
      ),
    ]),

    m("input", {
      value: model.filter,
      placeholder: "filter…",
      oninput: (e: InputEvent) =>
        dispatch({
          type: "quotes.setFilter",
          value: (e.target as HTMLInputElement).value,
        }),
    }),

    m("table", [
      m("thead", [
        m("tr", [
          m("th", "id"),
          m("th", "usd"),
          m("th", "updated"),
          m("th", ""),
        ]),
      ]),
      m(
        "tbody",
        rows.length
          ? rows.map((r) =>
              m("tr", [
                m("td", r.id),
                m("td", `$${r.usd}`),
                m("td", r.updatedLabel),
                m(
                  "td",
                  m(
                    "button",
                    {
                      onclick: () =>
                        dispatch({ type: "quotes.remove", id: r.id }),
                    },
                    "remove"
                  )
                ),
              ])
            )
          : m("tr", [m("td", { colspan: 4 }, "No data")])
      ),
    ]),
  ]);
};
