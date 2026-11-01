# algebraic-fx

Forked from [ebsi-bblake/effects-vdom](https://github.com/ebsi-bblake/effects-vdom).

Small TEA-style runtime experiment for TypeScript.

**You describe:**
- `Model` as plain data
- `Msg` as tagged unions
- `Program` with `init`, `update`, and `view`
- `Effects` as `IO`, `Reader`, and `Task` values

**algebraic-fx provides:**
- A runtime that starts a `Program` and interprets its effects
- A renderer callback that accepts an `Element` root
- A DOM renderer in `mithril-lite`
- A separate function that serializes a vnode to HTML

---

## Table of Contents

- [Installation](#installation)
- [Core Idea](#core-idea)
- [Program Structure](#program-structure)
- [Effects](#effects)
- [Runtime Loop](#runtime-loop)
- [mithril-lite Renderer](#mithril-lite-renderer)
- [Runtime Behavior](#runtime-behavior)
- [Full Example](#full-example)
- [Renderer Abstraction](#renderer-abstraction)
- [Benchmarks](#benchmarks)
- [Documentation](#documentation)

---

## Installation

```bash
npm install algebraic-fx
```

TypeScript types are included.

---

## Core Idea

A `Program<Model, Msg, Env>` contains an initial `IO`, an `update` function, and a `view` function. The initial `IO` returns a model and effects. Each call to `update` returns a new model and effects.

The runtime interprets effect values after initialization and after each update. A successful `Task` result can dispatch a message. A failed `Task` result is ignored.

`renderApp` takes a DOM `Element` and a renderer callback. This repository includes a DOM renderer and a separate vnode-to-HTML function.

---

## Program Structure

A typical program looks like this:

```typescript
import { IO } from "algebraic-fx/adt/io";
import { m } from "algebraic-fx";
import type { Dispatch, Program, RawEffect } from "algebraic-fx";

type Model = { count: number };
type Msg = { type: "INC" };
type AppEnv = {};

const program: Program<Model, Msg, AppEnv> = {
  init: IO<{ model: Model; effects: RawEffect<AppEnv, Msg>[] }>(() => ({
    model: { count: 0 },
    effects: [],
  })),
  update: (_msg: Msg, model: Model) => ({ model, effects: [] }),
  view: (model: Model, _dispatch: Dispatch<Msg>) =>
    m("output", String(model.count)),
};

```

You keep `Model` and `Msg` fully typed. Effects are constructed with helpers such as `IO`, `Reader`, `Task` (described below).

---

## Effects

algebraic-fx ships with lightweight effect constructors:

- **`IO<A>`** — describes synchronous work that may have side effects
- **`Reader<R, A>`** — describes a function from environment `R` to `A`
- **`Task<E, A>`** — describes an async computation that may fail with `E` or succeed with `A`

The runtime accepts these values through `RawEffect<Env, Msg>`. Some effects dispatch a message. A `Task` failure does not dispatch a message.

### Example: Read from storage and dispatch a message

```typescript
import { Reader } from "algebraic-fx/adt/reader";
import { TaskModule } from "algebraic-fx/adt/task";
import type { RawEffect } from "algebraic-fx";
import type { Task } from "algebraic-fx/adt/task";
import type { AppEnv, Msg } from "./types";

export const loadCountEffect = (): RawEffect<AppEnv, Msg> =>
  Reader<AppEnv, Task<unknown, Msg>>((env) =>
    TaskModule.map<unknown, number, Msg>((value) => ({
      type: "SET",
      value,
    }))(
      TaskModule.fromPromise(() => env.loadCount(), (error) => error)
    )
  );
```

### Example: Save to storage and ignore the result

```typescript
import { Reader } from "algebraic-fx/adt/reader";
import { TaskModule } from "algebraic-fx/adt/task";
import type { RawEffect } from "algebraic-fx";
import type { Task } from "algebraic-fx/adt/task";
import type { AppEnv, Msg } from "./types";

export const saveCountEffect = (value: number): RawEffect<AppEnv, Msg> =>
  Reader<AppEnv, Task<unknown, void>>((env) =>
    TaskModule.fromPromise(
      () => env.saveCount(value),
      (error) => error
    )
  );
```

You wire these effects into `init` and `update`. The runtime dispatches successful `Task` results. It ignores `Left` failures. It does not map `E` to `Msg`, and this README does not cover that mapping.

---

## Runtime Loop

The core runtime connects a program to a renderer and an environment:

```typescript
import { render, renderApp } from "algebraic-fx";
import type { Program, Renderer } from "algebraic-fx";
import type { AppEnv, Model, Msg } from "./types";
import { program } from "./program";

const env: AppEnv = {
  loadCount: async () => {
    const raw = localStorage.getItem("count");
    return raw == null ? 0 : Number(raw);
  },
  saveCount: async n => {
    localStorage.setItem("count", String(n));
  },
};

const root = document.getElementById("app");
if (root === null) throw new Error("Missing app root");

const renderer: Renderer = (element, vnode) =>
  render(element as HTMLElement, vnode);

const typedProgram: Program<Model, Msg, AppEnv> = program;
renderApp(root, typedProgram, env, renderer);
```

`renderApp` starts immediately. It calls `program.init.run()` once. It renders the initial view, then it interprets the initial effects. Each `dispatch(msg)` call invokes `update` synchronously. The runtime then renders the new view and interprets the returned effects. It does not batch dispatch calls.

A `Renderer` receives an `Element` root and a vnode. The included `render` function accepts an `HTMLElement` root.

---

## mithril-lite Renderer

algebraic-fx includes a minimal virtual DOM tailored to the runtime:
- Hyperscript function `m(tag, attrs?, ...children)`
- Plain object vnodes
- HTML and SVG support
- Unkeyed and keyed list diffing

### Example view

```typescript
import { m } from "algebraic-fx";
import type { Model, Msg } from "./types";
import type { Dispatch } from "algebraic-fx";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m(
    "div",
    { class: "flex items-center space-x-4" },
    m("button", { onclick: () => dispatch({ type: "DEC" }) }, "-"),
    m("span", { class: "text-xl font-mono" }, String(model.count)),
    m("button", { onclick: () => dispatch({ type: "INC" }) }, "+"),
  );
```

`render` from `mithril-lite` updates an `HTMLElement`. Pass a renderer callback to `renderApp`.

---

## Runtime Behavior

`renderApp` executes `program.init.run()` once. It stores the model. It renders the initial view. It then interprets the initial effects.

Each call to `dispatch(msg)` invokes `program.update` synchronously. The runtime stores the new model. It renders the new view. It then interprets the returned effects.

A `Task` effect dispatches a resolved `Right` value when that value is not `undefined`. The interpreter ignores `Left` values. It does not map Task errors to messages.
---

## Full Example

### types.ts

```typescript
export type Model = {
  count: number;
  isLoading: boolean;
};

export type Msg =
  | { type: "INC" }
  | { type: "DEC" }
  | { type: "SET"; value: number }
  | { type: "SET_LOADING"; value: boolean };

export type AppEnv = {
  loadCount: () => Promise<number>;
  saveCount: (n: number) => Promise<void>;
};
```

### effects.ts

```typescript
import { Reader } from "algebraic-fx/adt/reader";
import { TaskModule } from "algebraic-fx/adt/task";
import type { RawEffect } from "algebraic-fx";
import type { Task } from "algebraic-fx/adt/task";
import type { AppEnv, Msg } from "./types";

export const loadCountEffect = (): RawEffect<AppEnv, Msg> =>
  Reader<AppEnv, Task<unknown, Msg>>((env) =>
    TaskModule.map<unknown, number, Msg>((value) => ({
      type: "SET",
      value,
    }))(
      TaskModule.fromPromise(() => env.loadCount(), (error) => error)
    )
  );

export const saveCountEffect = (value: number): RawEffect<AppEnv, Msg> =>
  Reader<AppEnv, Task<unknown, Msg>>((env) =>
    TaskModule.map<unknown, void, Msg>(
      () => ({ type: "SET_LOADING", value: false })
    )(
      TaskModule.fromPromise(
        () => env.saveCount(value),
        (error) => error
      )
    )
  );
```

### program.ts

```typescript
import { IO } from "algebraic-fx/adt/io";
import type { Program } from "algebraic-fx";
import type { RawEffect } from "algebraic-fx";
import type { AppEnv, Model, Msg } from "./types";
import { loadCountEffect, saveCountEffect } from "./effects";
import { view } from "./view";

export const init = IO<{
  model: Model;
  effects: RawEffect<AppEnv, Msg>[];
}>(() => ({
  model: { count: 0, isLoading: true },
  effects: [loadCountEffect()],
}));

export const update = (
  msg: Msg,
  model: Model
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "INC": {
      const next = { ...model, count: model.count + 1, isLoading: true };
      return { model: next, effects: [saveCountEffect(next.count)] };
    }
    case "DEC": {
      const next = { ...model, count: model.count - 1, isLoading: true };
      return { model: next, effects: [saveCountEffect(next.count)] };
    }
    case "SET":
      return { model: { ...model, count: msg.value, isLoading: false }, effects: [] };
    case "SET_LOADING":
      return { model: { ...model, isLoading: msg.value }, effects: [] };
  }
};

export const program: Program<Model, Msg, AppEnv> = {
  init,
  update,
  view,
};
```

### view.ts

```typescript
import { m } from "algebraic-fx";
import type { Model, Msg } from "./types";
import type { Dispatch } from "algebraic-fx";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m(
    "div",
    { class: "flex flex-col items-center justify-center min-h-screen gap-4" },
    m(
      "div",
      { class: "flex items-center gap-4" },
      m("button", { onclick: () => dispatch({ type: "DEC" }) }, "−"),
      m("span", { class: "text-4xl font-mono" }, String(model.count)),
      m("button", { onclick: () => dispatch({ type: "INC" }) }, "+"),
    ),
    model.isLoading
      ? m("div", { class: "text-sm text-slate-500" }, "Saving...")
      : null,
  );
```

---

## Renderer Abstraction

`Renderer` is a callback that accepts an `Element` root and a vnode. The repository includes the DOM renderer below. It does not include a NativeScript or React Native renderer.

You may supply another callback with the same signature. The runtime still passes an `Element` root.

```typescript
import { render } from "algebraic-fx";
import type { Renderer } from "algebraic-fx";

export const renderer: Renderer = (root, vnode) =>
  render(root as HTMLElement, vnode);
```

`renderToString` converts a vnode tree to HTML. It is a separate helper. `renderApp` still requires an `Element` root. The repository does not include a server-side `renderApp` adapter.

---

## Benchmarks

These results come from one run of this repository's benchmark harness on 2026-11-01. The run used Node v24.11.1 on an Apple M4 (arm64, 10 logical CPUs, 16 GiB memory).

| Workload | Iterations | ops/s |
|---|---:|---:|
| vdom.create 10k | 10,000 | 141,771 |
| vdom.update list 200 | 5,000 | 14,119 |
| runEffects IO x1000 | 500 | 66,926 |
| runEffects Reader x1000 | 500 | 3,122 |
| runEffects custom x1000 | 500 | 272,337 |
| Task chain 10k | 10,000 | 2,837,986 |
| Promise chain 10k | 10,000 | 16,852,749 |
| renderToString 5k | 5,000 | 25,897 |

These are synthetic microbenchmarks. They are not cross-framework measurements. Each workload warms up 10,000 calls before timing. The vdom update workload uses `FakeDocument`, not a browser. The Task and Promise chain workloads do not await completion. They measure chain evaluation and Promise creation.

Run the harness with `npm run bench`. See [benchmarks/README.md](benchmarks/README.md) for the workload details.

---

## Documentation

The generated API reference is at [docs/index/README.md](docs/index/README.md).

---

## License

MIT
