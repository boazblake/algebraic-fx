import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model } from "./init";

export type Msg = { type: "Inc" } | { type: "Dec" };

export const update = (
  msg: Msg,
  model: Model,
  _dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "Inc":
      return { model: { count: model.count + 1 }, effects: [] };
    case "Dec":
      return { model: { count: model.count - 1 }, effects: [] };
    default:
      return { model, effects: [] };
  }
};
