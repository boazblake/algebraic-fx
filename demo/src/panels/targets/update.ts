import type { Model, Msg } from "./types";
import type { Dispatch, RawEffect } from "algebraic-fx";
import { Validation } from "algebraic-fx";
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

    case "APPLY_TARGET": {
      const v = validateAllocation(
        m.target.stocks,
        m.target.bonds,
        m.target.cash
      );

      if (Validation.isFailure(v)) {
        return {
          model: { ...m, validationErrors: v.errors },
          effects: [],
        };
      }

      const target = v.value;
      const saveEffect = saveTarget(target);

      return {
        model: { ...m, target, validationErrors: [] },
        effects: [saveEffect],
      };
    }

    case "RESTORE_TARGET":
      return {
        model: { ...m, target: msg.target, validationErrors: [] },
        effects: [],
      };

    case "CLEAR_VALIDATION_ERRORS":
      return { model: { ...m, validationErrors: [] }, effects: [] };

    default:
      return { model: m, effects: [] };
  }
};
