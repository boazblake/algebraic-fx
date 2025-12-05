import { IO } from "algebraic-fx";
import type { Model } from "./types";
import { program as HoldingsPanel } from "../panels/holdings/program";
import { program as TargetPanel } from "../panels/target/program";
import { program as DriftPanel } from "../panels/drift/program";
import { program as TradesPanel } from "../panels/trades/program";
import { program as AuditPanel } from "../panels/audit/program";

export const init = IO(() => {
  const h = HoldingsPanel.init.run();
  const t = TargetPanel.init.run();
  const d = DriftPanel.init.run();
  const tr = TradesPanel.init.run();
  const a = AuditPanel.init.run();

  const model: Model = {
    holdings: h.model,
    target: t.model,
    drift: d.model,
    trades: tr.model,
    audit: a.model,
  };

  const effects = [
    ...h.effects,
    ...t.effects,
    ...d.effects,
    ...tr.effects,
    ...a.effects,
  ];

  return { model, effects };
});
