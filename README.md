
# effects-vdom

A tiny TEA-style runtime with explicit algebraic effects over a fast virtual DOM.  
• Pure update. Effects are values. Rendering is a pure function.  
• Batteries included ADTs: IO, Reader, Writer, State, Task, Either, Maybe, Stream, Validation, Id.  
• Works with any DOM. Default renderer uses Mithril VNode factories (h).

**Note on names:** code samples use IO, Reader, … for clarity. If your build publishes lowercase symbols, alias on import:

```ts
import { io as IO, reader as Reader, writer as Writer, h } from "effects-vdom";


⸻

Quick Start

npm install effects-vdom

import { app, h, IO } from "effects-vdom";

type Model = { count: number };
type Msg = { type: "INC" } | { type: "DEC" };

const program = {
  init: IO(() => ({ model: { count: 0 }, effects: [] as any[] })),
  update: (msg: Msg, model: Model) => {
    if (msg.type === "INC") return { model: { count: model.count + 1 } };
    if (msg.type === "DEC") return { model: { count: model.count - 1 } };
    return { model };
  },
  view: (m: Model, dispatch: (msg: Msg) => void) =>
    h("div", {},
      h("h1", {}, String(m.count)),
      h("button", { onclick: () => dispatch({ type: "DEC" }) }, "−"),
      h("button", { onclick: () => dispatch({ type: "INC" }) }, "+"),
    ),
};

app(document.getElementById("app")!, program);


⸻

Philosophy

effects-vdom treats effects as first-class algebraic values. No ambient useEffect, no lifecycle riddles. You model computation with well-studied abstractions. This yields isolation, testability, and composability across UI and non-UI code.

⸻

Why effects-vdom over React/Vue/Solid

• You want TEA semantics: Model + Update + View, effects emitted explicitly.
• You want explicit effect composition across domains without framework magic.
• You want tiny surface area and direct control of scheduling.
• You don’t want component local mutable state scattered across the tree.

Use React/Vue/Solid if you want rich component ecosystems and idiomatic patterns for those frameworks. Use effects-vdom when architecture clarity and explicit effects are your primary goals.

⸻

Decision Tree: which ADT

Need async? → Task
Need dependency injection? → Reader
Need to accumulate logs/events? → Writer
Need local state evolution? → State
Need to handle optional values? → Maybe
Need error branching? → Either
Need continuous events/teardown? → Stream
Need batch validation? → Validation
Just wrap a side effect? → IO

⸻

From simple to composed

1) Basic counter

type Model = { n: number };
type Msg = { type: "INC" } | { type: "DEC" };

export const init = IO(() => ({ model: { n: 0 }, effects: [] as any[] }));

export const update = (msg: Msg, m: Model) => {
  switch (msg.type) {
    case "INC": return { model: { n: m.n + 1 } };
    case "DEC": return { model: { n: m.n - 1 } };
    default:    return { model: m };
  }
};

export const view = (m: Model, dispatch: (msg: Msg) => void) =>
  h("div", {},
    h("h1", {}, String(m.n)),
    h("button", { onclick: () => dispatch({ type: "DEC" }) }, "−"),
    h("button", { onclick: () => dispatch({ type: "INC" }) }, "+"),
  );

2) Counter with IO side effect

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

3) Composing Reader → Task → Writer (correct typing)

type Env = { api: string };
type Err = string;
type Data = { id: string; value: string };

const saveWithLogging =
  (data: Data) =>
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
            task.run().then(([result, logs]) =>
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


⸻

Runtime API

type EffectLike = { run: () => any; cancel?: () => void };

type Program<M, Msg> = {
  init: { run: () => { model: M; effects?: EffectLike[] } };
  update: (msg: Msg, model: M) => { model: M; effects?: EffectLike[] };
  view: (model: M, dispatch: (msg: Msg) => void) => any;
};

declare function app<M, Msg>(root: Element, program: Program<M, Msg>): {
  dispatch: (msg: Msg) => void;
};

• The renderer calls view(model, dispatch) on start and after every update.
• Effects in the effects array are executed post-render.

⸻

ADT reference (quick)

See full guide: docs/ADT_GUIDE.md.
• IO: map, chain, run()
• Reader<R, A>: map, chain, run(env: R)
• Writer<W, A>: map, chain, run(): [A, W], of(a, empty), tell(w)
• State<S, A>: map, chain, run(s: S): [A, S], of(a), get, put
• Task<E, A>: map, chain, run(): Promise<Either<E, A>>
• Either<L, R>: Left(l) | Right(r), helpers map, chain, fold
• Maybe: Just(a) | Nothing, helpers map, chain, withDefault
• Stream: subscribe({next,error?,complete?}), map, chain, of, fromEvent
• Validation<E, A>: Success(a) | Failure(E[]), map, ap, concat

⸻

Troubleshooting

• Effects not running → ensure you returned { model, effects: […] } from update.
• Dispatch not changing UI → verify RAF queue drains; confirm dispatch is used from view.
• Type errors with chained ADTs → ensure each chain returns the same ADT. Convert across ADTs by mapping to the next ADT’s constructor.

⸻

Live Examples

• Counter with IO
• Task composition
• Full effects lab

⸻

Architecture and ADRs

See docs/ARCHITECTURE.md for full diagrams and decisions.

⸻

docs/ARCHITECTURE.md

Architecture

High-level flow

flowchart TD
  UI[User Interaction] --> D[dispatch(msg)]
  D --> U[update(msg, model)]
  U -->|returns| M{model}
  U -->|returns| FX[effects[]]

  M --> R[render(view(model))]
  FX --> X1[run effect 1]
  FX --> X2[run effect 2]
  FX --> XN[run effect N]

  X1 -. may call .-> D
  X2 -. may call .-> D
  XN -. may call .-> D

RAF queue and render loop

sequenceDiagram
  participant User
  participant View
  participant Runtime
  participant Update
  User->>View: clicks button
  View->>Runtime: dispatch({type:"INC"})
  Runtime->>Runtime: enqueue msg, schedule RAF
  Runtime->>Update: update(msg, model)
  Update-->>Runtime: { model', effects }
  Runtime->>View: render(view(model'))
  Runtime->>Runtime: run effects
  Note over Runtime: effects may dispatch follow-up msgs

Effects relationship

flowchart TD
  subgraph Algebraic Effects
    IO
    Reader
    Writer
    State
    Task
    Either
    Maybe
    Stream
    Validation
    Id
  end

  Update -->|compose| Algebraic Effects
  Algebraic Effects -->|materialize| EffectsQueue
  EffectsQueue -->|run()| SideEffects


⸻

ADRs

ADR-001: TEA structure
• Context: predictable UI and testable logic.
• Decision: adopt Model + Update + View with explicit effects.
• Consequence: minimal runtime and clear effect boundaries.

ADR-002: Use ADTs for effects
• Context: share effect composition across UI and services.
• Decision: effects are values built with ADTs; no implicit lifecycles.
• Consequence: testable, composable, deterministic updates.

ADR-003: VDOM choice
• Context: fast, simple vnode creation without heavyweight component models.
• Decision: use Mithril-style h and renderer.
• Consequence: small surface area, easy interop, SSR-friendly vnode shape.

ADR-004: Scheduling
• Context: avoid re-entrant updates and layout thrash.
• Decision: single RAF queue. Batch all dispatches within a frame.
• Consequence: stable, predictable render cadence.

⸻

docs/ADT_GUIDE.md

ADT Guide

This guide shows practical usage. For full source, see src/adt/.

Import note:

import { io as IO, reader as Reader, writer as Writer, state as State, task as Task, either as Either, maybe as Maybe, stream as Stream, validation as Validation, id as Id } from "effects-vdom";


⸻

IO

Purpose: Defer a side effect.

API: map, chain, run()

const readTime = IO(() => new Date().toISOString());
const logTime = readTime.map((t) => `time=${t}`).chain((line) => IO(() => console.log(line)));

logTime.run();


⸻

Reader<R, A>

Purpose: Dependency injection via environment.

API: map, chain, run(env: R)

type Env = { api: string };

const buildUrl = Reader<Env, string>((env) => `${env.api}/status`);
const withSuffix = buildUrl.map((u) => u + "?v=1");

const url = withSuffix.run({ api: "https://example.com" });


⸻

Writer<W, A>

Purpose: Accumulate logs alongside a value.

API: map, chain, run(): [A, W], of(a, empty), tell(w)

const w0 = Writer.of<number[], number>(0, []);
const w1 = w0.chain((n) => Writer(() => [n + 1, [ "inc" ]]));
const [val, logs] = w1.run(); // val=1, logs=["inc"]


⸻

State<S, A>

Purpose: Thread evolving state through pure transforms.

API: map, chain, run(s: S): [A, S], of(a), get, put

const inc = State<number, number>((s) => [s + 1, s + 1]);
const double = State<number, number>((s) => [s * 2, s * 2]);

const program = inc.chain(() => double);
const [val, s2] = program.run(1); // val=4, s2=4


⸻

Task<E, A>

Purpose: Async with typed errors.

API: map, chain, run(): Promise<Either<E, A>>

type Err = string;

const fetchText = Task<Err, string>(() =>
  fetch("/ping").then((r) => (r.ok ? r.text().then(Right) : Left("http")))
);

fetchText.run().then((ea) =>
  ea._tag === "Right" ? console.log(ea.right) : console.error(ea.left)
);


⸻

Either<L, R>

Purpose: Branch on success or failure without throwing.

Values: Left(l) | Right(r)

const safeDiv = (a: number, b: number) =>
  b === 0 ? Left("div by zero") : Right(a / b);

const res = safeDiv(10, 2).map((x) => x * 3); // Right(15)


⸻

Maybe

Purpose: Optional values without null.

Values: Just(a) | Nothing

const head = <A>(xs: A[]) => (xs.length ? Just(xs[0]) : Nothing);
const out = head([1,2,3]).map((x) => x + 1); // Just(2)


⸻

Stream

Purpose: Push sequence with teardown.

API: subscribe({next,error?,complete?}), map, chain, of, fromEvent

const ticker = Stream<number>((observer) => {
  let n = 0;
  const id = setInterval(() => observer.next(n++), 500);
  return { unsubscribe: () => clearInterval(id) };
});

const sub = ticker.map((n) => n * 2).subscribe({ next: (x) => console.log(x) });
// sub.unsubscribe() later


⸻

Validation<E, A>

Purpose: Accumulate multiple errors.

Values: Success(a) | Failure(E[])

const nonEmpty = (s: string) => (s ? Validation.Success(s) : Validation.Failure(["required"]));
const emailLike = (s: string) => (/@/.test(s) ? Validation.Success(s) : Validation.Failure(["email"]));

const result = Validation.ap(
  Validation.map((_: string) => (x: string) => x, nonEmpty("a@b")),
  emailLike("a@b")
);
// Success("a@b")


⸻

Id

Purpose: Identity, useful for uniform interfaces.

const start = Id.of(2);
const out = start.map((x) => x + 3).chain((x) => Id.of(x * 2)); // Id(10)


⸻

Cross-ADT Composition: Reader → Task → Writer

type Env = { api: string };
type Err = string;
type Data = { id: string; value: string };

const saveWithLogging =
  (data: Data) =>
    Reader<Env, Task<Err, [Either<Err, void>, string[]]>>((env) =>
      Task(() =>
        fetch(env.api, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        }).then((r) => (r.ok ? Right<void>(undefined) : Left<Err>("Save failed")))
      ).map((result) => {
        const log = `Saved at ${new Date().toISOString()}`;
        return [result, [log]];
      })
    );


⸻

Troubleshooting

• Effect didn’t run → ensure it is returned in effects from update.
• Nothing re-rendered → confirm you used dispatch from view, not a captured stale one.
• chain type mismatches → the callback must return the same ADT. Convert across ADTs with a map that constructs the next ADT explicitly.

⸻

Comparisons

Feature	effects-vdom	Elm	Cycle.js	Hyperapp
TEA structure	Yes	Yes	No	Partial
Explicit algebraic effects	Yes	Cmd	Drivers	No
ADT batteries included	Yes	No	No	No
Runtime size surface	Tiny	Medium	Medium	Tiny
JSX requirement	No	No	Optional	Optional
Learning curve	FP/TEA	Elm	FRP	Low


⸻

Links

• Architecture: docs/ARCHITECTURE.md
• Guide: docs/ADT_GUIDE.md
• Examples:
• Counter with IO
• Task composition
• Effects lab


