/**
 * @module core/types
 *
 * Core type definitions for algebraic-fx programs, effects, and virtual DOM.
 *
 * This module defines the foundational building blocks for the
 * algebraic-fx runtime:
 *
 *  - VNode / VChild / Props     — Virtual DOM representation
 *  - Dispatch                   — Message dispatcher type
 *  - Payload<T, M>              — Canonical message shape
 *  - Effect<Env, Msg>           — Primary effect abstraction
 *  - IOEffect / ReaderEffect    — Tagged effect wrappers
 *  - RawEffect<E>               — Union of all valid effect forms
 *  - Program<M, Msg, Env>       — Pure application description
 */

import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";

/* ============================================================================
 * Virtual DOM
 * ==========================================================================*/

/**
 * A VNode child may be:
 *   - A VNode
 *   - A primitive value (string, number)
 *   - A nullable value (ignored by the renderer)
 */
export type VChild = VNode | string | number | boolean | null | undefined;

/**
 * Virtual DOM property bag.
 *
 * These include HTML/SVG attributes, event listeners, and lifecycle hooks.
 */
export type Props = Record<string, any> & {
  /**
   * Called once when the element is created.
   */
  oncreate?: (el: Element) => void;

  /**
   * Called on each patch whenever props change.
   *
   * @param el       the DOM element
   * @param oldProps previous props before the update
   */
  onupdate?: (el: Element, oldProps: Props) => void;

  /**
   * Called before the element is removed from the DOM.
   */
  onremove?: (el: Element) => void;
};

/**
 * The virtual DOM node shape recognized by the algebraic-fx renderer.
 *
 * - `tag`: HTML tag name or "#" for text nodes
 * - `children`: optional list of child nodes
 * - `props`: optional attributes, event handlers, lifecycle hooks
 * - `key`: optional identity for keyed diffing
 * - `dom`: real DOM element reference (populated by renderer)
 */
export type VNode = {
  tag: string;
  props?: Props | null;
  children: VChild[] | null;
  key?: string | number;
  dom?: Node | null;
};

/* ============================================================================
 * Dispatch & Payload
 * ==========================================================================*/

/**
 * Dispatch function type for sending messages into `Program.update`.
 */
export type Dispatch<P> = (payload: P) => void;

/**
 * Canonical tagged-message format for algebraic-fx programs.
 *
 * @typeParam T  A string literal tag (ex: "Holdings.Add").
 * @typeParam M  Message payload (default `{}`).
 *
 * Messages follow a discriminated-union style:
 *
 * ```ts
 * type Msg =
 *   | Payload<"Holdings.Add">
 *   | Payload<"Holdings.SetTicker", { value: string }>;
 *
 * dispatch({ type: "Holdings.SetTicker", msg: { value: "AAPL" } });
 * ```
 */
export type Payload<T extends string, M extends object = {}> = {
  type: T;
  msg: M;
};

/* ============================================================================
 * Effect System
 * ==========================================================================*/

/**
 * Effects describe side-effects in algebraic-fx.
 *
 * They can:
 *   - read from Env (browser APIs, storage, WebSocket, etc.)
 *   - perform synchronous or async work
 *   - optionally emit new Msg values via dispatch
 *   - optionally return a cleanup function
 *
 * The runtime interpreter invokes:
 *
 *   effect.run(env, dispatch)
 *
 * where:
 *   - `env` is the environment given to `renderApp`
 *   - `dispatch` sends follow-up messages into the Program
 */
export interface Effect<Env = unknown, Msg = unknown> {
  run: (
    env: Env,
    dispatch: Dispatch<Msg>
  ) => void | Promise<void> | (() => void) | Promise<() => void>;
}

/* ---------------------------------------------------------------------------
 * fx: ergonomic Effect constructor
 * ---------------------------------------------------------------------------*/

