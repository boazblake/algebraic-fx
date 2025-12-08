/**
 * @module core/render
 *
 * Runtime loop wiring Program<M,Msg,Env> to a renderer and environment.
 *
 * Responsibilities:
 *  - run Program.init
 *  - render initial view
 *  - process dispatch(msg) → update → view → effects
 *  - execute RawEffect<Env> via Effect<Env,Msg>, IO, Reader
 */

import type {
  Program,
  RawEffect,
  IOEffect,
  ReaderEffect,
  Effect,
  Dispatch,
} from "./types.js";
import { IOEffectTag, ReaderEffectTag } from "./types.js";
import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";

/**
 * Renderer function type.
 *
 * User supplies a function that updates the DOM from a VNode tree.
 */
export type Renderer = (root: Element, vnode: any) => void;

/**
 * Execute a list of RawEffect<Env> against the current environment.
 *
 * Supported forms:
 *   - IOEffect
 *   - ReaderEffect<Env>
 *   - Effect<Env,Msg>
 *
 * @param effects  list of effects to run
 * @param env      environment for Readers and Effects
 * @param dispatch dispatch function for messages emitted by Effects
 */
export const runEffects = <Env, Msg>(
  effects: RawEffect<Env>[] | undefined,
  env: Env,
  dispatch: Dispatch<Msg>
): void => {
  effects?.forEach((effect) => {
    if (!effect) return;

    // IOEffect
    if ((effect as IOEffect)._tag === IOEffectTag) {
      (effect as IOEffect).io.run();
      return;
    }

    // ReaderEffect
    if ((effect as ReaderEffect<Env>)._tag === ReaderEffectTag) {
      const r = (effect as ReaderEffect<Env>).reader as Reader<Env, IO<void>>;
      const io = r.run(env);
      io.run();
      return;
    }

    // Effect<Env,Msg>
    const fx = effect as Effect<Env, Msg>;
    fx.run(env, dispatch);
  });
};

/**
 * Connect Program<M,Msg,Env> to a renderer and environment.
 *
 * Flow:
 *   1. Run program.init
 *   2. Render initial view
 *   3. Run initial effects
 *   4. Return closed-over dispatch for user events
 *
 * @param root     DOM root element
 * @param program  functional program
 * @param env      environment passed to effects
 * @param renderer renderer function
 */
export const renderApp = <M, Msg, Env>(
  root: Element,
  program: Program<M, Msg, Env>,
  env: Env,
  renderer: Renderer
): void => {
  let currentModel: M;

  const dispatch: Dispatch<Msg> = (msg) => {
    const { model, effects } = program.update(msg, currentModel, dispatch);
    currentModel = model;

    const vnode = program.view(currentModel, dispatch);
    renderer(root, vnode);

    runEffects<Env, Msg>(effects, env, dispatch);
  };

  const initResult = program.init.run();
  currentModel = initResult.model;

  const vnode = program.view(currentModel, dispatch);
  renderer(root, vnode);

  runEffects<Env, Msg>(initResult.effects, env, dispatch);
};
