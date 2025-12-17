// src/core/effects.ts
/**
 * Brand for runtime managed Effect objects.
 */
const EffectBrand = Symbol("EffectBrand");
/**
 * Helper to construct an Effect without exposing the brand.
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
 * Interpret a single RawEffect:
 *  - synchronously for IO / Reader<IO>
 *  - fire and forget for Task / Reader<Task>
 *  - delegate to Effect.run for subscriptions
 *  - if given a plain Msg, dispatches it directly
 *
 * Returns a cleanup function only for Effect cases; all others return void.
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
 * Interpret an array of RawEffects.
 * Any cleanup function from subscription effects is returned as a combined disposer.
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