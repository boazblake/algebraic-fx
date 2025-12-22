// src/apps/clock/init.ts

import { IO } from "algebraic-fx";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg } from "./types";

export const init = IO.of<{
  model: Model;
  effects: RawEffect<AppEnv, Msg>[];
}>({
  model: {
    running: false,
    nowMs: 0,
  },
  effects: [],
});
