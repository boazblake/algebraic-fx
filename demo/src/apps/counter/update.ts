import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";

export type Msg = { type: "counter.increment" } | { type: "counter.decrement" };

export type Model = {
  count: number;
};

export const update = (
  msg: Msg,
  model: Model
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "counter.increment":
      return { model: { count: model.count + 1 }, effects: [] };

    case "counter.decrement":
      return { model: { count: model.count - 1 }, effects: [] };
    default:
      return { model, effects: [] };
  }
};
