// src/adt/either.ts
export type Left<L> = { _tag: "Left"; left: L };
export type Right<R> = { _tag: "Right"; right: R };
export type Either<L, R> = Left<L> | Right<R>;

/** Constructors */
export const Left = <L>(l: L): Either<L, never> => ({ _tag: "Left", left: l });
export const Right = <R>(r: R): Either<never, R> => ({ _tag: "Right", right: r });

/** Functor map */
export const map = <L, A, B>(
  f: (a: A) => B,
  e: Either<L, A>
): Either<L, B> => (e._tag === "Right" ? Right(f(e.right)) : e);

/** Monad chain */
export const chain = <L, A, B>(
  f: (a: A) => Either<L, B>,
  e: Either<L, A>
): Either<L, B> => (e._tag === "Right" ? f(e.right) : e);

/** Fold (pattern match) */
export const fold = <L, A, B>(
  onLeft: (l: L) => B,
  onRight: (a: A) => B,
  e: Either<L, A>
): B => (e._tag === "Left" ? onLeft(e.left) : onRight(e.right));

/** Applicative */
export const of = <A>(a: A): Either<never, A> => Right(a);

/** Combine as a single runtime object (so Either.Right() works) */
export const Either = { Left, Right, map, chain, fold, of };
export default Either;
