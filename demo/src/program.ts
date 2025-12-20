import { IO, fx, m } from "algebraic-fx";
import { httpTask } from "algebraic-fx/helpers/http-task";
import type { RawEffect, Dispatch } from "algebraic-fx/core/types";
import type { AppEnv } from "./env";

/* ============================================================================
   Types
============================================================================ */

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Model = {
  count: number;

  users: User[];
  loadingUsers: boolean;
  usersError: string | null;

  clockMs: number;
  clockRunning: boolean;

  echoInput: string;
  echoed: string[];
};

export type Msg =
  | { type: "Increment" }
  | { type: "Decrement" }
  | { type: "FetchUsers" }
  | { type: "UsersFetched"; users: User[] }
  | { type: "UsersFetchFailed"; error: string }
  | { type: "ClockStart" }
  | { type: "ClockStop" }
  | { type: "Tick"; ms: number }
  | { type: "SetEchoInput"; value: string }
  | { type: "EchoSubmit" }
  | { type: "Echoed"; value: string };

/* ============================================================================
   Init
============================================================================ */

const initialModel: Model = {
  count: 0,

  users: [],
  loadingUsers: false,
  usersError: null,

  clockMs: 0,
  clockRunning: false,

  echoInput: "",
  echoed: [],
};

export const init: IO<{ model: Model; effects: RawEffect<AppEnv, Msg>[] }> =
  IO.of({
    model: initialModel,
    effects: [],
  });

/* ============================================================================
   Effects
============================================================================ */

/** HTTP fetch via public helper */
const fetchUsers = (): RawEffect<AppEnv, Msg> =>
  httpTask<unknown, User[], Msg>(
    "/users",
    undefined,
    (err) => ({ type: "UsersFetchFailed", error: String(err) }),
    (users) => ({ type: "UsersFetched", users })
  );

/** Subscription effect with cleanup */
const clockSubscription = (): RawEffect<AppEnv, Msg> =>
  fx<AppEnv, Msg>((env, dispatch) => {
    const id = env.window.setInterval(() => {
      dispatch({ type: "Tick", ms: Date.now() });
    }, 250);

    return () => env.window.clearInterval(id);
  });

/* ============================================================================
   Update
============================================================================ */

export const update = (
  msg: Msg,
  model: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "Increment":
      return { model: { ...model, count: model.count + 1 }, effects: [] };

    case "Decrement":
      return { model: { ...model, count: model.count - 1 }, effects: [] };

    case "FetchUsers":
      return {
        model: { ...model, loadingUsers: true, usersError: null },
        effects: [fetchUsers()],
      };

    case "UsersFetched":
      return {
        model: {
          ...model,
          users: msg.users,
          loadingUsers: false,
          usersError: null,
        },
        effects: [],
      };

    case "UsersFetchFailed":
      return {
        model: {
          ...model,
          loadingUsers: false,
          usersError: msg.error,
        },
        effects: [],
      };

    case "ClockStart":
      if (model.clockRunning) return { model, effects: [] };
      return {
        model: { ...model, clockRunning: true },
        effects: [clockSubscription()],
      };

    case "ClockStop":
      return { model: { ...model, clockRunning: false }, effects: [] };

    case "Tick":
      if (!model.clockRunning) return { model, effects: [] };
      return { model: { ...model, clockMs: msg.ms }, effects: [] };

    case "SetEchoInput":
      return { model: { ...model, echoInput: msg.value }, effects: [] };

    case "EchoSubmit": {
      const v = model.echoInput.trim();
      if (!v) return { model, effects: [] };

      return {
        model: { ...model, echoInput: "" },
        effects: [
          { type: "Echoed", value: `plain msg: ${v}` },
          IO.of<Msg>({ type: "Echoed", value: `IO.of msg: ${v}` }),
        ],
      };
    }

    case "Echoed":
      return {
        model: { ...model, echoed: [msg.value, ...model.echoed].slice(0, 8) },
        effects: [],
      };

    default:
      return { model, effects: [] };
  }
};

/* ============================================================================
   View
============================================================================ */

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("div", [
    m("h1", "algebraic-fx 0.0.2 demo"),

    m("section", [
      m("h2", "Pure update"),
      m("button", { onclick: () => dispatch({ type: "Decrement" }) }, "-"),
      m("span", String(model.count)),
      m("button", { onclick: () => dispatch({ type: "Increment" }) }, "+"),
    ]),

    m("section", [
      m("h2", "HTTP effect"),
      m(
        "button",
        {
          onclick: () => dispatch({ type: "FetchUsers" }),
          disabled: model.loadingUsers,
        },
        model.loadingUsers ? "Loading..." : "Load users"
      ),
      model.usersError && m("div", model.usersError),
      model.users.length &&
        m(
          "ul",
          model.users.map((u) => m("li", `${u.name} (${u.email})`))
        ),
    ]),

    m("section", [
      m("h2", "Subscription effect"),
      m("button", { onclick: () => dispatch({ type: "ClockStart" }) }, "Start"),
      m("button", { onclick: () => dispatch({ type: "ClockStop" }) }, "Stop"),
      m("div", String(model.clockMs)),
    ]),

    m("section", [
      m("h2", "IO + Msg effects"),
      m("input", {
        value: model.echoInput,
        oninput: (e: InputEvent) =>
          dispatch({
            type: "SetEchoInput",
            value: (e.target as HTMLInputElement).value,
          }),
      }),
      m("button", { onclick: () => dispatch({ type: "EchoSubmit" }) }, "Echo"),
      m(
        "ul",
        model.echoed.map((x) => m("li", x))
      ),
    ]),
  ]);

export const program = { init, update, view };
