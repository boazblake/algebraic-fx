import { IO, fx, m, render, renderApp } from "algebraic-fx";
import { httpTask } from "algebraic-fx/helpers/http-task";
import type { RawEffect, Dispatch } from "algebraic-fx/core/types";
import type { DomEnv } from "algebraic-fx/env/dom-env";

/* ================================
   Types
================================ */

type User = {
  id: number;
  name: string;
  email: string;
};

type Model = {
  count: number;
  users: User[];
  loading: boolean;
  error: string | null;
};

type Msg =
  | { type: "Inc" }
  | { type: "Dec" }
  | { type: "FetchUsers" }
  | { type: "UsersFetched"; users: User[] }
  | { type: "UsersFailed"; error: string };

/* ================================
   Init
================================ */

const init: IO<{ model: Model; effects: RawEffect<DomEnv, Msg>[] }> = IO.of({
  model: {
    count: 0,
    users: [],
    loading: false,
    error: null,
  },
  effects: [],
});

/* ================================
   Effects
================================ */

const fetchUsers = (): RawEffect<DomEnv, Msg> =>
  httpTask<unknown, User[], Msg>(
    "/users",
    undefined,
    (err) => ({ type: "UsersFailed", error: String(err) }),
    (users) => ({ type: "UsersFetched", users })
  );

/* ================================
   Update
================================ */

const update = (
  msg: Msg,
  model: Model,
  _dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<DomEnv, Msg>[] } => {
  switch (msg.type) {
    case "Inc":
      return { model: { ...model, count: model.count + 1 }, effects: [] };

    case "Dec":
      return { model: { ...model, count: model.count - 1 }, effects: [] };

    case "FetchUsers":
      return {
        model: { ...model, loading: true, error: null },
        effects: [fetchUsers()],
      };

    case "UsersFetched":
      return {
        model: { ...model, users: msg.users, loading: false },
        effects: [],
      };

    case "UsersFailed":
      return {
        model: { ...model, loading: false, error: msg.error },
        effects: [],
      };
    default:
      console.warn("Unhandled Msg", msg);
      return { model, effects: [] };
  }
};

/* ================================
   View
================================ */

const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("div", [
    m("h1", "algebraic-fx demo"),

    m("div", [
      m("button", { onclick: () => dispatch({ type: "Dec" }) }, "-"),
      m("span", String(model.count)),
      m("button", { onclick: () => dispatch({ type: "Inc" }) }, "+"),
    ]),

    m(
      "button",
      { onclick: () => dispatch({ type: "FetchUsers" }) },
      model.loading ? "Loading…" : "Load users"
    ),

    model.error && m("div", { style: "color:red" }, model.error),

    m(
      "ul",
      model.users.map((u) => m("li", `${u.name} (${u.email})`))
    ),
  ]);

/* ================================
   Program + Bootstrap
================================ */

const program = { init, update, view };

const env: DomEnv & { baseUrl: string } = {
  document,
  window,
  localStorage: window.localStorage,
  sessionStorage: window.sessionStorage,
  fetch: window.fetch.bind(window),
  baseUrl: "https://jsonplaceholder.typicode.com",
};

const root = document.getElementById("app")!;
renderApp(root, program, env, render);
