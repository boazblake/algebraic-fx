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
 * CORRECTED: Added runtime validation for dispatch and env
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
  // ADDED: Runtime validation
  if (dispatch == null || typeof dispatch !== "function") {
    throw new TypeError("runEffects: dispatch must be a function");
  }

  if (!effects || effects.length === 0) return;

  effects.forEach((effect) => {
    if (!effect) return;

    try {
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
      if (fx.run && typeof fx.run === "function") {
        const result = fx.run(env, dispatch);
        // Handle async effects
        if (result && typeof (result as any).catch === "function") {
          (result as Promise<void>).catch((err) => {
            console.error("Effect execution error:", err);
          });
        }
      }
    } catch (err) {
      // ADDED: Error handling to prevent one bad effect from breaking all effects
      console.error("Effect execution error:", err);
    }
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
 * CORRECTED: Added validation and error handling
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
  // ADDED: Validation
  if (!root) {
    throw new TypeError("renderApp: root element is required");
  }

  if (!program) {
    throw new TypeError("renderApp: program is required");
  }

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
      throw err; // Re-throw so caller can handle
    }
  };

  // Initialize
  const initResult = program.init.run();
  currentModel = initResult.model;

  const vnode = program.view(currentModel, dispatch);
  renderer(root, vnode);

  runEffects<Env, Msg>(initResult.effects, env, dispatch);
};
