# Algebraic-fx

A tiny TEA-style runtime with explicit algebraic effects over a fast virtual DOM.

- **Pure update.** Effects are values. Rendering is a pure function.
- **Batteries included ADTs:** IO, Reader, Writer, State, Task, Either, Maybe, Stream, Validation, Id.
- **Minimal custom renderer.** Built-in mithril-lite renderer with hyperscript (`m`) for efficient, SVG-ready virtual DOM.

> **Note on names:** Code samples use `IO`, `Reader`, etc. for clarity. If your build publishes lowercase symbols, alias on import:
>
> ```ts
> import {
>   io as IO,
>   reader as Reader,
>   writer as Writer,
>   m,
> } from "@boazblake/algebraic-js";
> ```
>
> **Note on hyperscript:** The library exports `m` (mithril-lite hyperscript) as the default. You can use `h` as an alias if preferred:
>
> ```ts
> import { m as h } from "@boazblake/algebraic-js";
> ```

---

## Quick Start

```bash
npm install algebraic-js
```

```ts
import { app, h, IO } from "algebraic-js";

type Model = { count: number };
type Msg = { type: "INC" } | { type: "DEC" };

const program = {
  init: IO(() => ({ model: { count: 0 }, effects: [] })),

  update: (msg: Msg, model: Model) => {
    if (msg.type === "INC") return { model: { count: model.count + 1 } };
    if (msg.type === "DEC") return { model: { count: model.count - 1 } };
    return { model };
  },

  view: (m: Model, dispatch: (msg: Msg) => void) =>
    h(
      "div",
      {},
      h("h1", {}, String(m.count)),
      h("button", { onclick: () => dispatch({ type: "DEC" }) }, "−"),
      h("button", { onclick: () => dispatch({ type: "INC" }) }, "+")
    ),
};

app(document.getElementById("app")!, program);
```

---

## Philosophy

Algebraic-fx treats effects as first-class algebraic values. No ambient `useEffect`, no lifecycle riddles. You model computation with well-studied abstractions. This yields isolation, testability, and composability across UI and non-UI code.

---

## Why Algebraic-fx?

**Choose Algebraic-fx if you want:**

- TEA semantics: Model + Update + View with explicitly emitted effects
- Explicit effect composition across domains without framework magic
- Tiny surface area and direct control of scheduling
- No component-local mutable state scattered across the tree

**Choose React/Vue/Solid if you want:**

- Rich component ecosystems and idiomatic patterns for those frameworks

Use Algebraic-fx when architecture clarity and explicit effects are your primary goals.

---

## Which ADT Should I Use?

| Need                       | ADT          |
| -------------------------- | ------------ |
| Async operations           | `Task`       |
| Dependency injection       | `Reader`     |
| Accumulate logs/events     | `Writer`     |
| Local state evolution      | `State`      |
| Handle optional values     | `Maybe`      |
| Error branching            | `Either`     |
| Continuous events/teardown | `Stream`     |
| Batch validation           | `Validation` |
| Just wrap a side effect    | `IO`         |

---

## Hyperscript API

Algebraic-fx includes **mithril-lite**, a minimal virtual DOM renderer with hyperscript support:

```ts
import { m } from "@boazblake/algebraic-js";

// Basic element
m("div", "Hello");

// With attributes
m("button", { onclick: handleClick, class: "btn" }, "Click me");

// CSS selector syntax
m("div.container#main", "Content");
m("button.btn.primary", { onclick: handleClick }, "Submit");

// Nested children
m("ul", m("li", "Item 1"), m("li", "Item 2"), m("li", "Item 3"));

// SVG support (automatic namespace handling)
m(
  "svg",
  { width: 100, height: 100 },
  m("circle", { cx: 50, cy: 50, r: 40, fill: "blue" })
);

// Keyed lists for efficient updates
items.map((item) => m("li", { key: item.id }, item.name));
```

**Key features:**

- Selector shortcuts: `m("div.class#id")` → `<div class="class" id="id">`
- Automatic SVG namespace detection
- Efficient keyed diffing algorithm
- Style object or string support: `{ style: { color: "red" } }` or `{ style: "color: red" }`
- Event handlers as properties: `{ onclick: fn }`

---

## Examples: From Simple to Composed

### 1. Basic Counter

```ts
type Model = { n: number };
type Msg = { type: "INC" } | { type: "DEC" };

export const init = IO(() => ({ model: { n: 0 }, effects: [] }));

export const update = (msg: Msg, m: Model) => {
  switch (msg.type) {
    case "INC":
      return { model: { n: m.n + 1 } };
    case "DEC":
      return { model: { n: m.n - 1 } };
    default:
      return { model: m };
  }
};

export const view = (m: Model, dispatch: (msg: Msg) => void) =>
  h(
    "div",
    {},
    h("h1", {}, String(m.n)),
    h("button", { onclick: () => dispatch({ type: "DEC" }) }, "−"),
    h("button", { onclick: () => dispatch({ type: "INC" }) }, "+")
  );
```

### 2. Counter with IO Side Effect

