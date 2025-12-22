import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../env";

import { counterApp } from "../apps/counter";
import { clockApp } from "../apps/clock";
import { usersApp } from "../apps/users";

import type { Model, Msg } from "./types";

export const update = (
  msg: Msg,
  model: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  if (msg.type.startsWith("counter.")) {
    const r = counterApp.update(msg as any, model.counter);
    return { model: { ...model, counter: r.model }, effects: r.effects };
  }

  if (msg.type.startsWith("clock.")) {
    const r = clockApp.update(msg as any, model.clock);
    return { model: { ...model, clock: r.model }, effects: r.effects };
  }

  if (msg.type.startsWith("users.")) {
    const r = usersApp.update(msg as any, model.users);
    return { model: { ...model, users: r.model }, effects: r.effects };
  }

  return { model, effects: [] };
};
