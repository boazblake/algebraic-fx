import { IO } from "algebraic-fx";
import type { Dispatch, RawEffect } from "algebraic-fx";
import type { Model, Msg } from "./types";
import { program as HoldingsPanel } from "../panels/holdings/program";
import { program as TargetPanel } from "../panels/target/program";
import { program as DriftPanel } from "../panels/drift/program";
import { program as TradesPanel } from "../panels/trades/program";
import { program as AuditPanel } from "../panels/audit/program";
import { calculateDrift, generateTrades } from "../shared/calculations";
import type { Holding, TargetAllocation, AuditEntry } from "../shared/types";

type PanelUpdate<M, Msg> = (
  msg: Msg,
  model: M,
  dispatch: Dispatch<Msg>
) => { model: M; effects: RawEffect<any>[] };

const liftUpdate = <SubModel, SubMsg>(
  childUpdate: PanelUpdate<SubModel, SubMsg>,
  key: keyof Model,
  wrap: (sub: SubMsg) => Msg
) =>
(msg: { msg: SubMsg }, m: Model, dispatch: Dispatch<Msg>) => {
  const current = m[key] as SubModel;
  const { model, effects } = childUpdate(
    msg.msg,
    current,
    (sub: SubMsg) => dispatch(wrap(sub))
  );
  return {
    model: { ...m, [key]: model },
    effects,
  };
};

const recalcAllEffects = (m: Model, dispatch: Dispatch<Msg>): RawEffect<any>[] => {
  const holdings: Holding[] = m.holdings.holdings;
  const target: TargetAllocation = m.target.target;

  // Drift using State monad
  const [driftReport] = calculateDrift(target).run(holdings);

  const tradePlan = generateTrades(driftReport, holdings);

  const driftEffect = IO(() =>
    dispatch({
      type: "Drift",
      msg: { type: "SET_REPORT", report: driftReport },
    })
  );

  const tradesEffect = IO(() =>
    dispatch({
      type: "Trades",
      msg: { type: "SET_PLAN", plan: tradePlan },
    })
  );

  const auditEntry: AuditEntry = {
    timestamp: new Date().toISOString(),
    operation: "RECALCULATE_ALL",
    details: {
      holdingsCount: holdings.length,
      target,
      drift: driftReport,
      tradePlan,
    },
    success: true,
  };

  const auditEffect = IO(() =>
    dispatch({
      type: "Audit",
      msg: { type: "ADD_ENTRY", entry: auditEntry },
    })
  );

  return [driftEffect, tradesEffect, auditEffect];
};

export const update = (
  msg: Msg,
  m: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<any>[] } => {
  switch (msg.type) {
    case "Holdings": {
      const lifted = liftUpdate(
        HoldingsPanel.update,
        "holdings",
        (sub) => ({ type: "Holdings", msg: sub })
      );
      const result = lifted(msg, m, dispatch);

      const shouldRecalc =
        msg.msg.type === "ADD_HOLDING" ||
        msg.msg.type === "REMOVE_HOLDING" ||
        msg.msg.type === "PRICE_FETCHED";

      const coordEffects = shouldRecalc
        ? recalcAllEffects(result.model, dispatch)
        : [];

      return {
        model: result.model,
        effects: [...result.effects, ...coordEffects],
      };
    }

    case "Target": {
      const lifted = liftUpdate(
        TargetPanel.update,
        "target",
        (sub) => ({ type: "Target", msg: sub })
      );
      const result = lifted(msg, m, dispatch);

      const shouldRecalc = msg.msg.type === "APPLY_TARGET";

      const coordEffects = shouldRecalc
        ? recalcAllEffects(result.model, dispatch)
        : [];

      return {
        model: result.model,
        effects: [...result.effects, ...coordEffects],
      };
    }

    case "Drift": {
      const lifted = liftUpdate(
        DriftPanel.update,
        "drift",
        (sub) => ({ type: "Drift", msg: sub })
      );
      return lifted(msg, m, dispatch);
    }

    case "Trades": {
      const lifted = liftUpdate(
        TradesPanel.update,
        "trades",
        (sub) => ({ type: "Trades", msg: sub })
      );
      return lifted(msg, m, dispatch);
    }

    case "Audit": {
      const lifted = liftUpdate(
        AuditPanel.update,
        "audit",
        (sub) => ({ type: "Audit", msg: sub })
      );
      return lifted(msg, m, dispatch);
    }

    case "RECALCULATE_ALL":
      return {
        model: m,
        effects: recalcAllEffects(m, dispatch),
      };

    default:
      return { model: m, effects: [] };
  }
};
