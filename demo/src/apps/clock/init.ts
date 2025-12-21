import { IO } from "algebraic-fx";
import type { IO as IOType } from "algebraic-fx/adt/io";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Msg } from "./update";

export type Model = { nowMs: number };

export const init: IOType<{ model: Model; effects: RawEffect<AppEnv, Msg>[] }> =
  IO.of({
    model: {
      running: false,
      nowMs: new Date(),
    },
    effects: [],
  });
