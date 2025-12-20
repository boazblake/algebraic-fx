// src/core/effects.ts

import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";
import type { Task } from "../adt/task.js";
import type { Dispatch } from "./types.js";

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
 * Long-lived effect (subscriptions, streams, listeners, etc).
 *
 * Effects represent *ongoing* side effects that may produce messages over time.
 * They are executed by the runtime and may optionally return a cleanup function.
 *
 * Cleanup functions are invoked when the effect is disposed.
 */
export interface Effect<Env, Msg> {
  readonly [EffectBrand]: true;
  run(env: Env, dispatch: Dispatch<Msg>): void | (() => void);
}

/**
 * Construct a branded Effect.
 *
 * This helper hides the internal Effect brand and provides a safe way
 * to define long-lived effects such as subscriptions or listeners.
 *
 * The provided implementation is invoked with the runtime environment
 * and dispatch function.
 */
export const fx = <Env, Msg>(
  impl: (env: Env, dispatch: Dispatch<Msg>) => void | (() => void)
): Effect<Env, Msg> => ({
  [EffectBrand]: true,
  run: impl,
});

/**
 * RawEffect represents any side-effect description a Program may emit.
 *
 * RawEffects are *data*, not executions.
 * They are interpreted by the runtime after each update and during init.
 *
 * Supported forms:
 *
 *  - Msg
 *      Dispatches the message immediately.
 *
 *  - IO<Msg | void>
 *      Executed synchronously.
 *      If a Msg is returned, it is dispatched.
 *
 *  - Reader<Env, IO<Msg | void>>
 *      Environment-dependent synchronous effect.
 *
 *  - Task<E, Msg | void>
 *      Fire-and-forget asynchronous computation.
 *      Only successful results are dispatched.
 *
 *  - Reader<Env, Task<E, Msg | void>>
 *      Environment-dependent asynchronous computation.
 *
 *  - Effect<Env, Msg>
 *      Long-lived subscription effect with optional cleanup.
 */
export type RawEffect<Env, Msg> =
  | Msg
  | IO<Msg | void>
  | Reader<Env, IO<Msg | void>>
  | Task<unknown, Msg | void>
  | Reader<Env, Task<unknown, Msg | void>>
  | Effect<Env, Msg>;

/* ------------------------------------------------------------------------- */
/* Type guards                                                               */
/* ------------------------------------------------------------------------- */

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
export const interpretRawEffect = <Env, Msg>(
  env: Env,
  dispatch: Dispatch<Msg>,
  eff: RawEffect<Env, Msg>
): void | (() => void) => {
  if (eff == null) return;

  // Subscriptions
  if (isEffect<Env, Msg>(eff)) {
    return eff.run(env, dispatch);
  }

  // Task<E, Msg | void>
  if (isTask(eff)) {
    eff.run().then((ea: any) => {
      if (ea && ea._tag === "Right" && ea.right !== undefined) {
        dispatch(ea.right as Msg);
      }
    });
    return;
  }

  // Reader<Env, IO | Task>
  if (isReader(eff)) {
    const inner = (eff as Reader<Env, unknown>).run(env) as any;

    if (isIO(inner)) {
      const msg = inner.run();
      if (msg !== undefined) dispatch(msg as Msg);
      return;
    }

    if (isTask(inner)) {
      inner.run().then((ea: any) => {
        if (ea && ea._tag === "Right" && ea.right !== undefined) {
          dispatch(ea.right as Msg);
        }
      });
      return;
    }

    // anything else is ignored
    return;
  }

  // IO<Msg | void>
  if (isIO(eff)) {
    const msg = (eff as IO<Msg | void>).run();
    if (msg !== undefined) dispatch(msg as Msg);
    return;
  }

  // Fallback: treat as plain Msg
  dispatch(eff as Msg);
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
export const runEffects = <Env, Msg>(
  env: Env,
  dispatch: Dispatch<Msg>,
  effects: RawEffect<Env, Msg>[] | undefined
): (() => void) => {
  if (!effects || effects.length === 0) {
    return () => {};
  }

  const cleanups: (() => void)[] = [];

  for (const eff of effects) {
    const c = interpretRawEffect(env, dispatch, eff);
    if (typeof c === "function") cleanups.push(c);
  }

  return () => {
    for (const c of cleanups) {
      try {
        c();
      } catch {
        // swallow cleanup errors
      }
    }
  };
};
