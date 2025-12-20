// src/core/types.ts

/**
 * Core public types for algebraic-fx.
 *
 * This module defines the fundamental contracts used by applications:
 *  - virtual DOM node shapes
 *  - message dispatch
 *  - the Program interface
 *
 * These types describe *pure data and functions* only.
 * No runtime behavior is defined here.
 */

import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";
import type { RawEffect } from "./effects.js";

/* ============================================================================
 * Virtual DOM
 * ==========================================================================*/
/**
 * A virtual DOM child node.
 *
 * Children may be:
 *  - VNode objects
 *  - primitive values (string / number)
 *  - boolean, null, or undefined (ignored by the renderer)
 */
export type VChild = VNode | string | number | boolean | null | undefined;
/**
 * Element attributes and properties.
 *
 * Special lifecycle hooks are optional and renderer-specific.
 */
export type Props = Record<string, any> & {
  oncreate?: (el: Element) => void;
  onupdate?: (el: Element, oldProps: Props) => void;
  onremove?: (el: Element) => void;
};

/**
 * Virtual DOM node representation.
 *
 * This structure is produced by hyperscript helpers (e.g. `m`)
 * and consumed by renderers.
 *
 * Fields:
 *  - tag: element tag name (or "#" for text nodes)
 *  - props: attributes and properties
 *  - children: child nodes
 *  - key: optional stable identity for keyed diffing
 *  - dom: renderer-managed reference to the real DOM node
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
 * Dispatch function used to send messages into the runtime.
 *
 * Calling dispatch schedules a state transition via Program.update.
 */
export type Dispatch<Msg> = (msg: Msg) => void;
/**
 * Optional helper shape for tagged messages.
 *
 * This type is not required by the runtime, but can be used
 * by applications that prefer structured message envelopes.
 */
export type Payload<T extends string, M extends object = {}> = {
  type: T;
  msg: M;
};

/* ============================================================================
 * Program
 * ==========================================================================*/

/**
 * Program<M, Msg, Env>
 *
 * A pure description of an application.
 *
 * A Program consists of:
 *
 *  - init:
 *      An IO that produces the initial model and initial effects.
 *
 *  - update:
 *      A pure function that transforms (Msg, Model) into:
 *        - a new Model
 *        - a list of RawEffect values
 *
 *  - view:
 *      A pure function that renders the Model into a virtual DOM tree.
 *
 * Programs do not perform effects directly.
 * All effects are described as data and interpreted by the runtime.
 */
export type Program<M, Msg, Env> = {
  init: IO<{ model: M; effects: RawEffect<Env, Msg>[] }>;

  update: (
    msg: Msg,
    model: M,
    dispatch: Dispatch<Msg>
  ) => { model: M; effects: RawEffect<Env, Msg>[] };

  view: (model: M, dispatch: Dispatch<Msg>) => VChild | VChild[];
};
