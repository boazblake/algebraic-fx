import type { TargetAllocation, ValidationError } from "../../shared/types";

export type Model = {
  target: TargetAllocation;
  validationErrors: ValidationError[];
};

export type Msg =
  | { type: "SET_STOCKS"; value: number }
  | { type: "SET_BONDS"; value: number }
  | { type: "SET_CASH"; value: number }
  | { type: "APPLY_TARGET" }
  | { type: "RESTORE_TARGET"; target: TargetAllocation }
  | { type: "CLEAR_VALIDATION_ERRORS" };
