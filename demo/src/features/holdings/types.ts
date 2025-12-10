export type Holding = {
  id: number;
  symbol: string;
  shares: number;
  price: number | null;
  error: string | null;
  isLoading: boolean;
};

export type HoldingsModel = {
  inputSymbol: string;
  inputShares: string;
  nextId: number;
  items: Holding[];
};

export type HoldingsMsg =
  | { type: "InputSymbol"; value: string }
  | { type: "InputShares"; value: string }
  | { type: "Add" }
  | { type: "Remove"; id: number }
  | { type: "PriceLoaded"; id: number; price: number }
  | { type: "PriceFailed"; id: number; error: string };
