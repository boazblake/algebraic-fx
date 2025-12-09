/**
 * @module core/types
 *
 * Core type definitions for algebraic-fx programs, effects, and virtual DOM.
 *
 * Defines:
 *  - VNode / VChild / Props
 *  - Dispatch
 *  - Payload<T, M>
 *  - Effect<Env, Msg>
 *  - IOEffect / ReaderEffect / RawEffect<E>
 *  - Program<M, Msg, Env>
 */
/**
 * Tagged IO wrapper for scheduling IO<void> as a runtime effect.
 */
export const IOEffectTag = Symbol("IOEffect");
/**
 * Tagged Reader wrapper for scheduling Reader<Env,IO<void>> as an effect.
 */
export const ReaderEffectTag = Symbol("ReaderEffect");
//# sourceMappingURL=types.js.map