// src/apps/clock/subs.ts

import { sub } from "algebraic-fx/core/effects";
import type { Subscription } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg } from "./types";

export const subs = (model: Model): Subscription<AppEnv, Msg>[] => {
  console.log("subs", model);
  if (!model.running) return [];

  return [
    sub("clock", (env, dispatch) => {
      const id = env.window.setInterval(() => {
        dispatch({ type: "clock.tick", ms: env.now() });
      }, 250);

      return () => env.window.clearInterval(id);
    }),
  ];
};
