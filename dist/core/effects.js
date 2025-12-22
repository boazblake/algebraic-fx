// src/core/effects.ts
/* ============================================================================
 * Effect system (Cmd + Sub layer)
 * ============================================================================
 *
 * This module defines the **side-effect description layer** of algebraic-fx.
 *
 * IMPORTANT ARCHITECTURAL RULES:
 *
 * - Effects are DATA, not executions
 * - This module is STATELESS
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
 *   ✔ provides Cmd.map / Sub.map equivalents
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
 * @example
 * fx((env, dispatch) => {
 *   const id = setInterval(() => dispatch({ type: "tick" }), 1000)
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
 *
 * Subscription lifecycle is handled by the runtime (`renderApp`).
 */
export const runEffects = (env, dispatch, effects) => {
    if (!effects || effects.length === 0) {
        return () => { };
    }
    const cleanups = [];
    for (const eff of effects) {
        if (!eff)
            continue;
        // Subscriptions are ignored here
        if (isSubscription(eff))
            continue;
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
/* ============================================================================
 * Cmd mapping (Elm Cmd.map)
 * ========================================================================== */
/**
 * Lift a one-shot effect from message type A to B.
 *
 * Equivalent to Elm's `Cmd.map`.
 *
 * MUST NOT be used for Subscriptions.
 */
export const mapCmd = (eff, lift) => {
    // Plain message
    if (typeof eff === "object" && eff !== null && "type" in eff) {
        return lift(eff);
    }
    // IO
    if (eff?.run && eff.run.length === 0) {
        return {
            ...eff,
            run: () => {
                const v = eff.run();
                return v === undefined ? undefined : lift(v);
            },
        };
    }
    // Effect (fx)
    if (eff?.run) {
        return fx((env, dispatch) => eff.run(env, (a) => dispatch(lift(a))));
    }
    return eff;
};
/**
 * Map a list of Cmd-like effects.
 */
export const mapCmds = (effects, lift) => effects.filter((e) => !isSubscription(e)).map((e) => mapCmd(e, lift));
/* ============================================================================
 * Sub mapping (Elm Sub.map)
 * ========================================================================== */
/**
 * Lift a Subscription from message type A to B.
 *
 * Subscription identity (key) is preserved.
 */
export const mapSub = (sub, lift) => ({
    _tag: "Subscription",
    key: sub.key,
    effect: fx((env, dispatch) => sub.effect.run(env, (a) => dispatch(lift(a)))),
});
/**
 * Map a list of Subscriptions.
 */
export const mapSubs = (subs, lift) => subs.map((s) => mapSub(s, lift));
//# sourceMappingURL=effects.js.map