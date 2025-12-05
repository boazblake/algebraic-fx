import { m } from "../../utils/renderer";
import type { Model, Msg } from "./types";
import type { Dispatch } from "algebraic-fx";
import { Maybe } from "algebraic-fx";
import { formatCurrency } from "../../shared/calculations";

export const view = (model: Model, dispatch: Dispatch<Msg>) => {
  return m("div", [
    // Input form
    m("form", { onsubmit: (e: Event) => { e.preventDefault(); dispatch({ type: "ADD_HOLDING" }); } }, [
      m("div", { style: "display: grid; grid-template-columns: 1fr 1fr auto; gap: 0.5rem;" }, [
        m("input", {
          type: "text",
          placeholder: "Ticker (e.g., AAPL)",
          value: model.input.ticker,
          oninput: (e: any) =>
            dispatch({ type: "SET_TICKER", value: e.target.value }),
        }),
        m("input", {
          type: "number",
          placeholder: "Shares",
          value: model.input.shares,
          oninput: (e: any) =>
            dispatch({ type: "SET_SHARES", value: e.target.value }),
        }),
        m("button", { type: "submit" }, "Add"),
      ]),
    ]),

    // Validation errors
    model.validationErrors.length > 0 &&
      m(
        "ul",
        { style: "color: var(--pico-del-color); margin-top: 0.5rem;" },
        model.validationErrors.map((err) =>
          m("li", `${err.field}: ${err.message}`)
        )
      ),

    // Holdings table
    model.holdings.length > 0
      ? m("figure", { style: "margin-top: 1rem;" }, [
          m("table", [
            m("thead", [
              m("tr", [
                m("th", "Ticker"),
                m("th", "Shares"),
                m("th", "Price"),
                m("th", "Value"),
                m("th", ""),
              ]),
            ]),
            m(
              "tbody",
              model.holdings.map((h) =>
                m("tr", [
                  m("td", h.ticker),
                  m("td", h.shares.toString()),
                  m("td", [
                    Maybe.isJust(h.currentPrice)
                      ? formatCurrency(h.currentPrice.value)
                      : model.fetchingPrices.has(h.ticker)
                        ? m("small", "Loading...")
                        : m(
                            "button",
                            {
                              onclick: () =>
                                dispatch({ type: "FETCH_PRICE", ticker: h.ticker }),
                              style: "padding: 0.25rem 0.5rem; font-size: 0.8rem;",
                            },
                            "Fetch"
                          ),
                  ]),
                  m("td", formatCurrency(h.value)),
                  m("td", [
                    m(
                      "button",
                      {
                        onclick: () =>
                          dispatch({ type: "REMOVE_HOLDING", ticker: h.ticker }),
                        class: "secondary outline",
                        style: "padding: 0.25rem 0.5rem; font-size: 0.8rem;",
                      },
                      "Remove"
                    ),
                  ]),
                ])
              )
            ),
          ]),
        ])
      : m("p", { style: "color: var(--pico-muted-color);" }, "No holdings yet. Add your first position above."),

    // Refresh button
    model.holdings.length > 0 &&
      m(
        "button",
        {
          onclick: () => dispatch({ type: "REFRESH_ALL_PRICES" }),
          class: "secondary",
          style: "margin-top: 1rem;",
        },
        "Refresh All Prices"
      ),
  ]);
};
