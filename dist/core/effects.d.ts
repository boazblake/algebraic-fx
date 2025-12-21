import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";
import type { Task } from "../adt/task.js";
import type { Dispatch } from "./types.js";
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
/**
 * Internal brand for Effect values.
 *
 * Prevents accidental structural matching.
 */
declare const EffectBrand: unique symbol;
/**
 * Effect<Env, Msg>
 *
 * A long-lived, runtime-managed side effect.
 *
 * Effects represent **ongoing processes** such as:
 *  - timers
 *  - event listeners
 *  - polling loops
 *
 * Effects:
 *  - are started by the runtime
 *  - receive `env` and `dispatch`
 *  - may return a cleanup function
 *
 * Effects are NOT executed immediately.
 * They are returned as descriptions from `init` or `update`.
 */
export interface Effect<Env, Msg> {
    readonly [EffectBrand]: true;
    /**
     * Start the effect.
     *
     * @param env Runtime environment
     * @param dispatch Message dispatcher
     * @returns Optional cleanup function
     */
    run(env: Env, dispatch: Dispatch<Msg>): void | (() => void);
}
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
export declare const fx: <Env, Msg>(impl: (env: Env, dispatch: Dispatch<Msg>) => void | (() => void)) => Effect<Env, Msg>;
/**
 * Subscription<Env, Msg>
 *
 * A keyed, long-lived Effect whose lifecycle is managed
 * by the runtime (`renderApp`).
 *
 * Subscriptions:
 *  - persist across renders
 *  - are started once per key
 *  - are cleaned up automatically when removed
 *
 * This mirrors Elm's `Sub`.
 *
 * NOTE:
 * Subscriptions are DECLARED here but INTERPRETED by the runtime.
 */
export type Subscription<Env, Msg> = {
    readonly _tag: "Subscription";
    readonly key: string;
    readonly effect: Effect<Env, Msg>;
};
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
 * RawEffects are **descriptions**, not executions.
 *
 * Categories:
 *
 * One-shot effects (Cmd-like):
 *  - Msg
 *  - IO<Msg | void>
 *  - Reader<Env, IO<Msg | void>>
 *  - Task<E, Msg | void>
 *  - Reader<Env, Task<E, Msg | void>>
 *
 * Long-lived effects (Sub-like):
 *  - Effect<Env, Msg>
 *  - Subscription<Env, Msg>
 */
export type RawEffect<Env, Msg> = Msg | IO<Msg | void> | Reader<Env, IO<Msg | void>> | Task<unknown, Msg | void> | Reader<Env, Task<unknown, Msg | void>> | Effect<Env, Msg> | Subscription<Env, Msg>;
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
export declare const runEffects: <Env, Msg>(env: Env, dispatch: Dispatch<Msg>, effects: readonly RawEffect<Env, Msg>[] | undefined) => (() => void);
export {};
//# sourceMappingURL=effects.d.ts.map