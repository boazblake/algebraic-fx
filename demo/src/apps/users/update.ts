import { fx } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, User } from "./init";

export type Msg =
  | { type: "Fetch" }
  | { type: "Fetched"; users: User[] }
  | { type: "Failed"; error: string };

const fetchUsersEffect = (): RawEffect<AppEnv, Msg> =>
  fx<AppEnv, Msg>((env, dispatch) => {
    void (async () => {
      try {
        const res = await env.window.fetch(`${env.usersBaseUrl}/users`);
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        const users = (await res.json()) as User[];
        dispatch({ type: "Fetched", users });
      } catch (e) {
        dispatch({
          type: "Failed",
          error: e instanceof Error ? e.message : String(e),
        });
      }
    })();
  });

export const update = (
  msg: Msg,
  model: Model,
  _dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "Fetch":
      return {
        model: { ...model, loading: true, error: null },
        effects: [fetchUsersEffect()],
      };

    case "Fetched":
      return {
        model: { users: msg.users, loading: false, error: null },
        effects: [],
      };

    case "Failed":
      return {
        model: { ...model, loading: false, error: msg.error },
        effects: [],
      };
    default:
      return { model, effects: [] };
  }
};
