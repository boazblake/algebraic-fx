// src/panels/targets/init.ts
import { IO } from "algebraic-fx";
import type { RawEffect } from "algebraic-fx";
import type { AppEnv } from "@core/env";
import type { Model } from "./types";
import { defaultTarget } from "./domain";

export const init: IO<{ model: Model; effects: RawEffect<AppEnv>[] }> = IO(
  () => {
    return {
      model: {
        target: defaultTarget,
        validationErrors: [],
        isLoaded: false,
      },
      effects: [], // no effects here; parent will trigger load
    };
  }
);
