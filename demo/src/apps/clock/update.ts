import { fx } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model } from "./init";

export type Msg =
  | { type: "Start" }
  | { type: "Stop" }
  | { type: "Tick"; ms: number };

const tickEffect = (): RawEffect<AppEnv, Msg> =>
  fx<AppEnv, Msg>((env, dispatch) => {
    const id = env.window.setInterval(
      () => dispatch({ type: "Tick", ms: env.now() }),
      250
    );
    return () => env.window.clearInterval(id);
  });

export const update = (
  msg: Msg,
  model: Model,
  _dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  console.log("wtf", msg);
  switch (msg.type) {
    case "Start":
      return { model, effects: [tickEffect()] };
    case "Stop":
      return { model, effects: [] };
    case "Tick":
      return { model: { nowMs: msg.ms }, effects: [] };
  }
};
