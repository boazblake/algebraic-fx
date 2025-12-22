import { IO } from "algebraic-fx";
import type { IO as IOType } from "algebraic-fx/adt/io";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg } from "./types";

export const init: IOType<{ model: Model; effects: RawEffect<AppEnv, Msg>[] }> =
  IO.of({
    model: { count: 0 },
    effects: [],
  });
