import type { Subscription } from "algebraic-fx/core/effects";
import type { AppEnv } from "../env";
import type { Model, Msg } from "./update";

import { subs as clockSubs } from "../apps/clock/subs";

export const subs = (model: Model): Subscription<AppEnv, Msg>[] => [
  ...clockSubs(model.clock),
];
