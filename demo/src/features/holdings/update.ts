import type { RawEffect } from "algebraic-fx";
import type { AppEnv } from "../../core/env";
import type { HoldingsModel, HoldingsMsg, Holding } from "./types";

type FX = RawEffect<AppEnv>[];

const fakePriceForSymbol = (symbol: string): number => {
  let hash = 0;
  const upper = symbol.toUpperCase();
  for (let i = 0; i < upper.length; i += 1) {
    hash = (hash * 31 + upper.charCodeAt(i)) | 0;
  }
  const base = 50 + Math.abs(hash % 150);
  return base;
};

const parseShares = (input: string): number | null => {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
};

export const update = (
  msg: HoldingsMsg,
  model: HoldingsModel
): { model: HoldingsModel; effects: FX } => {
  switch (msg.type) {
    case "InputSymbol": {
      return {
        model: { ...model, inputSymbol: msg.value.toUpperCase() },
        effects: [],
      };
    }

    case "InputShares": {
      return {
        model: { ...model, inputShares: msg.value },
        effects: [],
      };
    }

    case "Add": {
      const symbol = model.inputSymbol.trim().toUpperCase();
      const shares = parseShares(model.inputShares);

      if (!symbol || shares == null) {
        // Invalid input: ignore, higher layer can audit this.
        return { model, effects: [] };
      }

      const id = model.nextId;
      const price = fakePriceForSymbol(symbol);
      const holding: Holding = {
        id,
        symbol,
        shares,
        price,
        error: null,
        isLoading: false,
      };

      return {
        model: {
          ...model,
          inputSymbol: "",
          inputShares: "",
          nextId: id + 1,
          items: [...model.items, holding],
        },
        effects: [],
      };
    }

    case "Remove": {
      return {
        model: {
          ...model,
          items: model.items.filter((h) => h.id !== msg.id),
        },
        effects: [],
      };
    }

    case "PriceLoaded": {
      // Kept for future async version; no-op in this sync demo.
      return { model, effects: [] };
    }

    case "PriceFailed": {
      // Kept for future async version; no-op in this sync demo.
      return { model, effects: [] };
    }
  }
};
