// src/program/subs.ts

import type { Subscription } from "algebraic-fx/core/effects";
import type { AppEnv } from "../env";
import type { Model, Msg } from "./types";
import { clockApp } from "../apps/clock";

export const subs = (model: Model): Subscription<AppEnv, Msg>[] => {
  return [...clockApp.subs!(model.clock)];
};
