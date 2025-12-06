// src/panels/trades/init.ts
import { IO } from "algebraic-fx";
import type { RawEffect } from "algebraic-fx";
import type { AppEnv } from "@core/env";
import type { Model } from "./types";

export const init: IO<{ model: Model; effects: RawEffect<AppEnv>[] }> = IO(
  () => ({
    model: { plan: null },
    effects: [],
  })
);
