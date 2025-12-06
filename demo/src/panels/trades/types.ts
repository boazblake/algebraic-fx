import type { TargetAllocation } from "@shared/types";

export type TradeAction = "buy" | "sell" | "hold";

export type Trade = {
  ticker: string;
  action: TradeAction;
  shares: number;
  price: number;
  total: number;
};

export type TradePlan = {
  finalAllocation: TargetAllocation;
  cashNeeded: number;
  trades: Trade[];
};

export type Model = {
  plan: TradePlan | null;
};

export type Msg =
  | { type: "SET_PLAN"; plan: TradePlan | null }
  | { type: "CLEAR" };
