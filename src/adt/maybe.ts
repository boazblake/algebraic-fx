// src/adt/maybe.ts

export type Just<A> = { _tag: "Just"; value: A };
export type Nothing = { _tag: "Nothing" };
export type Maybe<A> = Just<A> | Nothing;

/** Constructors */
export const Just = <A>(value: A): Maybe<A> => ({ _tag: "Just", value });
export const Nothing: Maybe<never> = { _tag: "Nothing" };

/** Functor map */
export const map = <A, B>(
  f: (a: A) => B,
  ma: Maybe<A>
): Maybe<B> => (ma._tag === "Just" ? Just(f(ma.value)) : Nothing);

/** Monad chain */
export const chain = <A, B>(
  f: (a: A) => Maybe<B>,
  ma: Maybe<A>
): Maybe<B> => (ma._tag === "Just" ? f(ma.value) : Nothing);

/** Applicative pure */
export const of = <A>(a: A): Maybe<A> => Just(a);

/** Pattern matching (fold) */
export const fold = <A, B>(
  onNothing: () => B,
  onJust: (a: A) => B,
  ma: Maybe<A>
): B => (ma._tag === "Nothing" ? onNothing() : onJust(ma.value));

/** Unified static interface */
export const Maybe = { Just, Nothing, map, chain, of, fold };
export default Maybe;
