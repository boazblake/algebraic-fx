# algebraic-fx

Deterministic UI and effect runtime for TypeScript.

**You describe:**
- `Model` as plain data
- `Msg` as tagged unions
- `Program` as a pure state machine that returns `(model, effects[])`
- `Effects` as explicit `IO`, `Reader`, `Task` objects

**algebraic-fx provides:**
- A runtime loop that runs your `Program`
- A renderer abstraction for DOM, NativeScript, or anything else
- A minimal virtual DOM (`mithril-lite`) for browser UIs
- A small, composable effect algebra

---

## Table of Contents

- [Installation](#installation)
- [Core Idea](#core-idea)
- [Program Structure](#program-structure)
- [Effects](#effects)
- [Runtime Loop](#runtime-loop)
- [mithril-lite Renderer](#mithril-lite-renderer)
- [Informal Semantics](#informal-semantics)
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

A **Program** is a pure function that describes application behavior:
- It owns a **Model**
- It reacts to **Msg** values
- It returns a new **Model** plus a list of **Effects** to run

**Effects** are plain values that describe work. The runtime interprets those values with a supplied environment and dispatches resulting `Msg` back into the program.

The **UI** is any renderer that can turn a virtual tree into a real UI tree. The runtime does not depend on the browser. `mithril-lite` is one renderer.

---

## Program Structure

A typical program looks like this:

```typescript
import type { Dispatch, RawEffect } from "algebraic-fx";

export type Model = {
  count: number;
};

export type Msg =
  | { type: "INC" }
  | { type: "DEC" }
  | { type: "SET_FROM_STORAGE"; value: number };

export type AppEnv = {
  loadCount: () => Promise<number>;
  saveCount: (n: number) => Promise<void>;
};

export type Program = {
  init: () => [Model, RawEffect<AppEnv, Msg>[]];
  update: (msg: Msg, model: Model) => [Model, RawEffect<AppEnv, Msg>[]];
  view: (model: Model, dispatch: Dispatch<Msg>) => any;
};
```

You keep `Model` and `Msg` fully typed. Effects are constructed with helpers such as `IO`, `Reader`, `Task` (described below).

---

## Effects

algebraic-fx ships with lightweight effect constructors:

- **`IO<A>`** — describes synchronous work that may have side effects
- **`Reader<R, A>`** — describes a function from environment `R` to `A`
- **`Task<E, A>`** — describes an async computation that may fail with `E` or succeed with `A`

In the runtime, these combine into a single `RawEffect<Env, Msg>` type. Every effect is a value that, when interpreted, may schedule new `Msg` into the program.

### Example: Read from storage and dispatch a message

```typescript
import { IO, Reader } from "algebraic-fx";
import type { RawEffect } from "algebraic-fx";
import type { AppEnv, Msg } from "./types";

export const loadCountEffect = (): RawEffect<AppEnv, Msg> =>
  Reader.from<AppEnv>()
    .chain(env =>
      IO.fromPromise(() => env.loadCount())
    )
    .map<Msg>(value => ({ type: "SET_FROM_STORAGE", value }));
```

### Example: Save to storage and ignore the result

```typescript
export const saveCountEffect = (value: number): RawEffect<AppEnv, Msg> =>
  Reader.from<AppEnv>()
    .chain(env =>
      IO.fromPromise(() => env.saveCount(value))
    )
    .map<Msg>(() => ({ type: "NOOP" as const }));
```

You wire these effects into `init` and `update`.

---

## Runtime Loop

The core runtime connects a program to a renderer and an environment:

```typescript
import { renderApp } from "algebraic-fx/runtime";
import { createRenderer } from "algebraic-fx/mithril-lite";
import type { Program } from "./program";
import type { AppEnv } from "./env";

const env: AppEnv = {
  loadCount: async () => {
    const raw = localStorage.getItem("count");
    return raw == null ? 0 : Number(raw);
  },
  saveCount: async n => {
    localStorage.setItem("count", String(n));
  },
};

const mount = (root: Element, program: Program) => {
  const renderer = createRenderer(root);
  const run = renderApp(program, renderer, env);
  run();
};
```

**`renderApp`:**
1. Calls `program.init()` to get `[model, effects[]]`
2. Renders `program.view(model, dispatch)` through the given renderer
3. Interprets all effects using the environment
4. Dispatches any resulting `Msg`
5. Batches any dispatches that occur in the same frame
6. Repeats

You can plug any renderer that matches the signature `(root: Element, vnode: any) => void`.

---

## mithril-lite Renderer

algebraic-fx includes a minimal virtual DOM tailored to the runtime:
- Hyperscript function `m(tag, attrs?, ...children)`
- Plain object vnodes
- HTML and SVG support
- Efficient unkeyed diffing
- Optional keyed nodes

### Example view

```typescript
import { m } from "algebraic-fx/mithril-lite";
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

`createRenderer(root)` provided by `mithril-lite` turns vnodes into DOM and returns a `Renderer` that `renderApp` can use.

---

## Informal Semantics

This section describes the behavior as a deterministic pipeline:

```
Init → Render → Interpret Effects → Dispatch → Reduce → Render → ...
```

### Terms

- **M** — the Model type
- **Msg** — the message type
- **Eff** — the effect type `RawEffect<Env, Msg>`
- **Env** — a user-supplied environment
- **VNode** — an abstract UI tree understood by the renderer

### Runtime State

```typescript
type RuntimeState<M, Msg> = {
  model: M;
  pending: Eff[];    // effects waiting to be interpreted
  queue: Msg[];      // messages waiting to be reduced
};
```

### Functions

- `init: () => [M, Eff[]]`
- `update: (Msg, M) => [M, Eff[]]`
- `view: (M, Dispatch<Msg>) => VNode`
- `render: (VNode) => void`
- `interpret: (Eff, Env, Dispatch<Msg>) => void`

The `interpret` function may call `Dispatch` zero or more times, possibly asynchronously.

### 1. Init

On startup:
1. Call `init()` to get `[m0, effs0]`
2. Set `state.model = m0`
3. Set `state.pending = effs0`
4. Set `state.queue = []`

No `update` is called yet. Effects are scheduled for interpretation.

### 2. Render

For every state change of model:
1. Construct a `Dispatch` function that enqueues messages
2. Call `v = view(state.model, Dispatch)`
3. Call `render(v)`

The renderer may batch DOM updates internally but must behave as a pure function of `(root, vnode)` with respect to previous invocations.

**Key invariant:** For a fixed model and a fixed `Dispatch` reference, `view` must be pure.

### 3. Interpret Effects

Effects are interpreted after rendering. For each `Eff` in `state.pending`:
1. Remove `Eff` from `state.pending`
2. Call `interpret(Eff, env, Dispatch)`

`interpret` may:
- Perform IO
- Read from `env`
- Start async work
- Call `Dispatch(msg)` any number of times, immediately or later

Dispatch calls do not run `update` directly. They only enqueue messages.

**Key invariant:** `interpret` must not mutate model or UI directly. It can only interact via `Dispatch` and `env`.

### 4. Dispatch

The runtime provides a `Dispatch` of type `(msg: Msg) => void`.

**Semantics:**
- When an effect calls `Dispatch(msg)`, the runtime pushes `msg` into `state.queue`
- The runtime may batch multiple dispatches and process them in a single turn

**Guarantees:**
- For a given sequence of `Msg` produced by effects, the runtime will process them in FIFO order
- No `update` call is interleaved with another `update` call. The runtime processes the queue sequentially

### 5. Reduce

While `state.queue` is not empty:
1. Pop `msg` from `state.queue`
2. Compute `[modelNext, effs] = update(msg, state.model)`
3. Set `state.model = modelNext`
4. Append `effs` to `state.pending`

The order of messages is preserved. Every `update` call is pure and synchronous.

**Key invariant:**
- `update` is the only function that changes the model
- The model history is a pure function of the message history and `init`

### 6. Render Again

After the queue drains (or after a scheduling boundary such as `requestAnimationFrame`), the runtime triggers another render pass using the current `state.model`.

This closes a single pipeline cycle:

```
(model, pending, queue)
  → interpret pending
  → dispatch messages
  → reduce them
  → compute new model and new pending
  → render
```

The cycle repeats any time new effects or messages appear.

### Determinism

Given:
- A fixed `init`
- A fixed `update`
- A fixed `interpret` function
- A fixed `env`
- A fixed scheduler order for async callbacks

The sequence of `(model, vnode)` pairs across time is **deterministic**.

If async work introduces non-deterministic ordering, it does so only through the timing of `Dispatch` calls. The runtime itself does not add additional nondeterminism.

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
import { IO, Reader } from "algebraic-fx";
import type { RawEffect } from "algebraic-fx";
import type { AppEnv, Msg } from "./types";

export const loadCountEffect = (): RawEffect<AppEnv, Msg> =>
  Reader.from<AppEnv>()
    .chain(env => IO.fromPromise(() => env.loadCount()))
    .map<Msg>(value => ({ type: "SET", value }));

export const saveCountEffect = (value: number): RawEffect<AppEnv, Msg> =>
  Reader.from<AppEnv>()
    .chain(env => IO.fromPromise(() => env.saveCount(value)))
    .map<Msg>(() => ({ type: "SET_LOADING", value: false }));
```

### program.ts

```typescript
import type { Program } from "algebraic-fx";
import type { Model, Msg } from "./types";
import { loadCountEffect, saveCountEffect } from "./effects";
import { view } from "./view";

export const init = (): [Model, any[]] => [
  { count: 0, isLoading: true },
  [loadCountEffect()],
];

export const update = (msg: Msg, model: Model): [Model, any[]] => {
  switch (msg.type) {
    case "INC": {
      const next = { ...model, count: model.count + 1, isLoading: true };
      return [next, [saveCountEffect(next.count)]];
    }
    case "DEC": {
      const next = { ...model, count: model.count - 1, isLoading: true };
      return [next, [saveCountEffect(next.count)]];
    }
    case "SET":
      return [{ ...model, count: msg.value, isLoading: false }, []];
    case "SET_LOADING":
      return [{ ...model, isLoading: msg.value }, []];
  }
};

export const program: Program<Model, Msg, any> = {
  init,
  update,
  view,
};
```

### view.ts

```typescript
import { m } from "algebraic-fx/mithril-lite";
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

**Key design points:**

The runtime does not assume a DOM. It only depends on a `Renderer`:

```typescript
export type Renderer = (root: Element, vnode: any) => void;
```

**For NativeScript or React Native**, you can write an adapter that:
- Interprets vnodes as a tree of native views
- Applies props and event handlers
- Diffs trees over time

**For server-side rendering**, you can provide a renderer that produces strings instead of DOM, then wrap it in a small adapter that matches the `Renderer` type.

---

## Benchmarks

Synthetic microbenchmarks measured on Node 20, Apple M1 Max.  
These measure the internal vdom and effect interpreter, not real-world apps.

**Throughput metric:** ops/s (higher is better)

| Framework                      | vdom.create 10k | vdom.update list 200 | renderToString 5k | runEffects (IO) Task chain 10k |
|--------------------------------|-----------------|----------------------|-------------------|--------------------------------|
| **algebraic-fx (mithril-lite)**| 105,914         | 7,465                | 15,740            | 208,616                        |
| Mithril                        | ~80,000         | ~6,800               | ~13,000           | n/a                            |
| SolidJS                        | ~65,000         | ~5,000               | ~10,500           | n/a                            |
| Svelte                         | ~40,000         | ~3,000               | ~6,500            | n/a                            |
| Vue 3                          | ~28,000         | ~2,200               | ~4,400            | n/a                            |
| React 18                       | ~22,000         | ~1,700               | ~3,800            | n/a                            |

**These numbers indicate that:**
- `mithril-lite` sits at or above Mithril in these microbenchmarks
- algebraic-fx effect interpretation is cheap enough to use per message

> **Note:** Benchmarks are synthetic and should be treated as relative indicators, not guarantees.

---

## Documentation

For more detailed documentation, see:

- **[docs/01-program.md](docs/01-program.md)** — Detailed Program design, Model, Msg, state transitions
- **[docs/02-effects.md](docs/02-effects.md)** — Effect algebra, IO, Reader, Task, composition patterns
- **[docs/03-runtime.md](docs/03-runtime.md)** — Runtime loop, scheduling, batching, dispatch semantics
- **[docs/04-mithril-lite.md](docs/04-mithril-lite.md)** — Vnode format, keyed vs unkeyed lists, SSR notes
- **[docs/05-native-renderers.md](docs/05-native-renderers.md)** — Guidelines for NativeScript or other non-DOM renderers
- **[docs/06-testing.md](docs/06-testing.md)** — Testing Programs and Effects purely by driving messages and mocking environments
- **[docs/07-benchmarks.md](docs/07-benchmarks.md)** — Benchmark harness, methodology, and how to run them

---

## Project Layout

Recommended layout:

```
src/
  core/
    io.ts
    reader.ts
    task.ts
    runtime.ts
  renderer/
    mithril-lite.ts
  examples/
    counter/
      types.ts
      effects.ts
      program.ts
      view.ts
```

---

## License

MIT
