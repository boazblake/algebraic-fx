import { IO } from "algebraic-fx";
import type { IO as IOType } from "algebraic-fx/adt/io";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";

import type { Model, Msg } from "./update";

export const init: IOType<{ model: Model; effects: RawEffect<AppEnv, Msg>[] }> =
  IO.IO((): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => ({
    model: {
      running: false,
      nowMs: 0,
    },
    effects: [],
  }));
