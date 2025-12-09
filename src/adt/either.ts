/**
 * Unique brand to nominally type Either values, preventing structural collisions.
 */
const EitherBrand = Symbol("EitherBrand");

/**
 * Left value of Either.
 *
 * Represents failure or alternate branch.
 *
 * @typeParam L Error or alternate type
 */
export type Left<L> = { _tag: "Left"; left: L; readonly [EitherBrand]: true };

/**
 * Right value of Either.
 *
 * Represents success branch.
 *
 * @typeParam R Success type
 */
export type Right<R> = {
  _tag: "Right";
  right: R;
  readonly [EitherBrand]: true;
};

/**
 * Either<L, R> — Sum type representing success or failure.
 *
 * Common use cases:
 * - Error handling without exceptions
 * - Parsing
 * - Validation pipelines
 *
 * Semantics:
 * - Left = error / failure
 * - Right = success
 */
export type Either<L, R> = (Left<L> | Right<R>) & {
  readonly [EitherBrand]: true;
};

/**
 * Construct a Left value (failure).
 */
export const Left = <L>(l: L): Either<L, never> => ({
  _tag: "Left",
  left: l,
  [EitherBrand]: true,
});

/**
 * Construct a Right value (success).
 */
export const Right = <R>(r: R): Either<never, R> => ({
  _tag: "Right",
  right: r,
  [EitherBrand]: true,
});

/**
 * Functor map: transform the Right value, preserve Left as-is.
 */
export const map = <L, A, B>(f: (a: A) => B, e: Either<L, A>): Either<L, B> =>
  e._tag === "Right" ? Right(f(e.right)) : e;

/**
 * Applicative apply: apply a Right-wrapped function to a Right-wrapped value.
 */
export const ap = <L, A, B>(
  ef: Either<L, (a: A) => B>,
  ea: Either<L, A>
): Either<L, B> => {
  if (ef._tag === "Left") return Left(ef.left);
  if (ea._tag === "Left") return Left(ea.left);
  return Right(ef.right(ea.right));
};

/**
 * Monad chain: bind the Right value to the next computation, short-circuiting on Left.
 */
export const chain = <L, A, B>(
  f: (a: A) => Either<L, B>,
  e: Either<L, A>
): Either<L, B> => (e._tag === "Right" ? f(e.right) : e);

/**
 * Bifunctor map over Left OR Right.
 */
export const bimap = <L, A, L2, B>(
  onLeft: (l: L) => L2,
  onRight: (a: A) => B,
  e: Either<L, A>
): Either<L2, B> =>
  e._tag === "Left" ? Left(onLeft(e.left)) : Right(onRight(e.right));

/**
 * Map only the Left (error) side.
 */
export const mapLeft = <L, A, L2>(
  f: (l: L) => L2,
  e: Either<L, A>
): Either<L2, A> => (e._tag === "Left" ? Left(f(e.left)) : e);

/**
 * Pattern match for Either.
 */
export const fold = <L, A, B>(
  onLeft: (l: L) => B,
  onRight: (a: A) => B,
  e: Either<L, A>
): B => (e._tag === "Left" ? onLeft(e.left) : onRight(e.right));

/**
 * Lift a value into Right (pure).
 */
export const of = <A>(a: A): Either<never, A> => Right(a);

/**
 * Extract the Right or fallback to a default.
 */
export const getOrElse = <L, A>(defaultValue: A, e: Either<L, A>): A =>
  e._tag === "Right" ? e.right : defaultValue;

/**
 * Extract Right or compute fallback.
 */
export const getOrElseW = <L, A, B>(
  onLeft: (l: L) => B,
  e: Either<L, A>
): A | B => (e._tag === "Right" ? e.right : onLeft(e.left));

/**
 * Alternative: return the first Right encountered.
 */
export const alt = <L, A>(e1: Either<L, A>, e2: Either<L, A>): Either<L, A> =>
  e1._tag === "Right" ? e1 : e2;

/**
 * Type guard: check if e is Left.
 */
export const isLeft = <L, A>(e: Either<L, A>): e is Left<L> =>
  e._tag === "Left";

/**
 * Type guard: check if e is Right.
 */
export const isRight = <L, A>(e: Either<L, A>): e is Right<A> =>
  e._tag === "Right";

/**
 * Convert nullable to Either.
 *
 * @example
 * fromNullable("missing")(null)    // Left("missing")
 * fromNullable("missing")(42)      // Right(42)
 */
export const fromNullable =
  <L>(onNull: L) =>
  <A>(a: A | null | undefined): Either<L, NonNullable<A>> =>
    a == null ? Left(onNull) : Right(a as NonNullable<A>);

/**
 * Try/catch wrapper for synchronous code.
 */
export const tryCatch = <A>(f: () => A): Either<unknown, A> => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

/**
 * Try/catch wrapper with custom error mapping.
 */
export const tryCatchK = <E, A>(
  f: () => A,
  onError: (e: unknown) => E
): Either<E, A> => {
  try {
    return Right(f());
  } catch (e) {
    return Left(onError(e));
  }
};

/**
 * Swap Left and Right positions.
 */
export const swap = <L, A>(e: Either<L, A>): Either<A, L> =>
  e._tag === "Left" ? Right(e.left) : Left(e.right);

/**
 * Keep Right only if predicate succeeds; otherwise convert to Left.
 */
export const filterOrElse = <L, A>(
  predicate: (a: A) => boolean,
  onFalse: (a: A) => L,
  e: Either<L, A>
): Either<L, A> =>
  e._tag === "Right" && !predicate(e.right) ? Left(onFalse(e.right)) : e;

/**
 * Traverse an array, short-circuiting on Left.
 */
export const traverse = <L, A, B>(
  f: (a: A) => Either<L, B>,
  arr: A[]
): Either<L, B[]> => {
  const result: B[] = [];
  for (const a of arr) {
    const eb = f(a);
    if (eb._tag === "Left") return eb;
    result.push(eb.right);
  }
  return Right(result);
};

/**
 * Sequence an array of Eithers into Either of array.
 */
export const sequence = <L, A>(arr: Either<L, A>[]): Either<L, A[]> =>
  traverse((x) => x, arr);

/**
 * Unified namespace export.
 */
export const Either = {
  Left,
  Right,
  map,
  ap,
  chain,
  bimap,
  mapLeft,
  fold,
  of,
  getOrElse,
  getOrElseW,
  alt,
  isLeft,
  isRight,
  fromNullable,
  tryCatch,
  tryCatchK,
  swap,
  filterOrElse,
  traverse,
  sequence,
};

export default Either;
