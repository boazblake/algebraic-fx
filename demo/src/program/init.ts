import { IO } from "algebraic-fx";
import type { IO as IOType } from "algebraic-fx/adt/io";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../env";

import { usersApp } from "../apps/users";
import { counterApp } from "../apps/counter";
import { quotesApp } from "../apps/quotes";
import { clockApp } from "../apps/clock";

import type { Model, Msg } from "./update";

export const init: IOType<{ model: Model; effects: RawEffect<AppEnv, Msg>[] }> =
  IO.IO(() => {
    const u = usersApp.init.run();
    const c = counterApp.init.run();
    const q = quotesApp.init.run();
    const k = clockApp.init.run();

    return {
      model: {
        users: u.model,
        counter: c.model,
        quotes: q.model,
        clock: k.model,
      },

      effects: [
        ...u.effects.map(
          (eff) =>
            ({
              type: "users.effect",
              eff,
            }) satisfies Msg
        ),

        ...c.effects.map(
          (eff) =>
            ({
              type: "counter.effect",
              eff,
            }) satisfies Msg
        ),

        ...q.effects.map(
          (eff) =>
            ({
              type: "quotes.effect",
              eff,
            }) satisfies Msg
        ),

        ...k.effects.map(
          (eff) =>
            ({
              type: "clock.effect",
              eff,
            }) satisfies Msg
        ),
      ],
    };
  });
