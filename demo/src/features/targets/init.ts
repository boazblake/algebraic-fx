import { IO } from "algebraic-fx";
import type { TargetsModel } from "./types";

export const init: IO<TargetsModel> = IO.of({
  items: [],
  inputSymbol: "",
  inputPercent: "",
});
