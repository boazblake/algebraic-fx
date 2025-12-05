import { m } from "../../utils/renderer";
import type { Model, Msg } from "./types";
import type { Dispatch } from "algebraic-fx";
import { formatCurrency, formatPercent } from "../../shared/calculations";

export const view = (model: Model, _dispatch: Dispatch<Msg>) => {
  const plan = model.plan;

  if (!plan) {
    return m(
      "p",
      { style: "color: var(--pico-muted-color);" },
      "No trade plan generated yet."
    );
  }

  return m("div", [
    m(
      "p",
      { style: "font-size: 0.9rem; color: var(--pico-muted-color);" },
      [
        "Final allocation: ",
        `Stocks ${formatPercent(plan.finalAllocation.stocks)}, `,
        `Bonds ${formatPercent(plan.finalAllocation.bonds)}, `,
        `Cash ${formatPercent(plan.finalAllocation.cash)}.`,
        " ",
        plan.cashNeeded > 0
          ? `Add ${formatCurrency(plan.cashNeeded)} of new cash.`
          : plan.cashNeeded < 0
          ? `You will receive ${formatCurrency(Math.abs(plan.cashNeeded))} of cash.`
          : "No net cash movement required.",
      ]
    ),

    plan.trades.length > 0
      ? m("figure", [
          m("table", [
            m("thead", [
              m("tr", [
                m("th", "Action"),
                m("th", "Ticker"),
                m("th", "Shares"),
                m("th", "Price"),
                m("th", "Total"),
              ]),
            ]),
            m(
              "tbody",
              plan.trades.map((t, idx) =>
                m("tr", { key: idx }, [
                  m("td", t.action.toUpperCase()),
                  m("td", t.ticker),
                  m("td", t.shares.toString()),
                  m("td", formatCurrency(t.price)),
                  m("td", formatCurrency(t.total)),
                ])
              )
            ),
          ]),
        ])
      : m(
          "p",
          { style: "color: var(--pico-muted-color);" },
          "No trades required. Allocation is within tolerance."
        ),
  ]);
};
