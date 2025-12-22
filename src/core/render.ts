// src/core/render.ts

import type { Program, Dispatch } from "./types.js";
import { runEffects, type Subscription } from "./effects.js";

/* ============================================================================
 * Renderer
 * ========================================================================== */

/**
 * Renderer function.
 *
 * A renderer reconciles a virtual DOM tree into a concrete DOM subtree.
 */
export type Renderer = (root: Element, vnode: any) => void;

/**
 * Cleanup function returned by subscriptions.
 */
type Cleanup = () => void;

/* ============================================================================
 * Subscription reconciliation (stateful, runtime-only)
 * ========================================================================== */

/**
 * reconcileSubscriptions
 *
 * Start/stop keyed subscriptions based on the latest list.
 *
 * - starts new subscriptions
 * - keeps existing subscriptions with the same key
 * - stops subscriptions whose keys disappeared
 *
 * This is the ONLY place subscription lifecycle is managed.
 */
const reconcileSubscriptions = <Env, Msg>(
  env: Env,
  dispatch: Dispatch<Msg>,
  subs: readonly Subscription<Env, Msg>[],
  active: Map<string, Cleanup>
): void => {
  const next = new Map<string, Cleanup>();

  for (const s of subs) {
    const prev = active.get(s.key);

    // already active, keep existing cleanup
    if (prev) {
      next.set(s.key, prev);
      continue;
    }

    // new subscription, start it
    const cleanup = s.effect.run(env, dispatch);
    if (typeof cleanup === "function") next.set(s.key, cleanup);
  }

  // stop removed
  for (const [key, cleanup] of active) {
    if (!next.has(key)) cleanup();
  }

  active.clear();
  for (const [k, v] of next) active.set(k, v);
};

/* ============================================================================
 * renderApp (runtime)
 * ========================================================================== */

/**
 * renderApp
 *
 * Start an algebraic-fx application runtime loop.
 *
 * Responsibilities:
 * - run init once
 * - render view on init and after every update
 * - run Cmd effects returned by init/update via runEffects
 * - manage subscription lifecycle via Program.subs(model)
 *
 * IMPORTANT:
 * - update must be pure (no direct side effects)
 * - all side effects must be described as Cmd effects (init/update)
 * - all long-lived behavior must be described as Subscriptions (subs)
 */
export const renderApp = <M, Msg, Env>(
  root: Element,
  program: Program<M, Msg, Env>,
  env: Env,
  renderer: Renderer
): void => {
  if (!root) throw new TypeError("renderApp: root element is required");
  if (!program) throw new TypeError("renderApp: program is required");
  if (!renderer) throw new TypeError("renderApp: renderer is required");

  if (!program.init || typeof program.init.run !== "function") {
    throw new TypeError("renderApp: program.init must be an IO");
  }
  if (!program.update || typeof program.update !== "function") {
    throw new TypeError("renderApp: program.update must be a function");
  }
  if (!program.view || typeof program.view !== "function") {
    throw new TypeError("renderApp: program.view must be a function");
  }

  let currentModel: M;

  const activeSubs = new Map<string, Cleanup>();

  const render = (): void => {
    renderer(root, program.view(currentModel, dispatch));
  };

  const getSubs = (): Subscription<Env, Msg>[] =>
    program.subs ? program.subs(currentModel) : [];

  const dispatch: Dispatch<Msg> = (msg) => {
    const next = program.update(msg, currentModel, dispatch);
    currentModel = next.model;

    render();

    reconcileSubscriptions(env, dispatch, getSubs(), activeSubs);

    // canonical runEffects call form: (env, dispatch, effects)
    runEffects(env, dispatch, next.effects);
  };

  // init
  const initResult = program.init.run();
  currentModel = initResult.model;

  render();

  reconcileSubscriptions(env, dispatch, getSubs(), activeSubs);

  // canonical runEffects call form: (env, dispatch, effects)
  runEffects(env, dispatch, initResult.effects);
};
