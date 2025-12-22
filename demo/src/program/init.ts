// src/program/init.ts

import { IO } from "algebraic-fx";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../env";

import { clockApp } from "../apps/clock";
import type { Model, Msg } from "./types";

export const init = IO.of<{
  model: Model;
  effects: RawEffect<AppEnv, Msg>[];
}>(
  (() => {
    const c = clockApp.init.run();
    return {
      model: { clock: c.model },
      effects: c.effects,
    };
  })()
);
