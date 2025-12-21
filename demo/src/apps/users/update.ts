import type { RawEffect } from "algebraic-fx/core/effects";
import { fx } from "algebraic-fx";
import type { AppEnv } from "../../env";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Msg =
  | { type: "users.fetch" }
  | { type: "users.loaded"; users: User[] }
  | { type: "users.failed"; error: string };

export type Model = {
  users: User[];
  loading: boolean;
  error: string | null;
};

const fetchUsers = (): RawEffect<AppEnv, Msg> =>
  fx(async (env, dispatch) => {
    try {
      const res = await env.window.fetch(`${env.usersBaseUrl}/users`);
      if (!res.ok) throw new Error(res.statusText);
      const users = (await res.json()) as User[];
      dispatch({ type: "users.loaded", users });
    } catch (e) {
      dispatch({
        type: "users.",
        msg: {
          type: "users.failed",
          error: e instanceof Error ? e.message : String(e),
        },
      });
    }
  });

export const update = (
  msg: Msg,
  model: Model
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "users.fetch":
      return {
        model: { ...model, loading: true, error: null },
        effects: [fetchUsers()],
      };

    case "users.loaded":
      return {
        model: { users: msg.users, loading: false, error: null },
        effects: [],
      };

    case "users.failed":
      return {
        model: { ...model, loading: false, error: msg.error },
        effects: [],
      };
    default:
      return { model, effects: [] };
  }
};
