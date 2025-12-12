import { IO } from "algebraic-fx";
import type { HoldingsModel } from "./types";
import type { RawEffect } from "algebraic-fx";
import type { AppEnv } from "../../env";

export const init: IO<{
  model: HoldingsModel;
  effects: RawEffect<AppEnv>[];
}> = IO.of({
  model: {
    inputSymbol: "",
    inputShares: "",
    nextId: 1,
    items: [],
  },
  effects: [],
});
