import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg } from "./model";

export const update = (
  msg: Msg,
  model: Model,
  _dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "clock.start":
      if (model.running) return { model, effects: [] };
      return { model: { ...model, running: true }, effects: [] };

    case "clock.stop":
      if (!model.running) return { model, effects: [] };
      return { model: { ...model, running: false }, effects: [] };

    case "clock.tick":
      return { model: { ...model, nowMs: msg.ms }, effects: [] };
  }
};
