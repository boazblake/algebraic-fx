// src/adt/maybe.ts
/** Constructors */
export const Just = (value) => ({ _tag: "Just", value });
export const Nothing = { _tag: "Nothing" };
/** Functor map */
export const map = (f, ma) => (ma._tag === "Just" ? Just(f(ma.value)) : Nothing);
/** Monad chain */
export const chain = (f, ma) => (ma._tag === "Just" ? f(ma.value) : Nothing);
/** Applicative pure */
export const of = (a) => Just(a);
/** Pattern matching (fold) */
export const fold = (onNothing, onJust, ma) => (ma._tag === "Nothing" ? onNothing() : onJust(ma.value));
/** Unified static interface */
export const Maybe = { Just, Nothing, map, chain, of, fold };
export default Maybe;
