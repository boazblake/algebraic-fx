// src/core/types.ts

/**
 * Core type definitions for algebraic-fx programs and virtual DOM.
 */

import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";
import type { RawEffect } from "./effects.js";

/* ============================================================================
 * Virtual DOM
 * ==========================================================================*/

export type VChild = VNode | string | number | boolean | null | undefined;

export type Props = Record<string, any> & {
  oncreate?: (el: Element) => void;
  onupdate?: (el: Element, oldProps: Props) => void;
  onremove?: (el: Element) => void;
};

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

export type Dispatch<Msg> = (msg: Msg) => void;

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
 *  - init: IO<{ model, effects }>
 *  - update: pure state transition plus follow up effects
 *  - view: pure virtual DOM renderer
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
