import { sub } from "algebraic-fx/core/effects";
import type { Subscription } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg } from "./types";

const poller = (everyMs: number): Subscription<AppEnv, Msg> =>
  sub("quotes.poller", (env, dispatch) => {
    const id = env.window.setInterval(() => {
      dispatch({ type: "quotes.fetch" });
    }, everyMs);

    return () => env.window.clearInterval(id);
  });

export const subs = (model: Model): Subscription<AppEnv, Msg>[] =>
  model.polling ? [poller(model.pollEveryMs)] : [];
