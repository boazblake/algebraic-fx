/**
 * @module core/types
 *
 * Core type definitions for algebraic-fx programs, effects, and virtual DOM.
 *
 * Defines:
 *  - VNode / VChild / Props
 *  - Dispatch
 *  - Payload<T, M>
 *  - Effect<Env, Msg>
 *  - IOEffect / ReaderEffect / RawEffect<E>
 *  - Program<M, Msg, Env>
 */

import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";

/* ============================================================================
 * Virtual DOM
 * ==========================================================================*/

/**
 * Union of all possible VNode child types.
 *
 * Children may be:
 *   - VNode
 *   - string / number
 *   - boolean / null / undefined (ignored)
 */
export type VChild = VNode | string | number | boolean | null | undefined;

/**
 * Attributes and event handlers for VNode props.
 */
export type Props = Record<string, any> & {
  oncreate?: (el: Element) => void;
  onupdate?: (el: Element, oldProps: Props) => void;
  onremove?: (el: Element) => void;
};

/**
 * Virtual DOM node.
 *
 * @property tag      tag name or "#" for text node
 * @property props    attributes / props
 * @property children child vnodes
 * @property key      stable identity for keyed diffing
 * @property dom      real DOM node reference (set by renderer)
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
 * Dispatch function for sending messages into Program.update.
 */
export type Dispatch<P> = (payload: P) => void;

/**
 * Canonical message shape.
 *
 * @typeParam T   string literal type tag, recommend namespacing: "Holdings.Add"
 * @typeParam M   payload record for this message, defaults to {}
 *
 * Example:
 *
 *   type Msg =
 *     | Payload<"Holdings.Add">
 *     | Payload<"Holdings.SetTicker", { value: string }>;
 *
 *   dispatch({ type: "Holdings.SetTicker", msg: { value: "AAPL" } });
 */
export type Payload<T extends string, M extends object = {}> = {
  type: T;
  msg: M;
};

/* ============================================================================
 * Effect System
 * ==========================================================================*/

/**
 * Effect<Env, Msg>
 *
 * The primary abstraction for side effects in algebraic-fx.
 *
 * Effect responsibilities:
 *   - read from Env (HTTP, storage, etc.)
 *   - perform asynchronous work
 *   - emit follow-up Msg values via dispatch
 *
 * The runtime calls:
 *
 *   effect.run(env, dispatch)
 *
 * @typeParam Env environment type
 * @typeParam Msg message union type for the Program
 */
export interface Effect<Env = unknown, Msg = unknown> {
  run: (env: Env, dispatch: Dispatch<Msg>) => void | Promise<void>;
}

/**
 * Tagged IO wrapper for scheduling IO<void> as a runtime effect.
 */
export const IOEffectTag = Symbol("IOEffect");

/**
 * IOEffect wraps an IO<void>.
 */
export type IOEffect = {
  _tag: typeof IOEffectTag;
  io: IO<void>;
};

/**
 * Tagged Reader wrapper for scheduling Reader<Env,IO<void>> as an effect.
 */
export const ReaderEffectTag = Symbol("ReaderEffect");

/**
 * ReaderEffect wraps Reader<Env, IO<void>>.
 */
export type ReaderEffect<E> = {
  _tag: typeof ReaderEffectTag;
  reader: Reader<E, IO<void>>;
};

/**
 * Construct an IOEffect from IO<void>.
 */
export const ioEffect = (io: IO<void>): IOEffect => ({
  _tag: IOEffectTag,
  io,
});

/**
 * Construct a ReaderEffect from Reader<Env, IO<void>>.
 */
export const readerEffect = <E>(
  reader: Reader<E, IO<void>>
): ReaderEffect<E> => ({
  _tag: ReaderEffectTag,
  reader,
});

/**
 * RawEffect<E>
 *
 * Normalized effect representation understood by the runtime:
 *   - IO<void>
 *   - Reader<E, IO<void>>
 *   - Effect<Env, Msg>
 *   - IOEffect
 *   - ReaderEffect<E>
 *
 * Env is threaded by the runtime, Msg is program-specific.
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
 * Pure functional application description.
 *
 * init:
 *   IO<{ model; effects }>
 *
 * update:
 *   (msg, model, dispatch) => { model; effects }
 *
 * view:
 *   (model, dispatch) => vnode
 *
 * @typeParam M   model type
 * @typeParam Msg message union type
 * @typeParam Env environment type used by Reader and Effect
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
