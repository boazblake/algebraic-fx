import { IO, Maybe } from "algebraic-fx";
import type { Model } from "./types";

export const init = IO(() => ({
  model: {
    holdings: [],
    input: {
      ticker: "",
      shares: "",
    },
    editingShares: {},
    validationErrors: [],
    fetchingPrices: new Set<string>(),
    priceErrors: new Map<string, string>(),
  },
  effects: [],
}));
