import type { RawEffect, Subscription } from "algebraic-fx/core/effects";
import { sub } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg } from "./types";

const clockSub = (): Subscription<AppEnv, Msg> =>
  sub("clock", (env, dispatch) => {
    const id = env.window.setInterval(() => {
      dispatch({ type: "clock.tick", ms: env.now() });
    }, 250);

    return () => env.window.clearInterval(id);
  });

export const update = (
  msg: Msg,
  model: Model
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "clock.start":
      return {
        model: { ...model, running: true },
        effects: [],
      };

    case "clock.stop":
      return {
        model: { ...model, running: false },
        effects: [],
      };

    case "clock.tick":
      return {
        model: { ...model, nowMs: msg.ms },
        effects: [],
      };
  }
};

export const subs = (model: Model): Subscription<AppEnv, Msg>[] =>
  model.running ? [clockSub()] : [];