```ts
type Msg = { type: "INC" } | { type: "DEC" } | { type: "PINGED" };

export const update = (msg: Msg, m: Model) => {
  if (msg.type === "INC") {
    return {
      model: { n: m.n + 1 },
      effects: [IO(() => console.log("increment"))],
    };
  }
  if (msg.type === "DEC") {
    return {
      model: { n: m.n - 1 },
      effects: [IO(() => console.log("decrement"))],
    };
  }
  return { model: m };
};
```

### 3. Composing Reader → Task → Writer

```ts
type Env = { api: string };
type Err = string;
type Data = { id: string; value: string };

const saveWithLogging = (data: Data) =>
  Reader<Env, Task<Err, [Either<Err, void>, string[]]>>((env) =>
    Task(() =>
      fetch(env.api, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => (r.ok ? Right<void>(undefined) : Left<Err>("Save failed")))
    ).map((result) => {
      const log = `Saved at ${new Date().toISOString()}`;
      return [result, [log]] as [Either<Err, void>, string[]];
    })
  );

// Usage inside update
type Model = { env: Env; logs: string[]; saving: boolean; error?: string };
type Msg =
  | { type: "SAVE"; data: Data }
  | { type: "SAVE_DONE"; result: Either<Err, void>; logs: string[] };

export const update = (msg: Msg, m: Model) => {
  switch (msg.type) {
    case "SAVE": {
      const task = saveWithLogging(msg.data).run(m.env);
      return {
        model: { ...m, saving: true },
        effects: [
          IO(() =>
            task
              .run()
              .then(([result, logs]) =>
                (window as any).dispatch({ type: "SAVE_DONE", result, logs })
              )
          ),
        ],
      };
    }
    case "SAVE_DONE": {
      const nextLogs = m.logs.concat(msg.logs);
      return {
        model: {
          ...m,
          saving: false,
          logs: nextLogs,
          error: msg.result._tag === "Left" ? msg.result.left : undefined,
        },
      };
    }
    default:
      return { model: m };
  }
};
```

---

## Runtime API

```ts
type EffectLike = { run: () => any; cancel?: () => void };

type Program<M, Msg> = {
  init: { run: () => { model: M; effects?: EffectLike[] } };
  update: (msg: Msg, model: M) => { model: M; effects?: EffectLike[] };
  view: (model: M, dispatch: (msg: Msg) => void) => any;
};

declare function app<M, Msg>(
  root: Element,
  program: Program<M, Msg>
): {
  dispatch: (msg: Msg) => void;
};
```

The renderer calls `view(model, dispatch)` on start and after every update. Effects in the `effects` array are executed post-render.

---

## ADT Reference

For full details, see [docs/ADT_GUIDE.md](docs/ADT_GUIDE.md).

**Available ADTs:**

- **IO:** `map`, `chain`, `run()`
- **Reader\<R, A\>:** `map`, `chain`, `run(env: R)`
- **Writer\<W, A\>:** `map`, `chain`, `run(): [A, W]`, `of(a, empty)`, `tell(w)`
- **State\<S, A\>:** `map`, `chain`, `run(s: S): [A, S]`, `of(a)`, `get`, `put`
- **Task\<E, A\>:** `map`, `chain`, `run(): Promise<Either<E, A>>`
- **Either\<L, R\>:** `Left(l) | Right(r)`, helpers `map`, `chain`, `fold`
- **Maybe:** `Just(a) | Nothing`, helpers `map`, `chain`, `withDefault`
- **Stream:** `subscribe({next, error?, complete?})`, `map`, `chain`, `of`, `fromEvent`
- **Validation\<E, A\>:** `Success(a) | Failure(E[])`, `map`, `ap`, `concat`
- **Id:** Identity monad for uniform interfaces

---

## Troubleshooting

| Issue                         | Solution                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| Effects not running           | Ensure you returned `{ model, effects: […] }` from update                                              |
| Dispatch not changing UI      | Verify RAF queue drains; confirm dispatch is used from view                                            |
| Type errors with chained ADTs | Ensure each `chain` returns the same ADT. Convert across ADTs by mapping to the next ADT's constructor |

---

## Live Examples

- [Counter with IO](#)
- [Task composition](#)
- [Full effects lab](#)

---

## Documentation

- [Architecture & ADRs](docs/ARCHITECTURE.md) – Flow diagrams and architectural decisions
- [ADT Guide](docs/ADT_GUIDE.md) – Detailed ADT usage examples

---

## Comparison with Other Frameworks

| Feature                    | Algebraic-fx | Elm    | Cycle.js | Hyperapp |
| -------------------------- | ------------ | ------ | -------- | -------- |
| TEA structure              | ✓            | ✓      | ✗        | Partial  |
| Explicit algebraic effects | ✓            | Cmd    | Drivers  | ✗        |
| ADT batteries included     | ✓            | ✗      | ✗        | ✗        |
| Runtime size               | Tiny         | Medium | Medium   | Tiny     |
| JSX requirement            | ✗            | ✗      | Optional | Optional |
| Learning curve             | FP/TEA       | Elm    | FRP      | Low      |

---

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]
