import { fx } from "algebraic-fx/core/effects";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg } from "./types";

const fetchUsers = (): RawEffect<AppEnv, Msg> =>
  fx(async (env, dispatch) => {
    try {
      const res = await env.fetch(`${env.apiBase}/users`);
      const users = await res.json();
      dispatch({ type: "users.loaded", users });
    } catch (e) {
      dispatch({ type: "users.failed", error: String(e) });
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
  }
};
