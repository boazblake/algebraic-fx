// src/panels/targets/domain.ts
import { Validation } from "algebraic-fx";
import type { TargetAllocation, ValidationError } from "@shared/types";

export const defaultTarget: TargetAllocation = {
  stocks: 60,
  bonds: 30,
  cash: 10,
};

export const validateTarget = (
  t: TargetAllocation
):
  | ReturnType<typeof Validation.Success<TargetAllocation>>
  | ReturnType<typeof Validation.Failure<ValidationError>> => {
  const errors: ValidationError[] = [];

  const total = t.stocks + t.bonds + t.cash;
  if (total !== 100) {
    errors.push({
      field: "total",
      message: "Allocation must sum to 100%",
    });
  }

  if (t.stocks < 0 || t.bonds < 0 || t.cash < 0) {
    errors.push({
      field: "allocation",
      message: "Allocations cannot be negative",
    });
  }

  if (errors.length > 0) {
    return Validation.Failure<ValidationError>(errors);
  }

  return Validation.Success<TargetAllocation>(t);
};
