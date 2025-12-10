import { m, type Dispatch } from "algebraic-fx";
import type { HoldingsModel, HoldingsMsg, Holding } from "./types";

const viewRow = (h: Holding, dispatch: Dispatch<HoldingsMsg>) =>
  m("tr", [
    m("td", h.symbol),
    m("td.text-right", h.shares.toString()),
    m("td.text-right", h.price == null ? "-" : `$${h.price.toFixed(2)}`),
    m(
      "td.text-right",
      h.price == null ? "-" : `$${(h.price * h.shares).toFixed(2)}`
    ),
    m(
      "td.text-right",
      h.error
        ? m("span.text-sm.text-red-500", h.error)
        : h.isLoading
          ? m("span.text-sm.text-amber-500", "Loading…")
          : ""
    ),
    m(
      "td.text-right",
      m(
        "button",
        {
          type: "button",
          onclick: () =>
            dispatch({
              type: "Remove",
              id: h.id,
            }),
        },
        "Remove"
      )
    ),
  ]);

export const view = (model: HoldingsModel, dispatch: Dispatch<HoldingsMsg>) => {
  const onSymbolInput = (e: Event): void => {
    const value = (e.target as HTMLInputElement).value;
    dispatch({ type: "InputSymbol", value });
  };

  const onSharesInput = (e: Event): void => {
    const value = (e.target as HTMLInputElement).value;
    dispatch({ type: "InputShares", value });
  };

  const total = model.items.reduce((acc, h) => {
    if (h.price == null) return acc;
    return acc + h.price * h.shares;
  }, 0);

  return m("section", [
    m("h2", "Holdings"),
    m("form", { onsubmit: (e: Event) => e.preventDefault() }, [
      m("label", [
        "Symbol",
        m("input", {
          value: model.inputSymbol,
          oninput: onSymbolInput,
        }),
      ]),
      m("label", [
        "Shares",
        m("input", {
          value: model.inputShares,
          oninput: onSharesInput,
        }),
      ]),
      m(
        "button",
        {
          type: "button",
          onclick: () => dispatch({ type: "Add" }),
        },
        "Add"
      ),
    ]),
    m("table", [
      m("thead", [
        m("tr", [
          m("th", "Symbol"),
          m("th.text-right", "Shares"),
          m("th.text-right", "Price"),
          m("th.text-right", "Value"),
          m("th.text-right", "Status"),
          m("th"),
        ]),
      ]),
      m(
        "tbody",
        model.items.length === 0
          ? m("tr", [
              m(
                "td",
                { colspan: 6 },
                "No holdings yet. Add a position to get started."
              ),
            ])
          : model.items.map((h) => viewRow(h, dispatch))
      ),
    ]),
    m("p", `Total value: $${total.toFixed(2)}`),
  ]);
};
