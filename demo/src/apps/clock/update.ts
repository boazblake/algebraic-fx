import type { RawEffect } from "algebraic-fx/core/effects";
import { sub } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";

export type Msg =
  | { type: "clock.start" }
  | { type: "clock.stop" }
  | { type: "clock.tick"; ms: number };

export type Model = {
  running: boolean;
  nowMs: number;
};

const clockSub = (): RawEffect<AppEnv, Msg> =>
  sub("clock", (env, dispatch) => {
    let id = env.window.setInterval(() => {
      dispatch({ type: "clock.", msg: { type: "clock.tick", ms: env.now() } });
    }, 250);
    return (cont = true) => {
      env.window.clearInterval(id);
      if (cont) {
        id = env.window.setInterval(() => {
          dispatch({
            type: "clock.",
            msg: { type: "clock.tick", ms: env.now() },
          });
        }, 250);
      }
    };
  });

export const update = (
  msg: Msg,
  model: Model
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  console.log(msg);
  switch (msg.type) {
    case "clock.start":
      if (model.running) return { model, effects: [] };
      const subFx = clockSub();
      if (model.stop) {
        subFx();
      }
      return {
        model: { ...model, running: true },
        effects: [subFx],
      };

    case "clock.stop":
      return { model: { ...model, running: false, stop: true }, effects: [] };

    case "clock.tick":
      return { model: { ...model, nowMs: msg.ms }, effects: [] };
    default:
      return { model, effects: [] };
  }
};
