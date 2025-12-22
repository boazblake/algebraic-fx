// src/core/effects.ts

import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";
import type { Task } from "../adt/task.js";
import type { Dispatch } from "./types.js";

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
export const fx = <Env, Msg>(
  impl: (env: Env, dispatch: Dispatch<Msg>) => void | (() => void)
): Effect<Env, Msg> => ({
  [EffectBrand]: true,
  run: impl,
});

/* ============================================================================
 * Subscription
 * ========================================================================== */

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
export const sub = <Env, Msg>(
  key: string,
  impl: (env: Env, dispatch: Dispatch<Msg>) => void | (() => void)
): Subscription<Env, Msg> => ({
  _tag: "Subscription",
  key,
  effect: fx(impl),
});

/**
 * Type guard for Subscription.
 */
export const isSubscription = <Env, Msg>(
  u: unknown
): u is Subscription<Env, Msg> =>
  !!u &&
  typeof u === "object" &&
  (u as { _tag?: unknown })._tag === "Subscription";

/* ============================================================================
 * RawEffect
 * ========================================================================== */

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
export type RawEffect<Env, Msg> =
  | Msg
  | IO<Msg | void>
  | Reader<Env, IO<Msg | void>>
  | Task<unknown, Msg | void>
  | Reader<Env, Task<unknown, Msg | void>>
  | Effect<Env, Msg>
  | Subscription<Env, Msg>;

/* ============================================================================
 * Type guards (private)
 * ========================================================================== */

const isEffect = <Env, Msg>(u: unknown): u is Effect<Env, Msg> =>
  !!u && typeof u === "object" && (u as any)[EffectBrand] === true;

const isTask = (u: unknown): u is Task<unknown, unknown> =>
  !!u &&
  typeof u === "object" &&
  typeof (u as any).run === "function" &&
  typeof (u as any).runWith === "function";

const isReader = (u: unknown): u is Reader<unknown, unknown> =>
  !!u &&
  typeof u === "object" &&
  typeof (u as any).run === "function" &&
  (u as any).run.length >= 1 &&
  typeof (u as any).runWith !== "function";

const isIO = (u: unknown): u is IO<unknown> =>
  !!u &&
  typeof u === "object" &&
  typeof (u as any).run === "function" &&
  (u as any).run.length === 0 &&
  typeof (u as any).runWith !== "function";

/* ============================================================================
 * runEffects (Cmd interpreter)
 * ========================================================================== */

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
export function runEffects<Env, Msg>(
  env: Env,
  dispatch: Dispatch<Msg>,
  effects: readonly RawEffect<Env, Msg>[] | undefined
): () => void;

/**
 * Compatibility overload:
 *   runEffects(env, effects, dispatch)
 *
 * This keeps older call sites/benchmarks working without changing semantics.
 */
export function runEffects<Env, Msg>(
  env: Env,
  effects: readonly RawEffect<Env, Msg>[] | undefined,
  dispatch: Dispatch<Msg>
): () => void;

export function runEffects<Env, Msg>(
  env: Env,
  a: Dispatch<Msg> | readonly RawEffect<Env, Msg>[] | undefined,
  b: readonly RawEffect<Env, Msg>[] | undefined | Dispatch<Msg>
): () => void {
  const dispatch: Dispatch<Msg> =
    typeof a === "function" ? (a as Dispatch<Msg>) : (b as Dispatch<Msg>);
  const effects: readonly RawEffect<Env, Msg>[] | undefined =
    typeof a === "function" ? (b as any) : (a as any);

  const cleanups: Array<() => void> = [];

  if (effects && effects.length > 0) {
    for (const eff of effects) {
      if (!eff) continue;

      // Subscriptions are ignored at this layer.
      if (isSubscription(eff)) continue;

      // Effect (unkeyed)
      if (isEffect<Env, Msg>(eff)) {
        const c = eff.run(env, dispatch);
        if (typeof c === "function") cleanups.push(c);
        continue;
      }

      // Task
      if (isTask(eff)) {
        eff.run().then((ea: any) => {
          if (ea && ea._tag === "Right" && ea.right !== undefined) {
            dispatch(ea.right as Msg);
          }
        });
        continue;
      }

      // Reader<IO> | Reader<Task>
      if (isReader(eff)) {
        const inner = (eff as Reader<Env, unknown>).run(env) as unknown;

        if (isIO(inner)) {
          const msg = (inner as IO<Msg | void>).run();
          if (msg !== undefined) dispatch(msg as Msg);
          continue;
        }

        if (isTask(inner)) {
          (inner as Task<unknown, Msg | void>).run().then((ea: any) => {
            if (ea && ea._tag === "Right" && ea.right !== undefined) {
              dispatch(ea.right as Msg);
            }
          });
          continue;
        }

        continue;
      }

      // IO
      if (isIO(eff)) {
        const msg = (eff as IO<Msg | void>).run();
        if (msg !== undefined) dispatch(msg as Msg);
        continue;
      }

      // Plain Msg
      dispatch(eff as Msg);
    }
  }

  return () => {
    for (const c of cleanups) {
      try {
        c();
      } catch {
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
export const mapCmd = <Env, A, B>(
  eff: RawEffect<Env, A>,
  lift: (a: A) => B
): RawEffect<Env, B> => {
  if (isSubscription(eff)) {
    throw new Error("mapCmd: Subscription is not a Cmd. Use mapSub/mapSubs.");
  }

  // Plain message (assumes common `{ type: string }` shape)
  if (typeof eff === "object" && eff !== null && "type" in eff) {
    return lift(eff as A);
  }

  // IO
  if (isIO(eff)) {
    const io = eff as IO<A | void>;
    return {
      ...(io as any),
      run: () => {
        const v = io.run();
        return v === undefined ? undefined : lift(v);
      },
    } as unknown as IO<B | void>;
  }

  // Effect
  if (isEffect<Env, A>(eff)) {
    const e = eff as Effect<Env, A>;
    return fx<Env, B>((env, dispatch) => e.run(env, (a) => dispatch(lift(a))));
  }

  // Reader / Task: mapping is applied when they resolve to a Msg in runEffects.
  return eff as unknown as RawEffect<Env, B>;
};

/**
 * Map a list of Cmd-like effects.
 */
export const mapCmds = <Env, A, B>(
  effects: readonly RawEffect<Env, A>[],
  lift: (a: A) => B
): RawEffect<Env, B>[] =>
  effects.filter((e) => !isSubscription(e)).map((e) => mapCmd(e, lift));

/* ============================================================================
 * Sub mapping (Elm Sub.map)
 * ========================================================================== */

/**
 * Lift a Subscription from message type A to B.
 *
 * Subscription identity (key) is preserved.
 */
export const mapSub = <Env, A, B>(
  s: Subscription<Env, A>,
  lift: (a: A) => B
): Subscription<Env, B> => ({
  _tag: "Subscription",
  key: s.key,
  effect: fx((env, dispatch) => s.effect.run(env, (a) => dispatch(lift(a)))),
});

/**
 * Map a list of Subscriptions.
 */
export const mapSubs = <Env, A, B>(
  subs: readonly Subscription<Env, A>[],
  lift: (a: A) => B
): Subscription<Env, B>[] => subs.map((s) => mapSub(s, lift));
