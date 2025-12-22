import type { RawEffect } from "algebraic-fx/core/effects";
import { sub } from "algebraic-fx/core/effects";

import type { AppEnv } from "../../env";

const ticker = (): RawEffect<AppEnv, Msg> =>
  sub<AppEnv, Msg>("clock", (env, dispatch) => {
    const id = env.window.setInterval(() => {
      dispatch({ type: "clock.tick", ms: env.now() });
    }, 250);

    return () => env.window.clearInterval(id);
  });

export type Msg =
  | { type: "clock.start" }
  | { type: "clock.stop" }
  | { type: "clock.tick"; ms: number };

export type Model = {
  running: boolean;
  nowMs: number;
};

export const update = (
  msg: Msg,
  model: Model
): { model: Model; effects: RawEffect<any, Msg>[] } => {
  console.log(msg);
  switch (msg.type) {
    case "clock.start":
      return {
        model: { ...model, running: true },
        effects: [ticker()],
      };

    case "clock.stop":
      return { model: { ...model, running: false }, effects: [] };

    case "clock.tick":
      return {
        model: { ...model, nowMs: msg.ms },
        effects: [ticker()],
      };

    default:
      return { model, effects: [] };
  }
};
