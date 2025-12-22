import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";
import type { Task } from "../adt/task.js";
import type { Dispatch } from "./types.js";
/**
 * Internal brand for Effect values.
 *
 * Prevents accidental structural matching.
 */
declare const EffectBrand: unique symbol;
/**
 * Effect<Env, Msg>
 *
 * A long-lived, runtime-invoked side effect.
 *
 * Effects represent ongoing processes such as:
 *  - timers
 *  - event listeners
 *  - polling loops
 *
 * Effects:
 *  - are started by the runtime
 *  - receive `env` and `dispatch`
 *  - may return a cleanup function
 *
 * NOTE:
 * `Effect` values are allowed as Cmd-like results from `init`/`update`.
 * If you want keyed lifecycle management, wrap an Effect in a `Subscription`.
 */
export interface Effect<Env, Msg> {
    readonly [EffectBrand]: true;
    run(env: Env, dispatch: Dispatch<Msg>): void | (() => void);
}
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
export declare const fx: <Env, Msg>(impl: (env: Env, dispatch: Dispatch<Msg>) => void | (() => void)) => Effect<Env, Msg>;
/**
 * Subscription<Env, Msg>
 *
 * A keyed, long-lived Effect whose lifecycle is managed by the runtime.
 *
 * Subscriptions:
 *  - persist across renders
 *  - are started once per key
 *  - are cleaned up automatically when removed
 *
 * Mirrors Elm's `Sub`.
 */
export type Subscription<Env, Msg> = {
    readonly _tag: "Subscription";
    readonly key: string;
    readonly effect: Effect<Env, Msg>;
};
/**
 * Construct a Subscription.
 *
 * @param key Stable identity for the subscription.
 */
export declare const sub: <Env, Msg>(key: string, impl: (env: Env, dispatch: Dispatch<Msg>) => void | (() => void)) => Subscription<Env, Msg>;
/**
 * Type guard for Subscription.
 */
export declare const isSubscription: <Env, Msg>(u: unknown) => u is Subscription<Env, Msg>;
/**
 * RawEffect<Env, Msg>
 *
 * The complete set of values that may be returned from `init` or `update`.
 *
 * Categories:
 *
 * Cmd-like (one-shot):
 *  - Msg
 *  - IO<Msg | void>
 *  - Reader<Env, IO<Msg | void>>
 *  - Task<E, Msg | void>
 *  - Reader<Env, Task<E, Msg | void>>
 *  - Effect<Env, Msg>
 *
 * Sub-like (long-lived, runtime-managed):
 *  - Subscription<Env, Msg>
 */
export type RawEffect<Env, Msg> = Msg | IO<Msg | void> | Reader<Env, IO<Msg | void>> | Task<unknown, Msg | void> | Reader<Env, Task<unknown, Msg | void>> | Effect<Env, Msg> | Subscription<Env, Msg>;
/**
 * Interpret Cmd-like RawEffects.
 *
 * IMPORTANT:
 * - Subscriptions are IGNORED here
 * - This function is PURE and STATELESS
 * - Subscription lifecycle is handled by the runtime (`renderApp`)
 *
 * Canonical call form:
 *   runEffects(env, dispatch, effects)
 *
 * @returns A disposer that runs all collected cleanup functions from Effects.
 */
export declare function runEffects<Env, Msg>(env: Env, dispatch: Dispatch<Msg>, effects: readonly RawEffect<Env, Msg>[] | undefined): () => void;
/**
 * Compatibility overload:
 *   runEffects(env, effects, dispatch)
 *
 * This keeps older call sites/benchmarks working without changing semantics.
 */
export declare function runEffects<Env, Msg>(env: Env, effects: readonly RawEffect<Env, Msg>[] | undefined, dispatch: Dispatch<Msg>): () => void;
/**
 * Lift a one-shot (Cmd-like) RawEffect from message type A to B.
 *
 * Equivalent to Elm's `Cmd.map`.
 *
 * IMPORTANT:
 * - Subscriptions MUST NOT be passed here.
 * - For subscriptions, use `mapSub` / `mapSubs`.
 */
export declare const mapCmd: <Env, A, B>(eff: RawEffect<Env, A>, lift: (a: A) => B) => RawEffect<Env, B>;
/**
 * Map a list of Cmd-like effects.
 */
export declare const mapCmds: <Env, A, B>(effects: readonly RawEffect<Env, A>[], lift: (a: A) => B) => RawEffect<Env, B>[];
/**
 * Lift a Subscription from message type A to B.
 *
 * Subscription identity (key) is preserved.
 */
export declare const mapSub: <Env, A, B>(s: Subscription<Env, A>, lift: (a: A) => B) => Subscription<Env, B>;
/**
 * Map a list of Subscriptions.
 */
export declare const mapSubs: <Env, A, B>(subs: readonly Subscription<Env, A>[], lift: (a: A) => B) => Subscription<Env, B>[];
export {};
//# sourceMappingURL=effects.d.ts.map