

algebraic-fx

Design & Semantics

algebraic-fx is a small, law-checked FP runtime for building UI programs with explicit effects.

Core ingredients:
	•	Algebraic data types (Either, Maybe, Task, Reader, Writer, State, Stream, Validation)
	•	A Program model (init, update, view) with explicit effects
	•	A pure virtual DOM and renderer
	•	An effect interpreter runEffects for IO, Reader, and custom Effect types
	•	A server-side renderer renderToString

All core constructs are unit-tested and property-tested with fast-check.

⸻

1. Core Model: Program

export type Program<M, Msg, Env> = {
  init: IO<{ model: M; effects: RawEffect<Env>[] }>;

  update: (
    msg: Msg,
    model: M,
    dispatch: Dispatch<Msg>
  ) => { model: M; effects: RawEffect<Env>[] };

  view: (model: M, dispatch: Dispatch<Msg>) => VChild | VChild[];
};

1.1. Semantics
	•	init
	•	Pure, lazy IO producing initial model and initial effects.
	•	Executed once at application startup by the runtime.
	•	update
	•	Pure function of (msg, model), except that it can embed follow-up effects in the returned effects array.
	•	Receives dispatch only to be passed into Effect.run instances; update must not call dispatch itself synchronously to avoid re-entrancy and uncontrolled loops.
	•	view
	•	Pure function from (model, dispatch) to a VNode tree (VChild | VChild[]).
	•	The only place dispatch is intended to be used is inside event handler props attached to the VNode tree.

