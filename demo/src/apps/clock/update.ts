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
      dispatch({ type: "clock.tick", ms: env.now() });
    }, 250);
    return () => {
      env.window.clearInterval(id);
    };
  });

export const update = (
  msg: Msg,
  model: Model
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "clock.start": {
      if (model.running) return { model, effects: [] };

      const next = { ...model, running: true };
      return {
        model: next,
        effects: [clockSub()],
      };
    }

    case "clock.stop": {
      const next = { ...model, running: false };
      return {
        model: next,
        effects: [],
      };
    }

    case "clock.tick": {
      const next = { ...model, nowMs: msg.ms };

      return {
        model: next,
        effects: model.running ? [clockSub()] : [],
      };
    }
  }
};
