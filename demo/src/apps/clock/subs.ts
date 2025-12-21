import type { Subscription } from "algebraic-fx/core/effects";
import { sub } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg } from "./model";

export const subs = (model: Model): Subscription<AppEnv, Msg>[] => {
  if (!model.running) return [];

  return [
    sub("clock.tick", (env, dispatch) => {
      const id = env.window.setInterval(() => {
        dispatch({ type: "clock.tick", ms: env.now() });
      }, 250);

      return () => env.window.clearInterval(id);
    }),
  ];
};
