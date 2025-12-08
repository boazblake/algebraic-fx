import { Maybe } from "algebraic-fx";
import type { Model, Msg } from "./types";
import type { Dispatch } from "algebraic-fx";
import { formatCurrency } from "@shared/calculations";

export type HoldingsRowVM = {
  ticker: string;
  shares: string;
  price: string | { kind: "button"; label: string };
  value: string;
  removeAction: () => void;
};

export type HoldingsVM = {
  editingShares: Record<string, string>;
  inputTicker: string;
  inputShares: string;
  errors: string[];
  rows: HoldingsRowVM[];
  hasHoldings: boolean;
  refreshAction: () => void;
};

export const toViewModel = (
  model: Model,
  dispatch: Dispatch<Msg>
): HoldingsVM => {
  const errors = model.validationErrors.map((e) => `${e.field}: ${e.message}`);

  const rows = model.holdings.map((h) => {
    let price: HoldingsRowVM["price"];

    if (Maybe.isJust(h.currentPrice)) {
      price = formatCurrency(Maybe.getOrElse(0, h.currentPrice));
    } else if (model.fetchingPrices.has(h.ticker)) {
      price = "Loading...";
    } else {
      price = {
        kind: "button",
        label: "Fetch",
      };
    }

    return {
      ticker: h.ticker,
      shares: h.shares.toString(),
      price,
      value: formatCurrency(h.value),
      removeAction: () =>
        dispatch({ type: "REMOVE_HOLDING", ticker: h.ticker }),
    };
  });

  return {
    editingShares: {},
    inputTicker: model.input.ticker,
    inputShares: model.input.shares,
    errors,
    rows,
    hasHoldings: rows.length > 0,
    refreshAction: () => dispatch({ type: "REFRESH_ALL_PRICES" }),
  };
};
