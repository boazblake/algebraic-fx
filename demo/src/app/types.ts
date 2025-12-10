import type { HoldingsModel, HoldingsMsg } from "../features/holdings/types";
import type { TargetsModel, TargetsMsg } from "../features/targets/types";
import type { AuditModel, AuditMsg } from "../features/audit/types";

export type Model = {
  holdings: HoldingsModel;
  targets: TargetsModel;
  audit: AuditModel;
};

export type Msg =
  | { type: "Holdings"; msg: HoldingsMsg }
  | { type: "Targets"; msg: TargetsMsg }
  | { type: "Audit"; msg: AuditMsg };
