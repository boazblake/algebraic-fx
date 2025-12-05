import type {
  Model as HoldingsModel,
  Msg as HoldingsMsg,
} from "../panels/holdings/types";
import type {
  Model as TargetModel,
  Msg as TargetMsg,
} from "../panels/targets/types";
import type {
  Model as DriftModel,
  Msg as DriftMsg,
} from "../panels/drift/types";
import type {
  Model as TradesModel,
  Msg as TradesMsg,
} from "../panels/trades/types";
import type {
  Model as AuditModel,
  Msg as AuditMsg,
} from "../panels/audit/types";

export type Model = {
  holdings: HoldingsModel;
  targets: TargetModel;
  drift: DriftModel;
  trades: TradesModel;
  audit: AuditModel;
};

export type Msg =
  | { type: "Holdings"; msg: HoldingsMsg }
  | { type: "Targets"; msg: TargetMsg }
  | { type: "Drift"; msg: DriftMsg }
  | { type: "Trades"; msg: TradesMsg }
  | { type: "Audit"; msg: AuditMsg }
  | { type: "RECALCULATE_ALL" };
