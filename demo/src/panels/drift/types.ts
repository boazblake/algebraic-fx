import type {
  Holding,
  TargetAllocation,
  DriftReport,
} from "../../shared/types";

export type Model = {
  report: DriftReport | null;
};

export type Msg =
  | { type: "CALCULATE"; holdings: Holding[]; target: TargetAllocation }
  | { type: "CLEAR" }
  | { type: "SET_REPORT"; report: DriftReport };
