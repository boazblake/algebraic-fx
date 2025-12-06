// src/panels/targets/model.ts
import type { Dispatch } from "algebraic-fx";
import type { Model, Msg } from "./types";
import { formatPercent } from "@shared/calculations";

export type TargetsViewModel = {
  stocks: number;
  bonds: number;
  cash: number;
  total: number;
  formatted: {
    stocks: string;
    bonds: string;
    cash: string;
  };
  canApply: boolean;
  errors: string[];
  setStocks: (value: number) => void;
  setBonds: (value: number) => void;
  setCash: (value: number) => void;
  apply: () => void;
  reset: () => void;
};

export const toViewModel = (
  model: Model,
  dispatch: Dispatch<Msg>
): TargetsViewModel => {
  const { stocks, bonds, cash } = model.target;
  const total = stocks + bonds + cash;

  const errors = model.validationErrors.map((e) => `${e.field}: ${e.message}`);

  return {
    stocks,
    bonds,
    cash,
    total,
    formatted: {
      stocks: formatPercent(stocks),
      bonds: formatPercent(bonds),
      cash: formatPercent(cash),
    },
    canApply: errors.length === 0,
    errors,
    setStocks: (value: number) => dispatch({ type: "SET_STOCKS", value }),
    setBonds: (value: number) => dispatch({ type: "SET_BONDS", value }),
    setCash: (value: number) => dispatch({ type: "SET_CASH", value }),
    apply: () => dispatch({ type: "APPLY" }),
    reset: () => dispatch({ type: "RESET_DEFAULT" } as any),
  };
};
