import type { Dispatch, RawEffect } from "algebraic-fx";
import { mapCmd } from "algebraic-fx";
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
    const r = counterApp.update(msg as any, model.counter, dispatch);
    return {
      model: { ...model, counter: r.model },
      effects: r.effects.map((e) => mapCmd(e, (m): Msg => m)),
    };
  }

  if (msg.type.startsWith("clock.")) {
    const r = clockApp.update(msg as any, model.clock, dispatch);
    return {
      model: { ...model, clock: r.model },
      effects: r.effects.map((e) => mapCmd(e, (m): Msg => m)),
    };
  }

  if (msg.type.startsWith("users.")) {
    const r = usersApp.update(msg as any, model.users, dispatch);
    return {
      model: { ...model, users: r.model },
      effects: r.effects.map((e) => mapCmd(e, (m): Msg => m)),
    };
  }

  return { model, effects: [] };
};
