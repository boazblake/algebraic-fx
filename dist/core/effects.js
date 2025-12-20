// src/core/effects.ts
/**
 * Effect interpreter and runtime side-effect model for algebraic-fx.
 *
 * This module defines:
 *  - the Effect abstraction for long-lived subscriptions
 *  - the RawEffect union type accepted by Program.init and Program.update
 *  - the runtime interpreter for executing effects
 *
 * Effects in algebraic-fx are *descriptions*, not executions.
 * They are returned as data from Programs and interpreted by the runtime.
 */
/**
 * Brand for runtime managed Effect objects.
 */
const EffectBrand = Symbol("EffectBrand");
/**
 * Construct a branded Effect.
 *
 * This helper hides the internal Effect brand and provides a safe way
 * to define long-lived effects such as subscriptions or listeners.
 *
 * The provided implementation is invoked with the runtime environment
 * and dispatch function.
 */
export const fx = (impl) => ({
    [EffectBrand]: true,
    run: impl,
});
/* ------------------------------------------------------------------------- */
/* Type guards                                                               */
/* ------------------------------------------------------------------------- */
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
/* ------------------------------------------------------------------------- */
/* Interpreter                                                               */
/* ------------------------------------------------------------------------- */
/**
 * Interpret a single RawEffect.
 *
 * Execution semantics:
 *  - Msg:
 *      Dispatched immediately.
 *
 *  - IO / Reader<IO>:
 *      Executed synchronously.
 *      Any returned Msg is dispatched.
 *
 *  - Task / Reader<Task>:
 *      Executed asynchronously (fire-and-forget).
 *      Only successful results are dispatched.
 *
 *  - Effect:
 *      Delegated to Effect.run.
 *      May return a cleanup function.
 *
 * Returns a cleanup function only for Effect cases.
 */
export const interpretRawEffect = (env, dispatch, eff) => {
    if (eff == null)
        return;
    // Subscriptions
    if (isEffect(eff)) {
        return eff.run(env, dispatch);
    }
    // Task<E, Msg | void>
    if (isTask(eff)) {
        eff.run().then((ea) => {
            if (ea && ea._tag === "Right" && ea.right !== undefined) {
                dispatch(ea.right);
            }
        });
        return;
    }
    // Reader<Env, IO | Task>
    if (isReader(eff)) {
        const inner = eff.run(env);
        if (isIO(inner)) {
            const msg = inner.run();
            if (msg !== undefined)
                dispatch(msg);
            return;
        }
        if (isTask(inner)) {
            inner.run().then((ea) => {
                if (ea && ea._tag === "Right" && ea.right !== undefined) {
                    dispatch(ea.right);
                }
            });
            return;
        }
        // anything else is ignored
        return;
    }
    // IO<Msg | void>
    if (isIO(eff)) {
        const msg = eff.run();
        if (msg !== undefined)
            dispatch(msg);
        return;
    }
    // Fallback: treat as plain Msg
    dispatch(eff);
};
/**
 * Interpret a list of RawEffects.
 *
 * All effects are executed in order.
 * Cleanup functions returned by Effect values are collected and
 * combined into a single disposer function.
 *
 * The returned disposer invokes all cleanups safely.
 */
export const runEffects = (env, dispatch, effects) => {
    if (!effects || effects.length === 0) {
        return () => { };
    }
    const cleanups = [];
    for (const eff of effects) {
        const c = interpretRawEffect(env, dispatch, eff);
        if (typeof c === "function")
            cleanups.push(c);
    }
    return () => {
        for (const c of cleanups) {
            try {
                c();
            }
            catch {
                // swallow cleanup errors
            }
        }
    };
};
//# sourceMappingURL=effects.js.map