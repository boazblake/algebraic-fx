// src/core/effects.ts

import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";
import type { Task } from "../adt/task.js";
import type { Dispatch } from "./types.js";

/**
 * Brand for runtime managed Effect objects.
 */
const EffectBrand = Symbol("EffectBrand");

/**
 * Long lived effect (subscriptions, streams, etc).
 * Return a cleanup function or void.
 */
export interface Effect<Env, Msg> {
  readonly [EffectBrand]: true;
  run(env: Env, dispatch: Dispatch<Msg>): void | (() => void);
}

/**
 * Helper to construct an Effect without exposing the brand.
 */
export const fx = <Env, Msg>(
  impl: (env: Env, dispatch: Dispatch<Msg>) => void | (() => void)
): Effect<Env, Msg> => ({
  [EffectBrand]: true,
  run: impl,
});

/**
 * RawEffect is anything the program is allowed to return from init/update.
 *
 * Supported:
 *  - plain message (Msg)
 *  - IO<Msg | void>
 *  - Reader<Env, IO<Msg | void>>
 *  - Task<E, Msg | void>
 *  - Reader<Env, Task<E, Msg | void>>
 *  - Effect<Env, Msg>
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
 * Interpret a single RawEffect:
 *  - synchronously for IO / Reader<IO>
 *  - fire and forget for Task / Reader<Task>
 *  - delegate to Effect.run for subscriptions
 *  - if given a plain Msg, dispatches it directly
 *
 * Returns a cleanup function only for Effect cases; all others return void.
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
 * Interpret an array of RawEffects.
 * Any cleanup function from subscription effects is returned as a combined disposer.
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
