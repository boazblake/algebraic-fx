# algebraic-fx

A tiny TEA-style runtime with explicit algebraic effects over a fast virtual DOM

algebraic-fx is a minimal functional runtime inspired by Elm, Halogen, and the PureScript ecosystem.
It provides:
	•	Pure update functions
	•	A clean MVU architecture
	•	An explicit Effect system
	•	A tiny virtual DOM representation
	•	First-class ADTs: IO, Task, Reader, Maybe, Either

All side effects are represented as values (Effect<Env, Msg>) and run by the runtime after rendering.

It works in both browser and server environments.

⸻

✨ Features

• Pure functional architecture (Model + Update + View)

• Explicit effects via Effect<Env, Msg>

• Zero magic — no hidden global state, no implicit side effects

• Environment passing via typed Env

• Test-friendly — effects are values, not hidden mutations

• Small — no dependencies, fully tree-shakeable

• Typed and modular — written in TypeScript with clean public API

⸻

🚀 Install

npm install algebraic-fx


⸻

🧠 Core Concepts

algebraic-fx applications are structured using:
	1.	Model — your app state
	2.	Msg — discriminated union of messages
	3.	Update — pure reducer returning next model + effects
	4.	View — pure function returning a VNode tree
	5.	Program — a container for init/update/view
	6.	Effect — all interactions with the outside world

The runtime ties these pieces together and executes Effects explicitly.

⸻

🧩 Example

import { IO, ioEffect, renderApp, type Program, type Payload } from "algebraic-fx";

// Model
type Model = { count: number };

// Messages
type Msg =
  | Payload<"Count.Inc">
  | Payload<"Count.Dec">;

// Env
type Env = { document: Document; window: Window };

// Program
const program: Program<Model, Msg, Env> = {
  init: IO(() => ({
    model: { count: 0 },
    effects: [],
  })),

  update(msg, model) {
    switch (msg.type) {
      case "Count.Inc":
        return { model: { count: model.count + 1 }, effects: [] };

      case "Count.Dec":
        return { model: { count: model.count - 1 }, effects: [] };
    }
  },

  view(model, dispatch) {
    return {
      tag: "div",
      children: [
        { tag: "h1", children: [`Count: ${model.count}`] },
        {
          tag: "button",
          props: { onclick: () => dispatch({ type: "Count.Inc", msg: {} }) },
          children: ["+1"],
        },
        {
          tag: "button",
          props: { onclick: () => dispatch({ type: "Count.Dec", msg: {} }) },
          children: ["-1"],
        },
      ],
    };
  },
};

// Run
renderApp(document.body, program, { document, window }, (root, vnode) => {
  root.innerHTML = "";
  root.appendChild(renderVnode(vnode)); // your VDOM renderer
});


⸻

🎯 Effects

All side effects are represented as:

export interface Effect<Env, Msg> {
  run(env: Env, dispatch: Dispatch<Msg>): void | Promise<void>;
}

Dispatch messages from inside effects:

const fx: Effect<Env, Msg> = {
  run(env, dispatch) {
    dispatch({ type: "Something.Happened", msg: { value: 42 } });
  },
};

Effects returned from update:

return {
  model,
  effects: [fx]
};

Effects are always executed after rendering.

⸻

🌐 IO & Reader Effects

Use tagged wrappers when interacting with IO or environment-dependent operations.

IOEffect

effects: [ioEffect(IO(() => console.log("hello")))]

ReaderEffect

effects: [readerEffect(Reader(env => IO(() => env.window.alert("Hi!"))))]


⸻

🌍 Task API for Async Work

Use httpTask for pure HTTP:

import { httpTask, Right, Left } from "algebraic-fx";

const request = httpTask("/api/user");

request.run(env).run().then((either) => {
  if (Either.isRight(either)) console.log(either.right);
});

You can convert a Task into an Effect via:

const taskEffect: Effect<AppEnv, Msg> = {
  run(env, dispatch) {
    request.run(env).run().then((either) =>
      Either.match(
        (err) => dispatch({ type: "Http.Error", msg: { err } }),
        (data) => dispatch({ type: "Http.Success", msg: { data } })
      )(either)
    );
  },
};


⸻

🏗 Project Structure

src/
  adt/          # IO, Task, Reader, Maybe, Either
  core/
    types.ts
    render.ts
  env/
    dom-env.ts
  helpers/
    http-task.ts
  index.ts

Tests live in tests/.

⸻

🧪 Testing

Install dependencies:

npm install --save-dev vitest happy-dom

Vitest config:

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./tests/setup-env.ts"]
  },
});

Minimal setup-env:

// Happy DOM provides DOM globals; no setup needed.

Run tests:

npm test


⸻

📚 Docs Index (TypeDoc)

Your docs/ folder should contain:

1. Introduction
	•	What is algebraic-fx
	•	MVU architecture
	•	Effect system overview
	•	Environment concept

2. Core API

Program
	•	Program<M, Msg, Env>
	•	init / update / view lifecycle

Effect System
	•	Effect<Env, Msg>
	•	Dispatch<Msg>
	•	RawEffect<E>
	•	ioEffect
	•	readerEffect

Virtual DOM
	•	VNode, VChild, Props

Runtime
	•	renderApp()
	•	runEffects()

⸻

3. ADTs

IO
	•	IO<A>
	•	.run()
	•	IO(() => ...)

Reader
	•	Reader<E, A>
	•	.run(env)
	•	.map / .chain

Task
	•	Task<E, A>
	•	.run() & .runWith(signal)

Maybe
	•	Just
	•	Nothing
	•	Maybe.of / Maybe.isJust

Either
	•	Left
	•	Right
	•	Either.match

⸻

4. Helpers

HTTP Task
	•	httpTask
	•	HttpEnv
	•	DefaultHttpError

⸻

5. Environment

DomEnv
	•	Minimal browser environment
	•	How applications extend it

⸻

6. Recipes
	•	How to wrap a Task into an Effect
	•	How to wrap fetch into an Effect
	•	How to inject environment dependencies
	•	How to test effects
	•	How to mock dispatch

⸻

7. Advanced
	•	Custom renderers (canvas, WebGL, terminal)
	•	Custom effect drivers
	•	Event streams and reactive patterns

⸻

📝 License

MIT © Boaz Blake

⸻
