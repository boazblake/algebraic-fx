// src/core/effects.ts
/* ============================================================================
 * Effect system (Cmd + Sub layer)
 * ========================================================================== */
/**
 * Effect system for algebraic-fx.
 *
 * This module defines the **side-effect description layer** of the framework.
 *
 * IMPORTANT ARCHITECTURAL RULES:
 *
 * - Effects are **data**, not executions
 * - This module is **stateless**
 * - Subscription lifecycle is NOT handled here
 *
 * Conceptual split (mirrors Elm):
 *
 *   Cmd  → runEffects (this file)
 *   Sub  → renderApp runtime (stateful)
 *
 * This file:
 *   ✔ defines Effect and Subscription
 *   ✔ interprets one-shot effects
 *   ✘ does NOT track subscriptions
 */
/* ============================================================================
 * Effect
 * ========================================================================== */
/**
 * Internal brand for Effect values.
 *
 * Prevents accidental structural matching.
 */
const EffectBrand = Symbol("EffectBrand");
/**
 * Construct a branded Effect.
 *
 * Hides the internal brand and provides a safe constructor
 * for long-lived effects.
 *
 * @example
 * fx((env, dispatch) => {
 *   const id = setInterval(() => dispatch({ type: "Tick" }), 1000)
 *   return () => clearInterval(id)
 * })
 */
export const fx = (impl) => ({
    [EffectBrand]: true,
    run: impl,
});
/**
 * Construct a Subscription.
 *
 * @param key Stable identity for the subscription
 * @param impl Effect body (may return cleanup)
 *
 * @example
 * sub("clock", (env, dispatch) => {
 *   const id = setInterval(() => dispatch({ type: "Tick" }), 1000)
 *   return () => clearInterval(id)
 * })
 */
export const sub = (key, impl) => ({
    _tag: "Subscription",
    key,
    effect: fx(impl),
});
/**
 * Type guard for Subscription.
 */
export const isSubscription = (u) => !!u && typeof u === "object" && u._tag === "Subscription";
/* ============================================================================
 * Type guards
 * ========================================================================== */
const isEffect = (u) => !!u && typeof u === "object" && u[EffectBrand] === true;
const isTask = (u) => !!u &&
    typeof u === "object" &&
    typeof u.run === "function" &&
    typeof u.runWith === "function";
const isReader = (u) => !!u &&
    typeof u === "object" &&
    typeof u.run === "function" &&
    u.run.length >= 1 &&
    typeof u.runWith !== "function";
const isIO = (u) => !!u &&
    typeof u === "object" &&
    typeof u.run === "function" &&
    u.run.length === 0 &&
    typeof u.runWith !== "function";
/* ============================================================================
 * runEffects (Cmd interpreter)
 * ========================================================================== */
/**
 * Interpret one-shot RawEffects.
 *
 * IMPORTANT:
 * - Subscriptions are IGNORED here
 * - This function is PURE and STATELESS
 * - No lifecycle or diffing occurs
 *
 * Subscription lifecycle is handled by the runtime (`renderApp`).
 *
 * @returns Combined cleanup for Effect values only
 */
export const runEffects = (env, dispatch, effects) => {
    if (!effects || effects.length === 0) {
        return () => { };
    }
    const cleanups = [];
    for (const eff of effects) {
        if (!eff)
            continue;
        // Subscriptions are ignored at this layer
        if (isSubscription(eff)) {
            continue;
        }
        // Effect
        if (isEffect(eff)) {
            const c = eff.run(env, dispatch);
            if (typeof c === "function")
                cleanups.push(c);
            continue;
        }
        // Task
        if (isTask(eff)) {
            eff.run().then((ea) => {
                if (ea && ea._tag === "Right" && ea.right !== undefined) {
                    dispatch(ea.right);
                }
            });
            continue;
        }
        // Reader
        if (isReader(eff)) {
            const inner = eff.run(env);
            if (isIO(inner)) {
                const msg = inner.run();
                if (msg !== undefined)
                    dispatch(msg);
                continue;
            }
            if (isTask(inner)) {
                inner.run().then((ea) => {
                    if (ea && ea._tag === "Right" && ea.right !== undefined) {
                        dispatch(ea.right);
                    }
                });
                continue;
            }
            continue;
        }
        // IO
        if (isIO(eff)) {
            const msg = eff.run();
            if (msg !== undefined)
                dispatch(msg);
            continue;
        }
        // Plain Msg
        dispatch(eff);
    }
    return () => {
        for (const c of cleanups) {
            try {
                c();
            }
            catch {
                /* swallow */
            }
        }
    };
};
//# sourceMappingURL=effects.js.map