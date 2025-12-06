import { IO } from "algebraic-fx";
import type { Dispatch, RawEffect } from "algebraic-fx";

import type { Model, Msg } from "./types";
import { program as HoldingsPanel } from "../panels/holdings";
import { program as TargetsPanel } from "../panels/targets";
import { program as DriftPanel } from "../panels/drift";
import { program as TradesPanel } from "../panels/trades";
import { program as AuditPanel } from "../panels/audit";
import { calculateDrift, generateTrades } from "@shared/calculations";
import type { Holding } from "@shared/types";

// ---------------------------------------------------------------------------
// Generic liftUpdate
// ---------------------------------------------------------------------------

const liftUpdate =
  <K extends keyof Model, SubModel, SubMsg>(
    childUpdate: (
      msg: SubMsg,
      model: SubModel,
      dispatch: Dispatch<SubMsg>
    ) => { model: SubModel; effects: RawEffect<any>[] },
    key: K,
    wrap: (sub: SubMsg) => Msg
  ) =>
  (
    msg: { type: string; msg: SubMsg },
    m: Model,
    dispatch: Dispatch<Msg>
  ): { model: Model; effects: RawEffect<any>[] } => {
    const { model: childModel, effects } = childUpdate(
      msg.msg,
      m[key] as unknown as SubModel,
      (sub: SubMsg) => dispatch(wrap(sub))
    );

    const nextModel: Model = {
      ...m,
      [key]: childModel,
    } as Model;

    return { model: nextModel, effects };
  };

// ---------------------------------------------------------------------------
// Root update
// ---------------------------------------------------------------------------

export const update = (
  msg: Msg,
  m: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<any>[] } => {
  switch (msg.type) {
    case "Holdings": {
      const result = liftUpdate(HoldingsPanel.update, "holdings", (sub) => ({
        type: "Holdings",
        msg: sub,
      }))(msg as any, m, dispatch);

      const subMsg = msg.msg;
      const needsRecalc =
        subMsg.type === "PRICE_FETCHED" ||
        subMsg.type === "ADD_HOLDING" ||
        subMsg.type === "REMOVE_HOLDING";

      if (needsRecalc) {
        const coord = IO(() => {
          const holdings: Holding[] = result.model.holdings.holdings;
          const target = result.model.targets.target;
          const [report] = calculateDrift(target).run(holdings);

          dispatch({
            type: "Drift",
            msg: { type: "SET_REPORT", report },
          });
        });

        return {
          model: result.model,
          effects: [...result.effects, coord],
        };
      }

      return result;
    }

    case "Targets": {
      const result = liftUpdate(TargetsPanel.update, "targets", (sub) => ({
        type: "Targets",
        msg: sub,
      }))(msg as any, m, dispatch);

      const subMsg = msg.msg;
      const needsRecalc =
        subMsg.type === "APPLY" || subMsg.type === "RESET_DEFAULT";

      if (needsRecalc) {
        const coord = IO(() => {
          const holdings: Holding[] = result.model.holdings.holdings;
          const target = result.model.targets.target;
          const [report] = calculateDrift(target).run(holdings);

          dispatch({
            type: "Drift",
            msg: { type: "SET_REPORT", report },
          });
        });

        return {
          model: result.model,
          effects: [...result.effects, coord],
        };
      }

      return result;
    }

    case "Drift": {
      const result = liftUpdate(DriftPanel.update, "drift", (sub) => ({
        type: "Drift",
        msg: sub,
      }))(msg, m, dispatch);

      const subMsg = msg.msg;
      if (subMsg.type === "SET_REPORT") {
        const report = subMsg.report;

        const tradesEffect = IO(() => {
          const plan = generateTrades(report, m.holdings.holdings);
          dispatch({
            type: "Trades",
            msg: { type: "SET_PLAN", plan },
          });
        });

        return {
          model: result.model,
          effects: [...result.effects, tradesEffect],
        };
      }

      return result;
    }

    case "Trades":
      return liftUpdate(TradesPanel.update, "trades", (sub) => ({
        type: "Trades",
        msg: sub,
      }))(msg as any, m, dispatch);

    case "Audit":
      return liftUpdate(AuditPanel.update, "audit", (sub) => ({
        type: "Audit",
        msg: sub,
      }))(msg as any, m, dispatch);

    case "RECALCULATE_ALL": {
      const coord = IO(() => {
        const holdings: Holding[] = m.holdings.holdings;
        const target = m.targets.target;
        const [report] = calculateDrift(target).run(holdings);

        dispatch({
          type: "Drift",
          msg: { type: "SET_REPORT", report },
        });
      });

      return { model: m, effects: [coord] };
    }

    default:
      return { model: m, effects: [] };
  }
};
