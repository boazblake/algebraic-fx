import type { TradePlan } from "../../shared/types";

export type Model = {
  plan: TradePlan | null;
};

export type Msg =
  | { type: "SET_PLAN"; plan: TradePlan }
  | { type: "CLEAR" };
