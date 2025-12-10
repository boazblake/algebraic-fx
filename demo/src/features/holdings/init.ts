import { IO } from "algebraic-fx";
import type { HoldingsModel } from "./types";

export const init: IO<HoldingsModel> = IO.of({
  inputSymbol: "",
  inputShares: "",
  nextId: 1,
  items: [],
});
