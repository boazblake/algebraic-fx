import { Validation } from "algebraic-fx";
import type { Dispatch, RawEffect } from "algebraic-fx";
import type { Model, Msg } from "./types";
import type { ValidationError, TargetAllocation } from "../../shared/types";
import { validateAllocation } from "../../shared/validation";
import { saveTarget } from "../../effects/storage";

export const update = (
  msg: Msg,
  m: Model,
  _dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<any>[] } => {
  switch (msg.type) {
    case "SET_STOCKS":
      return {
        model: {
          ...m,
          target: { ...m.target, stocks: msg.value },
          validationErrors: [],
        },
        effects: [],
      };

    case "SET_BONDS":
      return {
        model: {
          ...m,
          target: { ...m.target, bonds: msg.value },
          validationErrors: [],
        },
        effects: [],
      };

    case "SET_CASH":
      return {
        model: {
          ...m,
          target: { ...m.target, cash: msg.value },
          validationErrors: [],
        },
        effects: [],
      };

    case "APPLY": {
      const v = validateAllocation(
        m.target.stocks,
        m.target.bonds,
        m.target.cash
      );

      if (v._tag === "Failure") {
        const errors: ValidationError[] = v.errors;
        return {
          model: { ...m, validationErrors: errors },
          effects: [],
        };
      }

      const target: TargetAllocation = v.value;
      const saveEffect = saveTarget(target);

      return {
        model: { ...m, target, validationErrors: [] },
        effects: [saveEffect],
      };
    }

    case "RESET_DEFAULT": {
      const target: TargetAllocation = {
        stocks: 60,
        bonds: 30,
        cash: 10,
      };
      const saveEffect = saveTarget(target);

      return {
        model: { ...m, target, validationErrors: [] },
        effects: [saveEffect],
      };
    }

    case "CLEAR_VALIDATION_ERRORS":
      return {
        model: { ...m, validationErrors: [] },
        effects: [],
      };

    default:
      return { model: m, effects: [] };
  }
};
