export type Model = {
  count: number;
  theme: string;
  width: number;
  height: number;
};

export type Msg =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "TOGGLE_THEME" }
  | { type: "RESIZE"; width: number; height: number };
