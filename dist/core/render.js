// src/core/render.ts
import { runEffects } from "./effects.js";
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
const reconcileSubscriptions = (env, dispatch, subs, active) => {
    const next = new Map();
    for (const s of subs) {
        const prev = active.get(s.key);
        // already active, keep existing cleanup
        if (prev) {
            next.set(s.key, prev);
            continue;
        }
        // new subscription, start it
        const cleanup = s.effect.run(env, dispatch);
        if (typeof cleanup === "function")
            next.set(s.key, cleanup);
    }
    // stop removed
    for (const [key, cleanup] of active) {
        if (!next.has(key))
            cleanup();
    }
    active.clear();
    for (const [k, v] of next)
        active.set(k, v);
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
export const renderApp = (root, program, env, renderer) => {
    if (!root)
        throw new TypeError("renderApp: root element is required");
    if (!program)
        throw new TypeError("renderApp: program is required");
    if (!renderer)
        throw new TypeError("renderApp: renderer is required");
    if (!program.init || typeof program.init.run !== "function") {
        throw new TypeError("renderApp: program.init must be an IO");
    }
    if (!program.update || typeof program.update !== "function") {
        throw new TypeError("renderApp: program.update must be a function");
    }
    if (!program.view || typeof program.view !== "function") {
        throw new TypeError("renderApp: program.view must be a function");
    }
    let currentModel;
    const activeSubs = new Map();
    const render = () => {
        renderer(root, program.view(currentModel, dispatch));
    };
    const getSubs = () => program.subs ? program.subs(currentModel) : [];
    const dispatch = (msg) => {
        const next = program.update(msg, currentModel, dispatch);
        currentModel = next.model;
        render();
        reconcileSubscriptions(env, dispatch, getSubs(), activeSubs);
        // runEffects signature is (env, effects, dispatch)
        runEffects(env, next.effects, dispatch);
    };
    // init
    const initResult = program.init.run();
    currentModel = initResult.model;
    render();
    reconcileSubscriptions(env, dispatch, getSubs(), activeSubs);
    // runEffects signature is (env, effects, dispatch)
    runEffects(env, initResult.effects, dispatch);
};
//# sourceMappingURL=render.js.map