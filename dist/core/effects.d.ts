import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";
import type { Task } from "../adt/task.js";
import type { Dispatch } from "./types.js";
/**
 * Brand for runtime managed Effect objects.
 */
declare const EffectBrand: unique symbol;
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
export declare const fx: <Env, Msg>(impl: (env: Env, dispatch: Dispatch<Msg>) => void | (() => void)) => Effect<Env, Msg>;
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
export type RawEffect<Env, Msg> = Msg | IO<Msg | void> | Reader<Env, IO<Msg | void>> | Task<unknown, Msg | void> | Reader<Env, Task<unknown, Msg | void>> | Effect<Env, Msg>;
/**
 * Interpret a single RawEffect:
 *  - synchronously for IO / Reader<IO>
 *  - fire and forget for Task / Reader<Task>
 *  - delegate to Effect.run for subscriptions
 *  - if given a plain Msg, dispatches it directly
 *
 * Returns a cleanup function only for Effect cases; all others return void.
 */
export declare const interpretRawEffect: <Env, Msg>(env: Env, dispatch: Dispatch<Msg>, eff: RawEffect<Env, Msg>) => void | (() => void);
/**
 * Interpret an array of RawEffects.
 * Any cleanup function from subscription effects is returned as a combined disposer.
 */
export declare const runEffects: <Env, Msg>(env: Env, dispatch: Dispatch<Msg>, effects: RawEffect<Env, Msg>[] | undefined) => (() => void);
export {};
//# sourceMappingURL=effects.d.ts.map