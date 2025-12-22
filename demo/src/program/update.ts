import type { Dispatch, RawEffect } from "algebraic-fx";
import { mapEffect } from "algebraic-fx";
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

export type Msg = usersApp.Msg | counterApp.Msg | quotesApp.Msg | clockApp.Msg;

export const update = (
  msg: Msg,
  model: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  console.log("p", msg);
  if (msg.type.startsWith("counter.")) {
    const r = counterApp.update(msg as counterApp.Msg, model.counter);
    return {
      model: { ...model, counter: r.model },
      effects: r.effects.map((eff) =>
        mapEffect(eff, (m) => ({ type: "counter", msg: m }))
      ),
    };
  }

  if (msg.type.startsWith("clock.")) {
    const r = clockApp.update(msg as clockApp.Msg, model.clock);
    return {
      model: { ...model, clock: r.model },
      effects: r.effects.map((eff) =>
        mapEffect(eff, (m) => ({ type: "clock", msg: m }))
      ),
    };
  }

  if (msg.type.startsWith("users.")) {
    const r = usersApp.update(msg as usersApp.Msg, model.users);
    return {
      model: { ...model, users: r.model },
      effects: r.effects.map((eff) =>
        mapEffect(eff, (m) => ({ type: "users", msg: m }))
      ),
    };
  }

  if (msg.type.startsWith("quotes.")) {
    const r = quotesApp.update(msg as quotesApp.Msg, model.quotes);
    return {
      model: { ...model, quotes: r.model },
      effects: r.effects.map((eff) =>
        mapEffect(eff, (m) => ({ type: "quotes", msg: m }))
      ),
    };
  }

  return { model, effects: [] };
};
