// src/core/render.ts

/**
 * Runtime loop wiring Program<M, Msg, Env> to a renderer and environment.
 *
 * Responsibilities:
 *  - run Program.init
 *  - render initial view
 *  - process dispatch(msg) → update → view → effects
 *  - execute RawEffect via interpreter in effects.ts
 */

import type { Program } from "./types.js";
import type { Dispatch } from "./types.js";
import { runEffects } from "./effects.js";

/**
 * Renderer function type.
 *
 * User supplies a function that updates the DOM from a VNode tree.
 */
export type Renderer = (root: Element, vnode: any) => void;

/**
 * Connect Program<M, Msg, Env> to a renderer and environment.
 */
export const renderApp = <M, Msg, Env>(
  root: Element,
  program: Program<M, Msg, Env>,
  env: Env,
  renderer: Renderer
): void => {
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
    const { model, effects } = program.update(msg, currentModel, dispatch);
    currentModel = model;

    const vnode = program.view(currentModel, dispatch);
    renderer(root, vnode);

    runEffects<Env, Msg>(env, dispatch, effects);
  };

  // init
  const initResult = program.init.run();
  currentModel = initResult.model;

  const vnode = program.view(currentModel, dispatch);
  renderer(root, vnode);

  runEffects<Env, Msg>(env, dispatch, initResult.effects);
};
