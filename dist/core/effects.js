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
 *   ✔ interprets one-shot effects (Cmd)
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
 * ```ts
 * const eff = fx((env, dispatch) => {
 *   const id = env.window.setInterval(() => dispatch({ type: "tick" }), 1000);
 *   return () => env.window.clearInterval(id);
 * });
 * ```
 */
export const fx = (impl) => ({
    [EffectBrand]: true,
    run: impl,
});
/**
 * Construct a Subscription.
 *
 * @param key Stable identity for the subscription.
 */
export const sub = (key, impl) => ({
    _tag: "Subscription",
    key,
    effect: fx(impl),
});
/**
 * Type guard for Subscription.
 */
export const isSubscription = (u) => !!u &&
    typeof u === "object" &&
    u._tag === "Subscription";
/* ============================================================================
 * Type guards (private)
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
export function runEffects(env, a, b) {
    const dispatch = typeof a === "function" ? a : b;
    const effects = typeof a === "function" ? b : a;
    const cleanups = [];
    if (effects && effects.length > 0) {
        for (const eff of effects) {
            if (!eff)
                continue;
            // Subscriptions are ignored at this layer.
            if (isSubscription(eff))
                continue;
            // Effect (unkeyed)
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
            // Reader<IO> | Reader<Task>
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
}
/* ============================================================================
 * Cmd mapping (Elm Cmd.map)
 * ========================================================================== */
/**
 * Lift a one-shot (Cmd-like) RawEffect from message type A to B.
 *
 * Equivalent to Elm's `Cmd.map`.
 *
 * IMPORTANT:
 * - Subscriptions MUST NOT be passed here.
 * - For subscriptions, use `mapSub` / `mapSubs`.
 */
export const mapCmd = (eff, lift) => {
    if (isSubscription(eff)) {
        throw new Error("mapCmd: Subscription is not a Cmd. Use mapSub/mapSubs.");
    }
    // Plain message (assumes common `{ type: string }` shape)
    if (typeof eff === "object" && eff !== null && "type" in eff) {
        return lift(eff);
    }
    // IO
    if (isIO(eff)) {
        const io = eff;
        return {
            ...io,
            run: () => {
                const v = io.run();
                return v === undefined ? undefined : lift(v);
            },
        };
    }
    // Effect
    if (isEffect(eff)) {
        const e = eff;
        return fx((env, dispatch) => e.run(env, (a) => dispatch(lift(a))));
    }
    // Reader / Task: mapping is applied when they resolve to a Msg in runEffects.
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
export const mapSub = (s, lift) => ({
    _tag: "Subscription",
    key: s.key,
    effect: fx((env, dispatch) => s.effect.run(env, (a) => dispatch(lift(a)))),
});
/**
 * Map a list of Subscriptions.
 */
export const mapSubs = (subs, lift) => subs.map((s) => mapSub(s, lift));
//# sourceMappingURL=effects.js.map