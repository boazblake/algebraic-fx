// src/app/types.ts
export type Model = {
  count: number;
  message: string | null;
};

export type Msg =
  | { type: "INC" }
  | { type: "DEC" }
  | { type: "LOAD" }
  | { type: "LOADED"; result: string }
  | { type: "LOAD_ERROR" };
