import { IO } from "algebraic-fx";
import type { IO as IOType } from "algebraic-fx/adt/io";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg } from "./types";

export const init: IOType<{ model: Model; effects: RawEffect<AppEnv, Msg>[] }> =
  IO.of({
    model: {
      watchlist: ["BTC", "ETH", "SOL"],
      quotes: {},
      loading: false,
      error: null,
      filter: "",
      sortKey: "usd",
      sortDir: "desc",
      polling: false,
      pollEveryMs: 2500,
    },
    effects: [],
  });
