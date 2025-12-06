import type { Dispatch } from "algebraic-fx";
import { m } from "@core/renderer";

import type { Model, Msg } from "./types";
import { toViewModel } from "./model";

export const view = (model: Model, _dispatch: Dispatch<Msg>) => {
  const vm = toViewModel(model.plan);

  if (!vm.hasPlan) {
    return m(
      "p",
      { style: "color: var(--pico-muted-color);" },
      "No trade plan generated yet."
    );
  }

  const summary = m(
    "p",
    { style: "font-size: 0.9rem; color: var(--pico-muted-color);" },
    vm.summaryText
  );

  if (!vm.hasTrades) {
    return m("div", [
      summary,
      m(
        "p",
        { style: "color: var(--pico-muted-color);" },
        "No trades required. Allocation is within tolerance."
      ),
    ]);
  }

  return m("div", [
    summary,
    m("figure", [
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
          vm.trades.map((t, idx) =>
            m("tr", { key: idx }, [
              m("td", t.action),
              m("td", t.ticker),
              m("td", t.shares),
              m("td", t.price),
              m("td", t.total),
            ])
          )
        ),
      ]),
    ]),
  ]);
};
