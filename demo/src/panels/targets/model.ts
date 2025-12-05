import { IO, Maybe } from "algebraic-fx";
import type { Model } from "./types";
import { loadTarget } from "../../effects/storage";

export const init = IO(() => {
  const maybeTarget = loadTarget().run();

  const defaultTarget = {
    stocks: 60,
    bonds: 30,
    cash: 10,
  };

  const target = Maybe.isJust(maybeTarget) ? maybeTarget.value : defaultTarget;

  const model: Model = {
    target,
    validationErrors: [],
  };

  return { model, effects: [] as any[] };
});
