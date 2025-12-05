import { m } from "../utils/renderer";
import type { Model, Msg } from "./types";
import type { Dispatch } from "algebraic-fx";
import { program as HoldingsPanel } from "../panels/holdings/program";
import { program as TargetPanel } from "../panels/target/program";
import { program as DriftPanel } from "../panels/drift/program";
import { program as TradesPanel } from "../panels/trades/program";
import { program as AuditPanel } from "../panels/audit/program";
import { calculateTotalValue, formatCurrency } from "../shared/calculations";

export const view = (model: Model, dispatch: Dispatch<Msg>) => {
  const totalValue = calculateTotalValue(model.holdings.holdings);

  return m("main", { class: "container" }, [
    m("header", [
      m("h1", "FPRebalance"),
      m(
        "p",
        [
          "Total portfolio value: ",
          m("strong", formatCurrency(totalValue)),
        ]
      ),
    ]),

    m(
      "section",
      { class: "grid-layout" },
      [
        // Holdings
        m(
          "article",
          { class: "panel panel-span-2" },
          [
            m("h3", "Holdings"),
            HoldingsPanel.view(model.holdings, (msg) =>
              dispatch({ type: "Holdings", msg })
            ),
          ]
        ),

        // Target
        m(
          "article",
          { class: "panel" },
          [
            m("h3", "Target allocation"),
            TargetPanel.view(model.target, (msg) =>
              dispatch({ type: "Target", msg })
            ),
          ]
        ),

        // Drift
        m(
          "article",
          { class: "panel" },
          [
            m("h3", "Drift analysis"),
            DriftPanel.view(model.drift, (msg) =>
              dispatch({ type: "Drift", msg })
            ),
          ]
        ),

        // Trades
        m(
          "article",
          { class: "panel panel-span-2" },
          [
            m("h3", "Recommended trades"),
            TradesPanel.view(model.trades, (msg) =>
              dispatch({ type: "Trades", msg })
            ),
          ]
        ),

        // Audit
        m(
          "article",
          { class: "panel panel-span-2" },
          [
            m("details", { open: false }, [
              m("summary", "Audit trail"),
              AuditPanel.view(model.audit, (msg) =>
                dispatch({ type: "Audit", msg })
              ),
            ]),
          ]
        ),
      ]
    ),
  ]);
};
