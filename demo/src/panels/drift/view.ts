import type { Dispatch } from "algebraic-fx";
import { m } from "@core/renderer";

import type { Model, Msg } from "./types";
import { toViewModel } from "./model";

export const view = (model: Model, _dispatch: Dispatch<Msg>) => {
  const rows = toViewModel(model.report);

  if (rows.length === 0) {
    return m("p", { style: "color: var(--pico-muted-color);" }, [
      "No drift data available.",
    ]);
  }

  return m("div", [
    m("figure", [
      m("table", [
        m("thead", [
          m("tr", [
            m("th", "Asset"),
            m("th", "Current"),
            m("th", "Target"),
            m("th", "Drift"),
          ]),
        ]),
        m(
          "tbody",
          rows.map((r) =>
            m("tr", [
              m("td", r.asset),
              m("td", r.current),
              m("td", r.target),
              m("td", { class: r.driftClass }, r.drift),
            ])
          )
        ),
      ]),
    ]),
  ]);
};
