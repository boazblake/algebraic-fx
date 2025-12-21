import { fx } from "algebraic-fx";
import type { RawEffect } from "algebraic-fx/core/types";
import type { AppEnv } from "../env";
import type { Msg } from "../app/types";

const KEY = "algebraic-fx.demo.watchlist.v1";

export const hydrateWatchlistEffect = (): RawEffect<AppEnv, Msg> =>
  fx((env, dispatch) => {
    try {
      const raw = env.storage.getItem(KEY);
      if (!raw) return;
      const ids = JSON.parse(raw);
      if (Array.isArray(ids)) {
        for (const id of ids) {
          if (typeof id === "string") {
            dispatch({ type: "AddSymbol", id });
          }
        }
      }
    } catch {}
  });

export const persistWatchlistEffect = (
  watchlist: string[]
): RawEffect<AppEnv, Msg> =>
  fx((env) => {
    try {
      env.storage.setItem(KEY, JSON.stringify(watchlist));
    } catch {}
  });
