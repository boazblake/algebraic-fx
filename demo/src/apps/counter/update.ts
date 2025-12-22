import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg } from "./types";
import { inc, dec } from "./model";

export const update = (
  msg: Msg,
  model: Model,
  _dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "counter.increment":
      return { model: { count: inc(model.count) }, effects: [] };
    case "counter.decrement":
      return { model: { count: dec(model.count) }, effects: [] };
    default:
      return { model, effects: [] };
  }
};
