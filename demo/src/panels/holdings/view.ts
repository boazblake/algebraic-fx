import type { Dispatch } from "algebraic-fx";
import { m } from "@core/renderer";
import type { Model, Msg } from "./types";
import { toViewModel } from "./model";

export const view = (model: Model, dispatch: Dispatch<Msg>) => {
  const vm = toViewModel(model, dispatch);
  console.log(vm, model);

  return m("div", [
    // Form
    m(
      "form",
      {
        onsubmit: (e: Event) => {
          e.preventDefault();
          dispatch({ type: "ADD_HOLDING" });
        },
      },
      [
        m(
          "div",
          {
            style:
              "display:grid;grid-template-columns:1fr 1fr auto;gap:0.5rem;",
          },
          [
            m("input", {
              type: "text",
              placeholder: "Ticker (e.g., AAPL)",
              value: vm.inputTicker,
              oninput: (e: any) =>
                dispatch({
                  type: "SET_TICKER",
                  value: (e.target as HTMLInputElement).value,
                }),
            }),
            m("input", {
              type: "number",
              placeholder: "Shares",
              value: vm.inputShares,
              oninput: (e: any) =>
                dispatch({
                  type: "SET_SHARES",
                  value: (e.target as HTMLInputElement).value,
                }),
            }),
            m("button", { type: "submit" }, "Add"),
          ]
        ),
      ]
    ),

    // Errors
    vm.errors.length > 0
      ? m(
          "ul",
          { style: "color: var(--pico-del-color); margin-top:0.5rem;" },
          vm.errors.map((e) => m("li", e))
        )
      : null,

    // Table
    vm.hasHoldings
      ? m("figure", { style: "margin-top:1rem;" }, [
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
              vm.rows.map((row) =>
                m("tr", [
                  m("td", row.ticker),
                  m("td", row.shares),

                  // price cell: either text or a button
                  m(
                    "td",
                    Array.isArray(row.price)
                      ? row.price
                      : typeof row.price === "string"
                        ? row.price
                        : m(
                            "button",
                            {
                              onclick:
                                row.price.kind === "button"
                                  ? () =>
                                      dispatch({
                                        type: "FETCH_PRICE",
                                        ticker: row.ticker,
                                      })
                                  : undefined,
                              style: "padding:0.25rem 0.5rem;font-size:0.8rem;",
                            },
                            row.price.label
                          )
                  ),

                  m("td", row.value),

                  m("td", [
                    m(
                      "button",
                      {
                        onclick: row.removeAction,
                        class: "secondary outline",
                        style: "padding:0.25rem 0.5rem;font-size:0.8rem;",
                      },
                      "Remove"
                    ),
                    // inside holdings view row
                    m("input", {
                      value: vm.editingShares[row.ticker] ?? String(row.shares),
                      oninput: (e: any) =>
                        dispatch({
                          type: "SET_EDITING_SHARES",
                          ticker: row.ticker,
                          value: e.target.value,
                        }),
                    }),
                    m(
                      "button",
                      {
                        onclick: () =>
                          dispatch({
                            type: "APPLY_EDITING_SHARES",
                            ticker: row.ticker,
                          }),
                      },
                      "Update shares"
                    ),
                  ]),
                ])
              )
            ),
          ]),
        ])
      : m(
          "p",
          { style: "color: var(--pico-muted-color);" },
          "No holdings yet. Add your first position above."
        ),

    // Refresh
    vm.hasHoldings
      ? m(
          "button",
          {
            onclick: vm.refreshAction,
            class: "secondary",
            style: "margin-top:1rem;",
          },
          "Refresh All Prices"
        )
      : null,
  ]);
};
