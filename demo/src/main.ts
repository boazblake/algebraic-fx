import {
  IO,
  Reader,
  Task,
  Either,
  m,
  render,
  renderApp,
  type Program,
  type Dispatch,
  type RawEffect,
  type DomEnv,
} from "algebraic-fx";

/* ============================================================================
   Types
============================================================================ */

type Model = {
  count: number;
  loading: boolean;
  message: string | null;
  error: string | null;
};

type Msg =
  | { type: "INC" }
  | { type: "DEC" }
  | { type: "LOAD" }
  | { type: "LOADED"; value: string }
  | { type: "LOAD_ERROR"; error: string };

type LoadError = { message: string };

/* ============================================================================
   Decoder using EitherModule
============================================================================ */

const decode = (raw: unknown): any /* Either<L,R> */ => {
  const obj = raw as any;

  if (obj && typeof obj.title === "string") {
    return { _tag: "Right", right: obj.title };
  }

  return { _tag: "Left", left: { message: "Invalid JSON" } };
};

/* ============================================================================
   Reader<Env,Task> effect
============================================================================ */

const fetchMessage = Reader.Reader((env: DomEnv) =>
  Task.of((signal?: AbortSignal) =>
    env
      .fetch("posts/1", { signal })
      .then((r) => r.json())
      .then((json) => decode(json))
      .catch((err) => ({ _tag: "Left", left: { message: String(err) } }))
  )
);

/* ============================================================================
   Init — MUST use IO.IO
============================================================================ */

const init = IO.IO(() => ({
  model: {
    count: 0,
    loading: false,
    message: null,
    error: null,
  },
  effects: [] as RawEffect<DomEnv>[],
}));

console.log("IO imported =", IO);
console.log("IO.IO =", IO.IO);
console.log("init =", init);
console.log("isIO =", typeof init === "object" && "_tag" in init);
/* ============================================================================
   Update — pure
============================================================================ */

const update = (
  msg: Msg,
  model: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<DomEnv>[] } => {
  switch (msg.type) {
    case "INC":
      return { model: { ...model, count: model.count + 1 }, effects: [] };

    case "DEC":
      return { model: { ...model, count: model.count - 1 }, effects: [] };

    case "LOAD": {
      const fx: RawEffect<DomEnv> = Reader.map((task: any) =>
        IO.IO(() => {
          task.run().then((either: any) => {
            if (either._tag === "Right") {
              dispatch({ type: "LOADED", value: either.right });
            } else {
              dispatch({
                type: "LOAD_ERROR",
                error: either.left.message,
              });
            }
          });
        })
      )(fetchMessage);

      return {
        model: { ...model, loading: true, message: null, error: null },
        effects: [fx],
      };
    }

    case "LOADED":
      return {
        model: { ...model, loading: false, message: msg.value },
        effects: [],
      };

    case "LOAD_ERROR":
      return {
        model: { ...model, loading: false, error: msg.error },
        effects: [],
      };

    default:
      return { model, effects: [] };
  }
};

/* ============================================================================
   View
============================================================================ */

const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("div", { style: "padding:1rem;font-family:sans-serif;" }, [
    m("h1", "algebraic-fx 0.0.2 — working demo"),

    m("div", { style: "margin:.5rem 0;" }, [
      m("button", { onclick: () => dispatch({ type: "DEC" }) }, "-"),
      m("span", { style: "padding:0 .75rem;" }, String(model.count)),
      m("button", { onclick: () => dispatch({ type: "INC" }) }, "+"),
    ]),

    m(
      "button",
      {
        onclick: () => dispatch({ type: "LOAD" }),
        disabled: model.loading,
      },
      model.loading ? "Loading…" : "Load Message"
    ),

    model.message && m("p", "Message: " + model.message),
    model.error && m("p", { style: "color:red" }, model.error),
  ]);

/* ============================================================================
   Program
============================================================================ */

const program: Program<Model, Msg> = {
  init,
  update,
  view,
};

/* ============================================================================
   Env
============================================================================ */

const env: DomEnv = {
  document: window.document,
  window,
  localStorage: window.localStorage,
  sessionStorage: window.sessionStorage,
  fetch: window.fetch.bind(window),
};

/* ============================================================================
   Root
============================================================================ */

/* ============================================================================
   Run
============================================================================ */

renderApp(env.document.getElementById("app"), program, env, render);
