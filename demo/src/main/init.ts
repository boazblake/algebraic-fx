import { IO } from "algebraic-fx";
import type { Model } from "./types";
import { program as HoldingsPanel } from "../panels/holdings";
import { program as TargetsPanel } from "../panels/targets";
import { program as DriftPanel } from "../panels/drift";
import { program as TradesPanel } from "../panels/trades";
import { program as AuditPanel } from "../panels/audit";

export const init = IO(() => {
  const holdingsInit = HoldingsPanel.init.run();
  const targetsInit = TargetsPanel.init.run();
  const driftInit = DriftPanel.init.run();
  const tradesInit = TradesPanel.init.run();
  const auditInit = AuditPanel.init.run();

  const model: Model = {
    holdings: holdingsInit.model,
    targets: targetsInit.model,
    drift: driftInit.model,
    trades: tradesInit.model,
    audit: auditInit.model,
  };

  const effects = [
    ...holdingsInit.effects,
    ...targetsInit.effects,
    ...driftInit.effects,
    ...tradesInit.effects,
    ...auditInit.effects,
  ];

  return { model, effects };
});
