// src/adt/maybe.ts
import { fl } from "./fl.js";

export type Maybe<A> = Just<A> | Nothing;

interface FLMethods<A> {
  readonly [fl.map]: <B>(f: (a: A) => B) => Maybe<B>;
  readonly [fl.chain]: <B>(f: (a: A) => Maybe<B>) => Maybe<B>;
  readonly [fl.ap]: <B>(mf: Maybe<(a: A) => B>) => Maybe<B>;
  readonly [fl.of]: <B>(b: B) => Maybe<B>;
}

export interface Just<A> extends FLMethods<A> {
  readonly _tag: "Just";
  readonly value: A;
}

export interface Nothing extends FLMethods<never> {
  readonly _tag: "Nothing";
}

export const isJust = <A>(m: Maybe<A>): m is Just<A> => m._tag === "Just";

export const isNothing = <A>(m: Maybe<A>): m is Nothing => m._tag === "Nothing";

export const isMaybe = (u: unknown): u is Maybe<unknown> => {
  if (!u || typeof u !== "object") return false;
  const tag = (u as { _tag?: unknown })._tag;
  return tag === "Just" || tag === "Nothing";
};

export const of = <A>(a: A): Maybe<A> => just(a);

export const just = <A>(value: A): Just<A> => ({
  _tag: "Just",
  value,
  [fl.map]: <B>(f: (a: A) => B): Maybe<B> => just(f(value)),
  [fl.chain]: <B>(f: (a: A) => Maybe<B>): Maybe<B> => f(value),
  [fl.ap]: <B>(mf: Maybe<(a: A) => B>): Maybe<B> =>
    isJust(mf) ? just(mf.value(value)) : nothing,
  [fl.of]: of,
});

export const nothing: Nothing = {
  _tag: "Nothing",
  [fl.map]: () => nothing,
  [fl.chain]: () => nothing,
  [fl.ap]: () => nothing,
  [fl.of]: of,
};

// Functor
export const map =
  <A, B>(f: (a: A) => B) =>
  (ma: Maybe<A>): Maybe<B> =>
    isJust(ma) ? just(f(ma.value)) : nothing;

// Monad
export const chain =
  <A, B>(f: (a: A) => Maybe<B>) =>
  (ma: Maybe<A>): Maybe<B> =>
    isJust(ma) ? f(ma.value) : nothing;

// Applicative
export const ap =
  <A, B>(mf: Maybe<(a: A) => B>) =>
  (ma: Maybe<A>): Maybe<B> =>
    isJust(mf) && isJust(ma) ? just(mf.value(ma.value)) : nothing;

// Helpers

export const fromNullable = <A>(a: A | null | undefined): Maybe<A> =>
  a == null ? nothing : just(a);

export const toNullable = <A>(ma: Maybe<A>): A | null =>
  isJust(ma) ? ma.value : null;

export const toUndefined = <A>(ma: Maybe<A>): A | undefined =>
  isJust(ma) ? ma.value : undefined;

export const fromPredicate =
  <A>(pred: (a: A) => boolean) =>
  (a: A): Maybe<A> =>
    pred(a) ? just(a) : nothing;

export const withDefault =
  <A>(onNothing: A) =>
  (ma: Maybe<A>): A =>
    isJust(ma) ? ma.value : onNothing;

export const match =
  <A, B>(onNothing: () => B, onJust: (a: A) => B) =>
  (ma: Maybe<A>): B =>
    isJust(ma) ? onJust(ma.value) : onNothing();

export const maybe =
  <A, B>(onNothing: B, onJust: (a: A) => B) =>
  (ma: Maybe<A>): B =>
    isJust(ma) ? onJust(ma.value) : onNothing;

// Traversable helpers (standard signature, used by other modules if needed)

export const traverse =
  <F, A, B>(
    ofF: <X>(x: X) => F,
    mapF: <X, Y>(f: (x: X) => Y) => (fx: F) => F,
    apF: <X, Y>(ff: F) => (fx: F) => F,
    f: (a: A) => F
  ) =>
  (ma: Maybe<A>): F =>
    isJust(ma)
      ? mapF((b: B) => just(b) as Maybe<B>)(f(ma.value))
      : ofF(nothing as Maybe<B>);

export const sequence =
  <F, A>(
    ofF: <X>(x: X) => F,
    mapF: <X, Y>(f: (x: X) => Y) => (fx: F) => F,
    apF: <X, Y>(ff: F) => (fx: F) => F
  ) =>
  (mma: Maybe<F>): F =>
    isJust(mma)
      ? mapF((a: A) => just(a) as Maybe<A>)(mma.value)
      : ofF(nothing as Maybe<A>);

// fp-ts style dictionary

export const MAYBE_URI = "Maybe" as const;
export type MAYBE_URI = typeof MAYBE_URI;

export const MaybeModule = {
  URI: MAYBE_URI,
  of,
  map,
  ap,
  chain,
  fromNullable,
  fromPredicate,
  withDefault,
  match,
  maybe,
};
