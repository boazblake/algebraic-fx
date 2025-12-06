// src/panels/targets/update.ts
import type { Dispatch, RawEffect } from "algebraic-fx";
import type { AppEnv } from "@core/env";

import type { Model, Msg } from "./types";
import { validateTarget } from "./domain";
import { loadTargetEffect } from "./effects"; // <-- fix here
import type { ValidationError } from "@shared/types";
import { Validation } from "algebraic-fx";

export const update = (
  msg: Msg,
  m: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv>[] } => {
  switch (msg.type) {
    case "SET_STOCKS":
      return {
        model: {
          ...m,
          target: { ...m.target, stocks: msg.value },
        },
        effects: [],
      };

    case "SET_BONDS":
      return {
        model: {
          ...m,
          target: { ...m.target, bonds: msg.value },
        },
        effects: [],
      };

    case "SET_CASH":
      return {
        model: {
          ...m,
          target: { ...m.target, cash: msg.value },
        },
        effects: [],
      };

    case "APPLY": {
      const v = validateTarget(m.target);

      if (v._tag === "Failure") {
        const errors = (v as any).errors as ValidationError[];
        return {
          model: { ...m, validationErrors: errors },
          effects: [],
        };
      }

      return {
        model: { ...m, validationErrors: [] },
        effects: [],
      };
    }

    case "LOADED_TARGET":
      return {
        model: {
          ...m,
          target: msg.target,
          isLoaded: true,
          validationErrors: [],
        },
        effects: [],
      };

    default:
      return { model: m, effects: [] };
  }
};
