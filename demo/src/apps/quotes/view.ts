import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model, Msg, Quote } from "./update";

export const view = (model: Model, dispatch: Dispatch<Msg>) => {
  const rows: Quote[] = model.watchlist
    .map((id) => model.quotes[id])
    .filter((x): x is Quote => !!x);

  return m("section.card", [
    m("h2", "Quotes"),

    m("div.row", [
      m(
        "button",
        {
          onclick: () => dispatch({ type: "quotes.fetch" }),
          disabled: model.loading,
        },
        model.loading ? "Loading…" : "Refresh"
      ),
      m(
        "button",
        { onclick: () => dispatch({ type: "quotes.togglePolling" }) },
        model.polling ? "Polling ON" : "Polling OFF"
      ),
    ]),

    model.error && m("div.error", model.error),

    m("ul", [
      ...rows.map((q) =>
        m("li", [
          `${q.id}: $${q.usd.toLocaleString()}`,
          m(
            "button.small",
            { onclick: () => dispatch({ type: "quotes.remove", id: q.id }) },
            "×"
          ),
        ])
      ),
    ]),

    m("input", {
      placeholder: "add symbol (coingecko id)",
      onkeydown: (e: KeyboardEvent) => {
        if (e.key !== "Enter") return;
        const el = e.target as HTMLInputElement;
        dispatch({ type: "quotes.add", id: el.value });
        el.value = "";
      },
    }),
  ]);
};
