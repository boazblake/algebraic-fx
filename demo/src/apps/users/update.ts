import { fx } from "algebraic-fx/core/effects";
import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";

export type User = { name: string; email: string };

export type Model = {
  users: User[];
  loading: boolean;
  error: string | null;
};

export type Msg =
  | { type: "users.fetch" }
  | { type: "users.loaded"; users: User[] }
  | { type: "users.failed"; error: string };

const fetchUsersFx = (): RawEffect<AppEnv, Msg> =>
  fx<AppEnv, Msg>((env, dispatch) => {
    env.window
      .fetch(`${env.usersBaseUrl}/users`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText}`);
        return r.json() as Promise<unknown>;
      })
      .then((json) => {
        const users = Array.isArray(json)
          ? (json as any[]).map((u) => ({
              name: String(u?.name ?? ""),
              email: String(u?.email ?? ""),
            }))
          : [];
        dispatch({ type: "users.loaded", users });
      })
      .catch((e) => {
        dispatch({
          type: "users.failed",
          error: e instanceof Error ? e.message : String(e),
        });
      });

    return;
  });

export const update = (
  msg: Msg,
  model: Model
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "users.fetch":
      return {
        model: { ...model, loading: true, error: null },
        effects: [fetchUsersFx()],
      };

    case "users.loaded":
      return {
        model: { ...model, loading: false, users: msg.users, error: null },
        effects: [],
      };

    case "users.failed":
      return {
        model: { ...model, loading: false, error: msg.error },
        effects: [],
      };
  }
};
