import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../env";

import { counterApp } from "../apps/counter";
import type { Model as CounterModel } from "../apps/counter/init";
import type { Msg as CounterMsg } from "../apps/counter/update";

import { usersApp } from "../apps/users";
import type { Model as UsersModel } from "../apps/users/init";
import type { Msg as UsersMsg } from "../apps/users/update";

import { quotesApp } from "../apps/quotes";
import type { Model as QuotesModel } from "../apps/quotes/init";
import type { Msg as QuotesMsg } from "../apps/quotes/update";

import { clockApp } from "../apps/clock";
import type { Model as ClockModel } from "../apps/clock/init";
import type { Msg as ClockMsg } from "../apps/clock/update";

export type Model = {
  counter: CounterModel;
  users: UsersModel;
  quotes: QuotesModel;
  clock: ClockModel;
};

export type Msg =
  | { type: "Counter"; msg: CounterMsg }
  | { type: "Users"; msg: UsersMsg }
  | { type: "Quotes"; msg: QuotesMsg }
  | { type: "Clock"; msg: ClockMsg }
  | { type: "CounterEffect"; eff: RawEffect<AppEnv, CounterMsg> }
  | { type: "UsersEffect"; eff: RawEffect<AppEnv, UsersMsg> }
  | { type: "QuotesEffect"; eff: RawEffect<AppEnv, QuotesMsg> }
  | { type: "ClockEffect"; eff: RawEffect<AppEnv, ClockMsg> };

export const update = (
  msg: Msg,
  model: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "Counter": {
      const r = counterApp.update(msg.msg, model.counter, (m) =>
        dispatch({ type: "Counter", msg: m })
      );
      return {
        model: { ...model, counter: r.model },
        effects: r.effects.map(
          (eff) => ({ type: "CounterEffect", eff }) as Msg
        ),
      };
    }

    case "Users": {
      const r = usersApp.update(msg.msg, model.users, (m) =>
        dispatch({ type: "Users", msg: m })
      );
      return {
        model: { ...model, users: r.model },
        effects: r.effects.map((eff) => ({ type: "UsersEffect", eff }) as Msg),
      };
    }

    case "Quotes": {
      const r = quotesApp.update(msg.msg, model.quotes, (m) =>
        dispatch({ type: "Quotes", msg: m })
      );
      return {
        model: { ...model, quotes: r.model },
        effects: r.effects.map((eff) => ({ type: "QuotesEffect", eff }) as Msg),
      };
    }

    case "Clock": {
      const r = clockApp.update(msg.msg, model.clock, (m) =>
        dispatch({ type: "Clock", msg: m })
      );
      return {
        model: { ...model, clock: r.model },
        effects: r.effects.map((eff) => ({ type: "ClockEffect", eff }) as Msg),
      };
    }

    case "CounterEffect":
      return { model, effects: [msg.eff as unknown as RawEffect<AppEnv, Msg>] };

    case "UsersEffect":
      return { model, effects: [msg.eff as unknown as RawEffect<AppEnv, Msg>] };

    case "QuotesEffect":
      return { model, effects: [msg.eff as unknown as RawEffect<AppEnv, Msg>] };

    case "ClockEffect":
      return { model, effects: [msg.eff as unknown as RawEffect<AppEnv, Msg>] };
    default:
      console.log("wtf", msg);
      return { model, effects: [] };
  }
};
