import { sub } from "algebraic-fx/core/effects";
import type { Subscription } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg } from "./update";

export const subs = (model: Model): Subscription<AppEnv, Msg>[] => {
  if (!model.polling) return [];

  return [
    sub("quotes.poll", (env, dispatch) => {
      const id = env.window.setInterval(() => {
        dispatch({ type: "quotes.fetch" });
      }, model.pollEveryMs);

      return () => env.window.clearInterval(id);
    }),
  ];
};
