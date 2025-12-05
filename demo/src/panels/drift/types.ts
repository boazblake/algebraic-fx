import type { DriftReport } from "../../shared/types";

export type Model = {
  report: DriftReport | null;
};

export type Msg =
  | { type: "SET_REPORT"; report: DriftReport }
  | { type: "CLEAR" };
