import { m } from "@core/renderer";
import type { Dispatch } from "algebraic-fx";
import type { Model, Msg } from "./types";

import { program as HoldingsPanel } from "../panels/holdings";
import { program as TargetsPanel } from "../panels/targets";
import { program as DriftPanel } from "../panels/drift";
import { program as TradesPanel } from "../panels/trades";
import { program as AuditPanel } from "../panels/audit";

export const view = (model: Model, dispatch: Dispatch<Msg>) => {
  const holdings = HoldingsPanel.view(model.holdings, (msg) =>
    dispatch({ type: "Holdings", msg })
  );

  const targets = TargetsPanel.view(model.targets, (msg) =>
    dispatch({ type: "Targets", msg })
  );

  const drift = DriftPanel.view(model.drift, (msg) =>
    dispatch({ type: "Drift", msg })
  );

  const trades = TradesPanel.view(model.trades, (msg) =>
    dispatch({ type: "Trades", msg })
  );

  const audit = AuditPanel.view(model.audit, (msg) =>
    dispatch({ type: "Audit", msg })
  );

  return [
    m("header", [
      m("h1", "FPRebalance"),
      m("p", "Mathematically Correct Portfolio Management"),
    ]),

    m("section", { id: "holdings" }, holdings),
    m("section", { id: "targets" }, targets),
    m("section", { id: "drift" }, drift),
    m("section", { id: "trades" }, trades),
    m("section", { id: "audit" }, audit),
  ];
};
