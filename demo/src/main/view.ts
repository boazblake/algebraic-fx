import { m } from "../utils/renderer";
import type { Dispatch } from "algebraic-fx";
import type { Model, Msg } from "./types";

import { program as HoldingsPanel } from "../panels/holdings";
import { program as TargetsPanel } from "../panels/targets";
import { program as DriftPanel } from "../panels/drift";
import { program as TradesPanel } from "../panels/trades";
import { program as AuditPanel } from "../panels/audit";

export const view = (model: Model, dispatch: Dispatch<Msg>) => {
  const holdingsVNode = HoldingsPanel.view(model.holdings, (msg) =>
    dispatch({ type: "Holdings", msg })
  );

  const targetsVNode = TargetsPanel.view(model.targets, (msg) =>
    dispatch({ type: "Targets", msg })
  );

  const driftVNode = DriftPanel.view(model.drift, (msg) =>
    dispatch({ type: "Drift", msg })
  );

  const tradesVNode = TradesPanel.view(model.trades, (msg) =>
    dispatch({ type: "Trades", msg })
  );

  const auditVNode = AuditPanel.view(model.audit, (msg) =>
    dispatch({ type: "Audit", msg })
  );

  return [
    m("header", [
      m("h1", "FPRebalance"),
      m("p", "Mathematically Correct Portfolio Management"),
    ]),

    m("section", holdingsVNode),
    m("section", targetsVNode),
    m("section", driftVNode),
    m("section", tradesVNode),
    m("section", auditVNode),
  ];
};
