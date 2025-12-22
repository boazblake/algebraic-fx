import { IO } from "algebraic-fx";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../env";

import { counterApp } from "../apps/counter";
import { clockApp } from "../apps/clock";
import { usersApp } from "../apps/users";
import type { Model, Msg } from "./types";

export const init = IO.IO(() => {
  const c = counterApp.init.run();
  const k = clockApp.init.run();
  const u = usersApp.init.run();

  return {
    model: {
      counter: c.model,
      clock: k.model,
      users: u.model,
    },
    effects: [...c.effects, ...k.effects, ...u.effects] as RawEffect<
      AppEnv,
      Msg
    >[],
  };
});
