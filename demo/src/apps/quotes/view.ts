import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model, Quote, SortDir, SortKey } from "./init";
import type { Msg } from "./update";

const sortQuotes = (rows: Quote[], key: SortKey, dir: SortDir): Quote[] => {
  const sign = dir === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    if (key === "usd") return sign * (a.usd - b.usd);
    return sign * a.id.localeCompare(b.id);
  });
};

const filterQuotes = (rows: Quote[], q: string): Quote[] => {
  const s = q.trim().toLowerCase();
  if (!s) return rows;
  return rows.filter((r) => r.id.toLowerCase().includes(s));
};

export const view = (model: Model, dispatch: Dispatch<Msg>) => {
  const quoteRows = model.watchlist
    .map((id) => model.quotes[id])
    .filter((x): x is Quote => !!x);

  const visible = sortQuotes(
    filterQuotes(quoteRows, model.filter),
    model.sortKey,
    model.sortDir
  );

  return m("section.card", [
    m("h2", "Quotes (Coingecko)"),
    m("div.row", [
      m(
        "button",
        {
          onclick: () => dispatch({ type: "qoutes.fetch" }),
          disabled: model.loading,
        },
        model.loading ? "Loading..." : "Refresh"
      ),
      m(
        "button",
        { onclick: () => dispatch({ type: "quotes.togglePolling" }) },
        model.pollOn ? "Polling: ON" : "Polling: OFF"
      ),
    ]),
    model.error ? m("div.error", model.error) : null,

    m("div.row", [
      m("input", {
        value: model.filter,
        placeholder: "filter (e.g. bit)",
        oninput: (e: InputEvent) =>
          dispatch({
            type: "quotes.setFilter",
            value: (e.target as HTMLInputElement).value,
          }),
      }),
      m(
        "button",
        { onclick: () => dispatch({ type: "quotes.setSort", key: "usd" }) },
        `Sort: usd${model.sortKey === "usd" ? "*" : ""}`
      ),
      m(
        "button",
        { onclick: () => dispatch({ type: "quotes.setSort", key: "name" }) },
        `Sort: name${model.sortKey === "name" ? "*" : ""}`
      ),
      m(
        "button",
        { onclick: () => dispatch({ type: "quotes.toggleSortDir" }) },
        `Dir: ${model.sortDir}`
      ),
    ]),

    m("div.row", [
      m("input", {
        placeholder: "add coingecko id (Enter)",
        onkeydown: (e: KeyboardEvent) => {
          if (e.key !== "Enter") return;
          const el = e.target as HTMLInputElement;
          dispatch({ type: "quotes.addSymbol", id: el.value });
          el.value = "";
        },
      }),
    ]),

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
        visible.length
          ? visible.map((q) =>
              m("tr", [
                m("td", q.id),
                m("td", `$${q.usd.toLocaleString()}`),
                m("td", new Date(q.lastUpdatedMs).toLocaleTimeString()),
                m(
                  "td",
                  m(
                    "button.small",
                    {
                      onclick: () =>
                        dispatch({ type: "quotes.removeSymbol", id: q.id }),
                    },
                    "remove"
                  )
                ),
              ])
            )
          : m("tr", [
              m(
                "td",
                { colspan: 4, class: "muted" },
                "No quotes loaded (or filtered out)"
              ),
            ])
      ),
    ]),
  ]);
};
