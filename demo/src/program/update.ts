// src/program/update.ts

import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../env";
import type { Model, Msg } from "./types";
import { clockApp } from "../apps/clock";

export const update = (
  msg: Msg,
  model: Model
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  console.log("update", msg);
  const r = clockApp.update(msg, model.clock);
  return {
    model: { clock: r.model },
    effects: r.effects,
  };
};
