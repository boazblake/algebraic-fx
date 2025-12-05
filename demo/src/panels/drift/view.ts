import { m } from "../../utils/renderer";
import type { Model, Msg } from "./types";
import type { Dispatch } from "algebraic-fx";
import { formatPercent, formatCurrency } from "../../shared/calculations";

const driftClass = (d: number): string => {
  const abs = Math.abs(d);
  if (abs < 1) return "drift-green";
  if (abs <= 5) return "drift-yellow";
  return "drift-red";
};

export const view = (model: Model, _dispatch: Dispatch<Msg>) => {
  const report = model.report;
console.log('drift',model)
  if (!report) {
    return m(
      "p",
      { style: "color: var(--pico-muted-color);" },
      "No drift data yet. Add holdings and save a target allocation."
    );
  }

  const rows = [
    ["Stocks", report.current.stocks, report.target.stocks, report.drift.stocks],
    ["Bonds", report.current.bonds, report.target.bonds, report.drift.bonds],
    ["Cash", report.current.cash, report.target.cash, report.drift.cash],
  ];

  return m("div", [
    m(
      "p",
      { style: "font-size: 0.9rem; color: var(--pico-muted-color);" },
      `Total portfolio value ${formatCurrency(report.totalValue)}`
    ),
    m("figure", [
      m("table", [
        m("thead", [
          m("tr", [
            m("th", "Asset class"),
            m("th", "Current"),
            m("th", "Target"),
            m("th", "Drift"),
          ]),
        ]),
        m(
          "tbody",
          rows.map(([label, current, target, drift]) =>
            m("tr", [
              m("td", String(label)),
              m("td", formatPercent(current as number)),
              m("td", formatPercent(target as number)),
              m(
                "td",
                { class: driftClass(drift as number) },
                formatPercent(drift as number)
              ),
            ])
          )
        ),
      ]),
    ]),
  ]);
};
