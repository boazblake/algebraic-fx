import type { TargetAllocation, ValidationError } from "@shared/types";

export type Model = {
  target: TargetAllocation;
  validationErrors: ValidationError[];
  isLoaded: boolean;
};

export type Msg =
  | { type: "SET_STOCKS"; value: number }
  | { type: "SET_BONDS"; value: number }
  | { type: "SET_CASH"; value: number }
  | { type: "APPLY" }
  | { type: "RESET_DEFAULT" }
  | { type: "LOADED_TARGET"; target: TargetAllocation };