1.2. Invariants
	•	For fixed program, env, renderer, and a fixed sequence of msgs, the sequence of models and VNode trees is deterministic.
	•	update is referentially transparent: same (msg, model) yields same (model', effects) value.
	•	Effects are the only place side effects are allowed; all other code is pure and deterministic.

⸻

2. Virtual DOM

2.1. VNode Shape

export type VChild = VNode | string | number | boolean | null | undefined;

export type Props = Record<string, any> & {
  oncreate?: (el: Element) => void;
  onupdate?: (el: Element, oldProps: Props) => void;
  onremove?: (el: Element) => void;
};

export type VNode = {
  tag: string;           // e.g. "div", "span", "#"
  props?: Props | null;  // attributes / props for client renderer
  children: VChild[] | null;
  key?: string | number; // optional stable key, used by renderer
  dom?: Node | null;     // filled in by client renderer
};

Conventions:
	•	Text nodes: tag === "#" and children === null, with a text property in the renderer’s internal shape (SSR adapts to this).
	•	Boolean / null / undefined children are ignored.
	•	props contains event handlers for browser render; SSR ignores these.

2.2. VDOM Laws
	•	VNode identity is defined by key when present, otherwise by position.
	•	For a given model, view(model, dispatch) must return the same tree on every call (no hidden randomness or IO).

⸻

3. Effects

3.1. RawEffect

export type RawEffect<E> =
  | IO<void>
  | Reader<E, IO<void>>
  | Effect<E, any>
  | IOEffect
  | ReaderEffect<E>;

3.2. Effect Interface

export interface Effect<Env = unknown, Msg = unknown> {
  run: (env: Env, dispatch: Dispatch<Msg>) => void | Promise<void>;
}

	•	Effect.run is the gateway for all side effects: HTTP, timers, websockets, etc.
	•	env is an explicit dependency injection point (e.g. HTTP client, storage, clock).
	•	dispatch is the only way to send messages back into the Program.

3.3. IOEffect / ReaderEffect

export const IOEffectTag = Symbol("IOEffect");
export type IOEffect = { _tag: typeof IOEffectTag; io: IO<void> };

export const ReaderEffectTag = Symbol("ReaderEffect");
export type ReaderEffect<E> = {
  _tag: typeof ReaderEffectTag;
  reader: Reader<E, IO<void>>;
};

	•	IOEffect wraps a pure IO<void> action.
	•	ReaderEffect wraps a Reader<Env, IO<void>>, which is evaluated with env to produce an IO<void>.

3.4. runEffects

export const runEffects = <Env, Msg>(
  effects: RawEffect<Env>[] | undefined,
  env: Env,
  dispatch: Dispatch<Msg>
): void => {
  if (dispatch == null || typeof dispatch !== "function") {
    throw new TypeError("runEffects: dispatch must be a function");
  }
  if (!effects || effects.length === 0) return;

  effects.forEach((effect) => {
    if (!effect) return;

    try {
      if ((effect as IOEffect)._tag === IOEffectTag) {
        (effect as IOEffect).io.run();
        return;
      }

      if ((effect as ReaderEffect<Env>)._tag === ReaderEffectTag) {
        const r = (effect as ReaderEffect<Env>).reader;
        const io = r.run(env);
        io.run();
        return;
      }

      const fx = effect as Effect<Env, Msg>;
      if (fx.run && typeof fx.run === "function") {
        const result = fx.run(env, dispatch);
        if (result && typeof (result as any).catch === "function") {
          (result as Promise<void>).catch((err) => {
            console.error("Effect execution error:", err);
          });
        }
      }
    } catch (err) {
      console.error("Effect execution error:", err);
    }
  });
};

Semantics:
	•	Effects are executed in order.
	•	Falsy entries are ignored.
	•	One misbehaving effect does not prevent subsequent effects from running; errors are logged.
	•	Asynchronous effects are allowed, but their completion is not awaited by the runtime loop.

Laws (checked via fast-check):
	•	runEffects([]) is a no-op.
	•	runEffects(effects ++ []) behaves the same as runEffects(effects).
	•	IOEffect(IO(fn)) calls fn exactly once.
	•	ReaderEffect(reader) calls the underlying IO exactly once per runEffects invocation.
	•	For a well-formed Effect<Env,Msg>, runEffects([{ run: fx.run }], env, dispatch) calls fx.run exactly once.

⸻

4. Runtime: renderApp

export type Renderer = (root: Element, vnode: any) => void;

export const renderApp = <M, Msg, Env>(
  root: Element,
  program: Program<M, Msg, Env>,
  env: Env,
  renderer: Renderer
): void => {
  if (!root) throw new TypeError("renderApp: root element is required");
  if (!program) throw new TypeError("renderApp: program is required");
  if (!program.init || typeof program.init.run !== "function") {
    throw new TypeError("renderApp: program.init must be an IO");
  }
  if (!program.update || typeof program.update !== "function") {
    throw new TypeError("renderApp: program.update must be a function");
  }
  if (!program.view || typeof program.view !== "function") {
    throw new TypeError("renderApp: program.view must be a function");
  }
  if (!renderer || typeof renderer !== "function") {
    throw new TypeError("renderApp: renderer must be a function");
  }

  let currentModel: M;

  const dispatch: Dispatch<Msg> = (msg) => {
    try {
      const { model, effects } = program.update(msg, currentModel, dispatch);
      currentModel = model;

      const vnode = program.view(currentModel, dispatch);
      renderer(root, vnode);

      runEffects<Env, Msg>(effects, env, dispatch);
    } catch (err) {
      console.error("Update/render cycle error:", err);
      throw err;
    }
  };

  const initResult = program.init.run();
  currentModel = initResult.model;

  const vnode = program.view(currentModel, dispatch);
  renderer(root, vnode);

  runEffects<Env, Msg>(initResult.effects, env, dispatch);
};

4.1. Execution Pipeline
	1.	program.init.run()
	•	Produces { model, effects }.
	2.	Initial render
	•	vnode = program.view(model, dispatch).
	•	renderer(root, vnode).
	3.	Initial effects
	•	runEffects(effects, env, dispatch).
	4.	Dispatch loop
	•	On each dispatch(msg):
	•	update(msg, currentModel, dispatch) returns { model', effects' }.
	•	currentModel = model'.
	•	view(currentModel, dispatch) produces new vnode.
	•	renderer(root, vnode).
	•	runEffects(effects', env, dispatch) runs follow-up effects.

4.2. Laws (fast-check invariants)

For a fixed Program, env, and renderer:
	•	Initialization:
	•	renderApp performs exactly one initial render.
	•	Determinism:
	•	Given two roots and two renderers that record their inputs, for any sequence of messages msgs, the recorded render sequences for root1 and root2 are identical when replaying msgs through their respective dispatch functions.

The test style:
	•	Wrap renderer to capture VNode snapshots.
	•	Expose dispatch via a non-mutating backchannel in the test harness (e.g. closure capture).
	•	Replay identical msgs into both dispatches.
	•	Assert renders1 === renders2.

algebraic-fx itself remains pure; only the tests peek at dispatch.

⸻

5. Server-side Rendering: renderToString

import type { Vnode, VnodeChild } from "./mithril-lite.js";

const escapeText = (s: string): string => /* & < > escaping */;
const escapeAttr = (s: string): string => /* &, ", ', <, >, NL, CR, TAB */;

const VOID = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);

export const renderToString = (node: unknown): string => {
  if (node === null || node === false || node === true) return "";
  if (typeof node === "string") return escapeText(node);
  if (typeof node === "number") return escapeText(String(node));

  if (Array.isArray(node)) {
    let out = "";
    for (let i = 0; i < node.length; i++) out += renderToString(node[i]);
    return out;
  }

  if (!isVnode(node)) return "";

  const { tag, attrs, children, text } = node as any;

  if (tag === "#") {
    return text != null ? escapeText(String(text)) : "";
  }

  const rawAttrs: Record<string, unknown> = attrs || {};
  const attrStr = Object.entries(rawAttrs)
    .filter(([k, v]) => {
      if (k === "key") return false;
      if (k.startsWith("on")) return false;
      if (v === null || v === false || v === undefined) return false;
      if (typeof v === "function") return false;
      return true;
    })
    .map(([k, v]) => {
      if (v === true) return k;
      if (k === "style" && typeof v === "object" && v !== null) {
        const styleStr = Object.entries(v as Record<string, any>)
          .filter(([, val]) => val != null)
          .map(([prop, val]) => `${prop}: ${val}`)
          .join("; ");
        return styleStr ? `style="${escapeAttr(styleStr)}"` : "";
      }
      return `${k}="${escapeAttr(String(v))}"`;
    })
    .filter(Boolean)
    .join(" ");

  const open = attrStr ? `<${tag} ${attrStr}>` : `<${tag}>`;
  if (VOID.has(tag)) return open;

  const kids = children || [];
  let inner = "";
  for (let i = 0; i < kids.length; i++) {
    const child = kids[i];
    if (child != null) inner += renderToString(child);
  }

  return `${open}${inner}</${tag}>`;
};

5.1. Semantics
	•	Pure function from vnode tree to HTML string.
	•	Safe:
	•	Text content is escaped.
	•	Attribute values are escaped including control chars.
	•	Event handlers are omitted.
	•	Keys are omitted.
	•	Void elements are rendered without closing tags.

5.2. Laws (fast-check invariants)
	•	JSON round-trip preservation:
	•	For any JSON-serializable vnode tree v:
	•	renderToString(v) === renderToString(JSON.parse(JSON.stringify(v))).
	•	Stability under ignored props:
	•	Event handler props and non-serializable props do not affect the HTML output.

⸻

6. ADT Semantics (high level)

All ADTs follow standard FP semantics and are law-checked:
	•	Either<E, A>:
	•	Right-biased, Functor/Monad/Applicative laws checked.
	•	Maybe<A>:
	•	None/Some, Functor/Monad/Applicative laws checked.
	•	Task<E, A>:
	•	Lazy, abort-aware async, law-checked for map/chain/ap, plus operational tests (delay, timeout, sequence, all, race).
	•	Reader<R, A>:
	•	Environment-passing function, laws checked (map/chain/ap).
	•	Writer<W, A>:
	•	Accumulating monoid W, laws checked: log preservation, associativity, tell/listen behavior.
	•	State<S, A>:
	•	Pure state threading, laws checked: get/put/modify, map/chain, sequence/traverse.
	•	Validation<E, A>:
	•	Error-accumulating validation (semigroup E), laws checked under appropriate combinators.

Each module exposes both method-based and point-free combinators, all aligned with the laws.

⸻

7. Purity and Testing Strategy
	•	Library code is written under the assumption of total purity, except:
	•	Effect.run implementations.
	•	IO boundaries in IO, Task, and Stream.
	•	Vitest covers concrete scenarios.
	•	fast-check covers algebraic laws:
	•	Functor / Applicative / Monad laws.
	•	Identity / associativity / neutrality laws for sequence, traverse, etc.
	•	Runtime invariants for runEffects and renderApp.
	•	SSR stability and safety for renderToString.

⸻
