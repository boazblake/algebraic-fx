import { IO } from "algebraic-fx";
import type { IO as IOType } from "algebraic-fx/adt/io";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../env";

import { counterApp } from "../apps/counter";
import { usersApp } from "../apps/users";
import { quotesApp } from "../apps/quotes";
import { clockApp } from "../apps/clock";

import type { Model } from "./update";
import type { Msg } from "./update";
export const init: IOType<{ model: Model; effects: RawEffect<AppEnv, Msg>[] }> =
  IO.IO(() => {
    const c = counterApp.init.run();
    const u = usersApp.init.run();
    const q = quotesApp.init.run();
    const k = clockApp.init.run();

    return {
      model: {
        counter: c.model,
        users: u.model,
        quotes: q.model,
        clock: k.model,
      },
      effects: [
        ...c.effects.map((e) => ({ type: "CounterEffect", eff: e }) as any),
        ...u.effects.map((e) => ({ type: "UsersEffect", eff: e }) as any),
        ...q.effects.map((e) => ({ type: "QuotesEffect", eff: e }) as any),
        ...k.effects.map((e) => ({ type: "ClockEffect", eff: e }) as any),
      ],
    };
  });
