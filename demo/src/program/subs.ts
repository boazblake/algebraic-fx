import type { Subscription } from "algebraic-fx/core/effects";
import type { AppEnv } from "../env";

import { subs as counterSubs } from "../apps/counter";
import { subs as usersSubs } from "../apps/users";
import { subs as quotesSubs } from "../apps/quotes";
import { subs as clockSubs } from "../apps/clock";

import type { Model, Msg } from "./update";

export const subs = (model: Model): Subscription<AppEnv, Msg>[] => [
  ...counterSubs(model.counter),
  ...usersSubs(model.users),
  ...quotesSubs(model.quotes),
  ...clockSubs(model.clock),
];
