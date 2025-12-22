// src/core/types.ts

/**
 * Core public types for algebraic-fx.
 *
 * This module defines the fundamental contracts used by applications:
 *  - virtual DOM node shapes
 *  - message dispatch
 *  - the Program interface
 *
 * These types describe pure data and functions only.
 * No runtime behavior is defined here.
 */

import type { IO } from "../adt/io.js";
import type { RawEffect, Subscription } from "./effects.js";

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
 * This type is not required by the runtime, but can be used by applications
 * that prefer structured message envelopes.
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
 * A Program is not executed directly. It is a declarative specification
 * interpreted by the algebraic-fx runtime (`renderApp`).
 *
 * Semantics Summary:
 *
 *  - `init`  → initial Cmd-like effects
 *  - `update` → Cmd-like effects after each state transition
 *  - `subs`  → long-lived Sub-like effects (keyed subscriptions)
 *  - `view`  → pure rendering
 *
 * Programs never run effects themselves.
 * The runtime owns:
 *  - effect execution
 *  - subscription lifetimes
 *  - cleanup
 */
export type Program<M, Msg, Env> = {
  /**
   * init
   *
   * Executed exactly once by the runtime at application startup.
   *
   * Returns:
   *  - initial model
   *  - initial Cmd effects
   */
  init: IO<{ model: M; effects: RawEffect<Env, Msg>[] }>;

  /**
   * update
   *
   * Pure state transition:
   *
   *   (msg, model, dispatch) -> { model, effects }
   *
   * MUST NOT perform side effects directly.
   * Instead, it returns a list of Cmd-like `RawEffect` descriptions.
   */
  update: (
    msg: Msg,
    model: M,
    dispatch: Dispatch<Msg>
  ) => { model: M; effects: RawEffect<Env, Msg>[] };

  /**
   * view
   *
   * Pure rendering:
   *
   *   (model, dispatch) -> VNode (or children)
   */
  view: (model: M, dispatch: Dispatch<Msg>) => VChild | VChild[];

  /**
   * subs (optional)
   *
   * Declare long-lived subscriptions derived from the current model.
   *
   * Subscriptions:
   *  - are keyed
   *  - persist across renders
   *  - are started/stopped by the runtime
   *
   * If omitted, the program has no subscriptions.
   */
  subs?: (model: M) => Subscription<Env, Msg>[];
};
