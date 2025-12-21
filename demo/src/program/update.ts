import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../env";

import * as counterApp from "../apps/counter/update";
import * as clockApp from "../apps/clock/update";
import * as usersApp from "../apps/users/update";
import * as quotesApp from "../apps/quotes/update";

export type Model = {
  counter: counterApp.Model;
  clock: clockApp.Model;
  users: usersApp.Model;
  quotes: quotesApp.Model;
};

export type Msg = counterApp.Msg | clockApp.Msg | usersApp.Msg | quotesApp.Msg;

export const update = (
  msg: Msg,
  model: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  if (msg.type.startsWith("counter.")) {
    const r = counterApp.update(msg as counterApp.Msg, model.counter);
    return { model: { ...model, counter: r.model }, effects: r.effects };
  }

  if (msg.type.startsWith("clock.")) {
    const r = clockApp.update(msg as clockApp.Msg, model.clock);
    return { model: { ...model, clock: r.model }, effects: r.effects };
  }

  if (msg.type.startsWith("users.")) {
    const r = usersApp.update(msg as usersApp.Msg, model.users);
    return { model: { ...model, users: r.model }, effects: r.effects };
  }

  if (msg.type.startsWith("quotes.")) {
    const r = quotesApp.update(msg as quotesApp.Msg, model.quotes);
    return { model: { ...model, quotes: r.model }, effects: r.effects };
  }

  return { model, effects: [] };
};
