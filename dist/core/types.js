/**
 * @module core/types
 *
 * Core type definitions for algebraic-fx programs, effects, and virtual DOM.
 *
 * This module defines the foundational building blocks for the
 * algebraic-fx runtime:
 *
 *  - VNode / VChild / Props     — Virtual DOM representation
 *  - Dispatch                   — Message dispatcher type
 *  - Payload<T, M>              — Canonical message shape
 *  - Effect<Env, Msg>           — Primary effect abstraction
 *  - IOEffect / ReaderEffect    — Tagged effect wrappers
 *  - RawEffect<E>               — Union of all valid effect forms
 *  - Program<M, Msg, Env>       — Pure application description
 */
/* ---------------------------------------------------------------------------
 * fx: ergonomic Effect constructor
 * ---------------------------------------------------------------------------*/
/**
 * Effect construction helper.
 *
 * Produces a concrete `Effect<Env, Msg>` instance while preserving full
 * type inference for:
 *   - `Env` — program environment
 *   - `Msg` — message union for the program
 *   - optional cleanup return value
 *
 * This helper unifies effect creation across your application.
 *
 * ## Example
 *
 * ```ts
 * import { fx } from "algebraic-effects";
 *
 * export const resizeEffect = fx<TVEnv, TVMsg>((env, dispatch) => {
 *   const onResize = () => dispatch({
 *     type: "RESIZE",
 *     msg: {
 *       width: env.window.innerWidth,
 *       height: env.window.innerHeight,
 *     }
 *   });
 *
 *   env.window.addEventListener("resize", onResize);
 *   onResize();
 *
 *   return () => env.window.removeEventListener("resize", onResize);
 * });
 * ```
 */
export const fx = (run) => ({ run });
/* ---------------------------------------------------------------------------
 * IOEffect
 * ---------------------------------------------------------------------------*/
/**
 * Unique tag for an IOEffect.
 */
export const IOEffectTag = Symbol("IOEffect");
/* ---------------------------------------------------------------------------
 * ReaderEffect
 * ---------------------------------------------------------------------------*/
/**
 * Unique tag for a ReaderEffect.
 */
export const ReaderEffectTag = Symbol("ReaderEffect");
//# sourceMappingURL=types.js.map