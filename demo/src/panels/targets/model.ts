import { IO, Maybe } from "algebraic-fx";
import type { Model } from "./types";
import { loadTarget } from "../../effects/storage";

const defaultTarget = {
  stocks: 60,
  bonds: 30,
  cash: 10,
};

export const init = IO(() => {
  const maybeTarget = loadTarget().run(); // Maybe<TargetAllocation>
  const target = Maybe.getOrElse(defaultTarget, maybeTarget);

  const model: Model = {
    target,
    validationErrors: [],
  };

  return {
    model,
    effects: [],
  };
});