/**
 * Effect construction helper.
 *
 * Produces a concrete `Effect<Env, Msg>` instance while preserving full
 * type inference for:
 *   - `Env` — program environment
 *   - `Msg` — message union for the program
 *   - optional cleanup return value
 *
 * This helper unifies effect creation across your application.
 *
 * ## Example
 *
 * ```ts
 * import { fx } from "algebraic-effects";
 *
 * export const resizeEffect = fx<TVEnv, TVMsg>((env, dispatch) => {
 *   const onResize = () => dispatch({
 *     type: "RESIZE",
 *     msg: {
 *       width: env.window.innerWidth,
 *       height: env.window.innerHeight,
 *     }
 *   });
 *
 *   env.window.addEventListener("resize", onResize);
 *   onResize();
 *
 *   return () => env.window.removeEventListener("resize", onResize);
 * });
 * ```
 */
export const fx = <
  Env,
  Msg,
  Ret extends void | (() => void) = void | (() => void),
>(
  run: (env: Env, dispatch: Dispatch<Msg>) => Ret
): Effect<Env, Msg> => ({ run });

/* ---------------------------------------------------------------------------
 * IOEffect
 * ---------------------------------------------------------------------------*/

/**
 * Unique tag for an IOEffect.
 */
export const IOEffectTag = Symbol("IOEffect");

/**
 * Wraps `IO<void>` as a runtime effect.
 *
 * The interpreter extracts the underlying IO and executes it.
 */
export type IOEffect = {
  _tag: typeof IOEffectTag;
  io: IO<void>;
};

/* ---------------------------------------------------------------------------
 * ReaderEffect
 * ---------------------------------------------------------------------------*/

/**
 * Unique tag for a ReaderEffect.
 */
export const ReaderEffectTag = Symbol("ReaderEffect");

/**
 * Wraps `Reader<Env, IO<void>>` as a runtime effect.
 *
 * The interpreter:
 *   1. Applies the Reader with the current environment.
 *   2. Executes the resulting IO<void>.
 */
export type ReaderEffect<E> = {
  _tag: typeof ReaderEffectTag;
  reader: Reader<E, IO<void>>;
};

/* ---------------------------------------------------------------------------
 * RawEffect<E>
 * ---------------------------------------------------------------------------*/

/**
 * Comprehensive union of all effect representations understood by the runtime.
 *
 * These forms allow a wide range of effect expressions:
 *
 *   - `IO<void>`                   — simple synchronous actions
 *   - `Reader<E, IO<void>>`       — environment-dependent IO
 *   - `Effect<Env, Msg>`          — full effects with `env` + `dispatch`
 *   - `IOEffect`                  — tagged IO wrappers
 *   - `ReaderEffect<E>`           — tagged Reader wrappers
 *
 * Env is threaded automatically by the runtime. Msg is program-specific.
 */
export type RawEffect<E> =
  | IO<void>
  | Reader<E, IO<void>>
  | Effect<E, any>
  | IOEffect
  | ReaderEffect<E>;

/* ============================================================================
 * Program
 * ==========================================================================*/

/**
 * Pure program description for algebraic-fx.
 *
 * A Program consists of:
 *
 *   - `init`: IO returning `{ model, effects }`
 *   - `update`: pure state transition plus follow-up effects
 *   - `view`: pure virtual DOM renderer
 *
 * The runtime calls:
 *
 *   renderApp(root, program, env, renderer)
 *
 * which:
 *   - executes `init`
 *   - interprets returned effects
 *   - renders the initial VNode tree
 *   - listens for dispatched messages
 *   - runs update loops and effects
 *
 * @typeParam M   model type
 * @typeParam Msg message union type
 * @typeParam Env environment threaded through RawEffects
 */
export type Program<M, Msg, Env> = {
  init: IO<{ model: M; effects: RawEffect<Env>[] }>;

  update: (
    msg: Msg,
    model: M,
    dispatch: Dispatch<Msg>
  ) => { model: M; effects: RawEffect<Env>[] };

  view: (model: M, dispatch: Dispatch<Msg>) => VChild | VChild[];
};
