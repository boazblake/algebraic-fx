import { fx, sub } from "algebraic-fx/core/effects";
import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Msg } from "./update";
import type { Quote } from "./types";

export const fetchQuotesEffect = (ids: string[]): RawEffect<AppEnv, Msg> =>
  fx<AppEnv, Msg>(async (env, dispatch) => {
    try {
      if (ids.length === 0) {
        dispatch({ type: "quotes.loaded", quotes: {} });
        return;
      }

      const qs = new URLSearchParams({
        ids: ids.join(","),
        vs_currencies: "usd",
      });

      const url = `${env.quotesBaseUrl}/simple/price?${qs}`;
      const res = await env.window.fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = (await res.json()) as Record<string, { usd: number }>;
      const now = env.now();

      const out: Record<string, Quote> = {};
      for (const id of ids) {
        if (json[id]?.usd != null) {
          out[id] = {
            id,
            usd: json[id].usd,
            lastUpdatedMs: now,
          };
        }
      }

      dispatch({ type: "quotes.loaded", quotes: out });
    } catch (e) {
      dispatch({
        type: "quotes.failed",
        error: e instanceof Error ? e.message : String(e),
      });
    }
  });

export const pollingSub = (everyMs: number): RawEffect<AppEnv, Msg> =>
  sub("quotes.poll", (env, dispatch) => {
    const id = env.window.setInterval(
      () => dispatch({ type: "quotes.fetch" }),
      everyMs
    );
    return () => env.window.clearInterval(id);
  });
