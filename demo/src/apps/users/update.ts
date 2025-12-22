import { fx } from "algebraic-fx/core/effects";
import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg, User } from "./types";

const fetchUsers = (): RawEffect<AppEnv, Msg> =>
  fx((env, dispatch) => {
    env
      .fetch(`${env.usersBaseUrl}/users`)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json() as Promise<User[]>;
      })
      .then((users) => dispatch({ type: "users.loaded", users }))
      .catch((e) => dispatch({ type: "users.failed", error: String(e) }));
  });

export const update = (
  msg: Msg,
  model: Model,
  _dispatch: Dispatch<Msg>
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
