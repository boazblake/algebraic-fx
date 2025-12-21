// src/core/render.ts
import { runEffects, isSubscription, } from "./effects.js";
/* ============================================================================
 * Subscription reconciliation
 * ========================================================================== */
/**
 * Reconcile subscription effects.
 *
 * This function:
 *  - starts new subscriptions
 *  - keeps existing subscriptions with the same key
 *  - cleans up removed subscriptions
 *
 * IMPORTANT:
 * - This function is IMPERATIVE and STATEFUL
 * - It is ONLY called from the runtime
 * - It must NOT execute one-shot effects
 *
 * @param env Runtime environment
 * @param dispatch Message dispatcher
 * @param effects Effects returned from init/update
 * @param active Map of currently active subscriptions
 */
const reconcileSubscriptions = (env, dispatch, effects, active) => {
    const next = new Map();
    for (const eff of effects) {
        if (!isSubscription(eff))
            continue;
        const prev = active.get(eff.key);
        // Subscription already active → keep it
        if (prev) {
            next.set(eff.key, prev);
            continue;
        }
        // New subscription → start it
        const cleanup = eff.effect.run(env, dispatch);
        if (typeof cleanup === "function") {
            next.set(eff.key, cleanup);
        }
    }
    // Stop subscriptions that disappeared
    for (const [key, cleanup] of active) {
        if (!next.has(key)) {
            cleanup();
        }
    }
    active.clear();
    for (const [k, v] of next)
        active.set(k, v);
};
/* ============================================================================
 * renderApp
 * ========================================================================== */
/**
 * Start an algebraic-fx application.
 *
 * This is the **only imperative runtime loop** in the framework.
 *
 * Responsibilities:
 *  - execute `Program.init` exactly once
 *  - render the initial view
 *  - handle `dispatch(msg)` → update → view
 *  - interpret one-shot effects (Cmd)
 *  - manage subscription lifecycle (Sub)
 *
 * IMPORTANT SEMANTICS:
 *  - `renderApp` is NOT curried
 *  - `renderApp` does NOT return an IO
 *  - the runtime starts immediately
 *
 * Subscription semantics (Elm-style):
 *  - subscriptions are keyed
 *  - started once per key
 *  - cleaned up automatically when removed
 *
 * @param root Root DOM element
 * @param program Application Program definition
 * @param env Runtime environment
 * @param renderer Virtual DOM renderer
 */
export const renderApp = (root, program, env, renderer) => {
    if (!root)
        throw new TypeError("renderApp: root element is required");
    if (!program)
        throw new TypeError("renderApp: program is required");
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
    let currentModel;
    // Active subscriptions keyed by id
    const activeSubs = new Map();
    /**
     * Dispatch a message into the runtime.
     *
     * This function:
     *  - runs update
     *  - updates the model
     *  - renders the view
     *  - reconciles subscriptions
     *  - runs one-shot effects
     */
    const dispatch = (msg) => {
        const { model, effects } = program.update(msg, currentModel, dispatch);
        currentModel = model;
        // Render view
        renderer(root, program.view(currentModel, dispatch));
        // 1) Reconcile subscriptions (stateful)
        reconcileSubscriptions(env, dispatch, effects, activeSubs);
        // 2) Run one-shot effects (stateless)
        const oneShots = effects.filter((e) => !isSubscription(e));
        runEffects(env, dispatch, oneShots);
    };
    /* ------------------------------------------------------------------------
     * Initialization
     * ---------------------------------------------------------------------- */
    const initResult = program.init.run();
    currentModel = initResult.model;
    renderer(root, program.view(currentModel, dispatch));
    reconcileSubscriptions(env, dispatch, initResult.effects, activeSubs);
    const initOneShots = initResult.effects.filter((e) => !isSubscription(e));
    runEffects(env, dispatch, initOneShots);
};
//# sourceMappingURL=render.js.map