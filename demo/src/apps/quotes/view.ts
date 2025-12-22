import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model, Msg } from "./types";
import { sortedRows } from "./model";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("section.card", [
    m("h2", "Quotes"),

    m("div.row", [
      m(
        "button",
        {
          onclick: () => dispatch({ type: "quotes.fetch" }),
          disabled: model.loading,
        },
        model.loading ? "Loading..." : "Fetch"
      ),
      m(
        "button",
        { onclick: () => dispatch({ type: "quotes.togglePolling" }) },
        model.polling ? "Stop polling" : "Start polling"
      ),
    ]),

    m("div.row", [
      m("input", {
        value: model.filter,
        placeholder: "Filter symbols...",
        oninput: (e: any) =>
          dispatch({
            type: "quotes.setFilter",
            filter: String(e.target.value ?? ""),
          }),
      }),
      m(
        "button",
        { onclick: () => dispatch({ type: "quotes.setSort", key: "usd" }) },
        "Sort USD"
      ),
      m(
        "button",
        { onclick: () => dispatch({ type: "quotes.setSort", key: "symbol" }) },
        "Sort Symbol"
      ),
      m(
        "button",
        { onclick: () => dispatch({ type: "quotes.setSort", key: "ts" }) },
        "Sort Time"
      ),
    ]),

    model.error ? m("div.error", model.error) : null,

    m(
      "ul",
      sortedRows(model).map((q) =>
        m(
          "li",
          `${q.symbol}: $${q.usd.toFixed(2)} (${new Date(q.ts).toLocaleTimeString()})`
        )
      )
    ),
  ]);
