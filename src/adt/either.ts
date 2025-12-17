// src/adt/either.ts
import { fl } from "./fl.js";

export type Left<E> = {
  readonly _tag: "Left";
  readonly left: E;
};

export type Right<A> = {
  readonly _tag: "Right";
  readonly right: A;
};

export type Either<E, A> = Left<E> | Right<A>;

export const isLeft = <E, A>(fa: Either<E, A>): fa is Left<E> =>
  fa._tag === "Left";

export const isRight = <E, A>(fa: Either<E, A>): fa is Right<A> =>
  fa._tag === "Right";

export const left = <E = never, A = never>(e: E): Either<E, A> =>
  withInstanceMethods<E, A>({
    _tag: "Left",
    left: e,
  } as Left<E> as Either<E, A>);

export const right = <E = never, A = never>(a: A): Either<E, A> =>
  withInstanceMethods<E, A>({
    _tag: "Right",
    right: a,
  } as Right<A> as Either<E, A>);

/**
 * Applicative "of" injects a value in the Right side.
 */
export const of = <A>(a: A): Either<never, A> => right(a);

/**
 * Functor map.
 */
export const map = <E, A, B>(
  fa: Either<E, A>,
  f: (a: A) => B
): Either<E, B> => {
  if (isLeft(fa)) return fa as unknown as Either<E, B>;
  return right<E, B>(f(fa.right));
};

/**
 * Map over the Left side.
 */
export const mapLeft = <E, A, F>(
  fa: Either<E, A>,
  f: (e: E) => F
): Either<F, A> => {
  if (isLeft(fa)) return left<F, A>(f(fa.left));
  return fa as unknown as Either<F, A>;
};

/**
 * Bimap over both sides.
 */
export const bimap = <E, A, F, B>(
  fa: Either<E, A>,
  f: (e: E) => F,
  g: (a: A) => B
): Either<F, B> => {
  if (isLeft(fa)) return left<F, B>(f(fa.left));
  return right<F, B>(g((fa as Right<A>).right));
};

/**
 * Apply. If either side is Left, it short circuits.
 */
export const ap = <E, A, B>(
  fab: Either<E, (a: A) => B>,
  fa: Either<E, A>
): Either<E, B> => {
  if (isLeft(fab)) return fab as unknown as Either<E, B>;
  if (isLeft(fa)) return fa as unknown as Either<E, B>;
  return right<E, B>(fab.right(fa.right));
};

/**
 * Monad chain.
 */
export const chain = <E, A, B>(
  fa: Either<E, A>,
  f: (a: A) => Either<E, B>
): Either<E, B> => {
  if (isLeft(fa)) return fa as unknown as Either<E, B>;
  return f(fa.right);
};

/**
 * Swap Left and Right.
 */
export const swap = <E, A>(fa: Either<E, A>): Either<A, E> => {
  if (isLeft(fa)) return right<A, E>(fa.left);
  return left<A, E>((fa as Right<A>).right);
};

/**
 * Pattern match.
 */
export const match =
  <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) =>
  (fa: Either<E, A>): B =>
    isLeft(fa) ? onLeft(fa.left) : onRight((fa as Right<A>).right);

/**
 * Same as match but flipped argument order, aligns with maybe().
 */
export const either =
  <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) =>
  (fa: Either<E, A>): B =>
    match(onLeft, onRight)(fa);

/**
 * Extract with default for Left.
 */
export const getOrElse =
  <E, A>(onLeft: (e: E) => A) =>
  (fa: Either<E, A>): A =>
    isLeft(fa) ? onLeft(fa.left) : (fa as Right<A>).right;

/**
 * Build Either from nullable value.
 */
export const fromNullable =
  <E>(onNull: () => E) =>
  <A>(a: A | null | undefined): Either<E, A> =>
    a == null ? left<E, A>(onNull()) : right<E, A>(a);

/**
 * Build Either from predicate.
 */
export const fromPredicate =
  <E, A>(predicate: (a: A) => boolean, onFalse: (a: A) => E) =>
  (a: A): Either<E, A> =>
    predicate(a) ? right<E, A>(a) : left<E, A>(onFalse(a));

/**
 * Effectful construction with error capture.
 */
export const tryCatch = <E, A>(
  thunk: () => A,
  onThrow: (u: unknown) => E
): Either<E, A> => {
  try {
    return right<E, A>(thunk());
  } catch (e) {
    return left<E, A>(onThrow(e));
  }
};

/**
 * Narrow type guard for Either values.
 */
export const isEither = (u: unknown): u is Either<unknown, unknown> =>
  !!u &&
  typeof u === "object" &&
  "_tag" in (u as any) &&
  (((u as any)._tag === "Left" && "left" in (u as any)) ||
    ((u as any)._tag === "Right" && "right" in (u as any)));

/**
 * Attach Fantasy Land instance methods to a freshly created value.
 * Done once at construction.
 */
type EitherInstance<E, A> = Either<E, A> & {
  [fl.map]<B>(f: (a: A) => B): Either<E, B>;
  [fl.ap]<B>(
    fa: Either<E, A extends (x: infer I) => B ? I : never>
  ): Either<E, B>;
  [fl.chain]<B>(f: (a: A) => Either<E, B>): Either<E, B>;
  [fl.bimap]<F, B>(f: (e: E) => F, g: (a: A) => B): Either<F, B>;
};

const withInstanceMethods = <E, A>(ea: Either<E, A>): EitherInstance<E, A> => {
  const self = ea as EitherInstance<E, A>;

  self[fl.map] = <B>(f: (a: A) => B): Either<E, B> => map(self, f);

  self[fl.chain] = <B>(f: (a: A) => Either<E, B>): Either<E, B> =>
    chain(self, f);

  // Method form: fab[fl.ap](fa)
  self[fl.ap] = <B>(
    fa: Either<E, A extends (x: infer I) => B ? I : never>
  ): Either<E, B> =>
    // cast through unknown to satisfy type relations without cost at runtime
    ap(self as unknown as Either<E, (a: any) => B>, fa as any);

  self[fl.bimap] = <F, B>(f: (e: E) => F, g: (a: A) => B): Either<F, B> =>
    bimap(self, f, g);

  return self;
};

/**
 * fp ts style module dictionary.
 */
export const EitherModule = {
  URI: "Either",
  left,
  right,
  of,
  isLeft,
  isRight,
  map,
  mapLeft,
  bimap,
  ap,
  chain,
  swap,
  match,
  either,
  getOrElse,
  fromNullable,
  fromPredicate,
  tryCatch,
  isEither,
  [fl.of]: of,
};
