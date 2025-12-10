export type Target = {
  symbol: string;
  targetPercent: number;
};

export type TargetsModel = {
  items: Target[];
  inputSymbol: string;
  inputPercent: string;
};

export type TargetsMsg =
  | { type: "InputSymbol"; value: string }
  | { type: "InputPercent"; value: string }
  | { type: "Add" }
  | { type: "Remove"; symbol: string };
