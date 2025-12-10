import { IO, m, type RawEffect, type Dispatch } from "algebraic-fx";
import type { AppEnv } from "../core/env";

import { init as initHoldings } from "../features/holdings/init";
import { update as updateHoldings } from "../features/holdings/update";
import { view as viewHoldings } from "../features/holdings/view";
import type { HoldingsModel, HoldingsMsg } from "../features/holdings/types";

import { init as initTargets } from "../features/targets/init";
import { update as updateTargets } from "../features/targets/update";
import { view as viewTargets } from "../features/targets/view";
import type { TargetsModel, TargetsMsg } from "../features/targets/types";

import { init as initAudit } from "../features/audit/init";
import { update as updateAudit } from "../features/audit/update";
import { view as viewAudit } from "../features/audit/view";
import type {
  AuditModel,
  AuditMsg,
  AuditEntry,
  AuditKind,
} from "../features/audit/types";

import { view as viewSummary } from "../features/summary/view";

type FX = RawEffect<AppEnv>[];

export type Model = {
  holdings: HoldingsModel;
  targets: TargetsModel;
  audit: AuditModel;
};

export type Msg =
  | { type: "Holdings"; msg: HoldingsMsg }
  | { type: "Targets"; msg: TargetsMsg }
  | { type: "Audit"; msg: AuditMsg };

const makeAuditEntry = (
  kind: AuditKind,
  data: Record<string, unknown>,
  nextId: number
): AuditEntry => ({
  id: nextId,
  ts: Date.now(),
  kind,
  data,
});

export const init: IO<{ model: Model; effects: FX }> = IO.of(() => {
  const holdings = initHoldings.run();
  const targets = initTargets.run();
  const audit = initAudit.run();
  const model: Model = { holdings, targets, audit };
  return { model, effects: [] };
}).map((f) => f());

export const update = (
  msg: Msg,
  model: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: FX } => {
  switch (msg.type) {
    case "Holdings": {
      const { msg: inner } = msg;

      if (inner.type === "Add") {
        const { inputSymbol, inputShares } = model.holdings;
        const entry = makeAuditEntry(
          "AddHolding",
          {
            symbol: inputSymbol,
            shares: inputShares,
          },
          model.audit.nextId
        );
        const { model: auditModel } = updateAudit(
          { type: "Append", entry },
          model.audit
        );
        const { model: holdingsModel, effects } = updateHoldings(
          inner,
          model.holdings
        );
        return {
          model: {
            ...model,
            holdings: holdingsModel,
            audit: auditModel,
          },
          effects,
        };
      }

      if (inner.type === "Remove") {
        const entry = makeAuditEntry(
          "RemoveHolding",
          { id: inner.id },
          model.audit.nextId
        );
        const { model: auditModel } = updateAudit(
          { type: "Append", entry },
          model.audit
        );
        const { model: holdingsModel, effects } = updateHoldings(
          inner,
          model.holdings
        );
        return {
          model: {
            ...model,
            holdings: holdingsModel,
            audit: auditModel,
          },
          effects,
        };
      }

      if (inner.type === "InputSymbol" || inner.type === "InputShares") {
        const { model: holdingsModel, effects } = updateHoldings(
          inner,
          model.holdings
        );
        return {
          model: { ...model, holdings: holdingsModel },
          effects,
        };
      }

      const { model: holdingsModel, effects } = updateHoldings(
        inner,
        model.holdings
      );
      return {
        model: { ...model, holdings: holdingsModel },
        effects,
      };
    }

    case "Targets": {
      const { msg: inner } = msg;

      if (inner.type === "Add") {
        const { inputSymbol, inputPercent } = model.targets;
        const entry = makeAuditEntry(
          "AddTarget",
          {
            symbol: inputSymbol,
            targetPercent: inputPercent,
          },
          model.audit.nextId
        );
        const { model: auditModel } = updateAudit(
          { type: "Append", entry },
          model.audit
        );
        const { model: targetsModel, effects } = updateTargets(
          inner,
          model.targets
        );
        return {
          model: {
            ...model,
            targets: targetsModel,
            audit: auditModel,
          },
          effects,
        };
      }

      if (inner.type === "Remove") {
        const entry = makeAuditEntry(
          "RemoveTarget",
          { symbol: inner.symbol },
          model.audit.nextId
        );
        const { model: auditModel } = updateAudit(
          { type: "Append", entry },
          model.audit
        );
        const { model: targetsModel, effects } = updateTargets(
          inner,
          model.targets
        );
        return {
          model: {
            ...model,
            targets: targetsModel,
            audit: auditModel,
          },
          effects,
        };
      }

      const { model: targetsModel, effects } = updateTargets(
        inner,
        model.targets
      );
      return {
        model: { ...model, targets: targetsModel },
        effects,
      };
    }

    case "Audit": {
      const { model: auditModel, effects } = updateAudit(msg.msg, model.audit);
      return {
        model: { ...model, audit: auditModel },
        effects,
      };
    }
  }
};

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("div", [
    m("h1", "FP Rebalance (algebraic-fx)"),

    m("main", [
      m("div", [
        viewHoldings(model.holdings, (inner: HoldingsMsg) =>
          dispatch({ type: "Holdings", msg: inner })
        ),
        viewTargets(model.targets, (inner: TargetsMsg) =>
          dispatch({ type: "Targets", msg: inner })
        ),
      ]),
      viewSummary(model.holdings.items, model.targets.items),
      viewAudit(model.audit, (inner: AuditMsg) =>
        dispatch({ type: "Audit", msg: inner })
      ),
    ]),
  ]);
