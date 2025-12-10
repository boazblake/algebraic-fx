import type { RawEffect } from "algebraic-fx";
import type { AppEnv } from "../../core/env";
import type { TargetsModel, TargetsMsg, Target } from "./types";

type FX = RawEffect<AppEnv>[];

const parsePercent = (input: string): number | null => {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0 || n > 100) return null;
  return n;
};

export const update = (
  msg: TargetsMsg,
  model: TargetsModel
): { model: TargetsModel; effects: FX } => {
  switch (msg.type) {
    case "InputSymbol": {
      return {
        model: { ...model, inputSymbol: msg.value.toUpperCase() },
        effects: [],
      };
    }

    case "InputPercent": {
      return {
        model: { ...model, inputPercent: msg.value },
        effects: [],
      };
    }

    case "Add": {
      const symbol = model.inputSymbol.trim().toUpperCase();
      const percent = parsePercent(model.inputPercent);

      if (!symbol || percent == null) {
        return { model, effects: [] };
      }

      const exists = model.items.some((t: Target) => t.symbol === symbol);
      if (exists) {
        return { model, effects: [] };
      }

      const target: Target = {
        symbol,
        targetPercent: percent,
      };

      return {
        model: {
          ...model,
          inputSymbol: "",
          inputPercent: "",
          items: [...model.items, target],
        },
        effects: [],
      };
    }

    case "Remove": {
      return {
        model: {
          ...model,
          items: model.items.filter((t) => t.symbol !== msg.symbol),
        },
        effects: [],
      };
    }
  }
};
