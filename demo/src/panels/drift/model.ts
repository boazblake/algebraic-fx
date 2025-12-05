import { IO } from "algebraic-fx";
import type { Model } from "./types";

export const init = IO(() => {
  const model: Model = {
    report: null,
  };
  return { model, effects: [] as any[] };
});
