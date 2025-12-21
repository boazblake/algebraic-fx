import { IO } from "algebraic-fx";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg } from "./model";

export const init: IO<{ model: Model; effects: RawEffect<AppEnv, Msg>[] }> =
  IO.of({
    model: { running: false, nowMs: 0 },
    effects: [],
  });
