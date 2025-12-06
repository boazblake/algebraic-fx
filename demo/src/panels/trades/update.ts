import type { Dispatch, RawEffect } from "algebraic-fx";
import type { AppEnv } from "@core/env";

import type { Model, Msg } from "./types";

export const update = (
  msg: Msg,
  m: Model,
  _dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv>[] } => {
  switch (msg.type) {
    case "SET_PLAN":
      return {
        model: { plan: msg.plan },
        effects: [],
      };

    case "CLEAR":
      return {
        model: { plan: null },
        effects: [],
      };

    default:
      return { model: m, effects: [] };
  }
};
