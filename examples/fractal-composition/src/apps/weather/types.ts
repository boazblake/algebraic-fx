export type Env = { fetch: typeof fetch };
export type Model = { city: string; loading: boolean; data?: any; env: Env };

export type Msg =
  | { type: "SET_CITY"; city: string }
  | { type: "FETCH" }
  | { type: "FETCH_OK"; data: any }
  | { type: "FETCH_ERR"; error: string | { status: number; message: string } };
