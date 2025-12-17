// src/adt/validation.ts
import { fl } from "./fl.js";

export type Failure<E> = {
  readonly _tag: "Failure";
  readonly left: E;
};

export type Success<A> = {
  readonly _tag: "Success";
  readonly right: A;
};

export type Validation<E, A> = Failure<E> | Success<A>;

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

export const failure = <E = unknown, A = never>(e: E): Validation<E, A> => ({
  _tag: "Failure",
  left: e,
});

export const success = <E = never, A = unknown>(a: A): Validation<E, A> => ({
  _tag: "Success",
  right: a,
});

export const of = <A>(a: A): Validation<never, A> => success(a);

// -----------------------------------------------------------------------------
// Type guards
// -----------------------------------------------------------------------------

export const isFailure = <E, A>(v: Validation<E, A>): v is Failure<E> =>
  v._tag === "Failure";

export const isSuccess = <E, A>(v: Validation<E, A>): v is Success<A> =>
  v._tag === "Success";

export const isValidation = (u: unknown): u is Validation<unknown, unknown> =>
  (!!u && typeof u === "object" && (u as any)._tag === "Failure") ||
  (u as any)._tag === "Success";

// -----------------------------------------------------------------------------
// Core combinators
// -----------------------------------------------------------------------------

export const map =
  <A, B>(f: (a: A) => B) =>
  <E>(fa: Validation<E, A>): Validation<E, B> =>
    isSuccess(fa) ? success<E, B>(f(fa.right)) : fa;

export const mapFailure =
  <E, F>(f: (e: E) => F) =>
  <A>(fa: Validation<E, A>): Validation<F, A> =>
    isFailure(fa) ? failure<F, A>(f(fa.left)) : fa;

export const bimap =
  <E, F, A, B>(f: (e: E) => F, g: (a: A) => B) =>
  (fa: Validation<E, A>): Validation<F, B> =>
    isFailure(fa)
      ? failure<F, B>(f(fa.left))
      : success<F, B>(g((fa as any).right));

// Pattern matching

export const match =
  <E, A, R>(onFailure: (e: E) => R, onSuccess: (a: A) => R) =>
  (fa: Validation<E, A>): R =>
    isFailure(fa) ? onFailure(fa.left) : onSuccess((fa as any).right);

export const getOrElse =
  <A>(onFailure: () => A) =>
  <E>(fa: Validation<E, A>): A =>
    isFailure(fa) ? onFailure() : fa.right;

// Constructors from other shapes

export const fromPredicate =
  <A, E>(pred: (a: A) => boolean, onFalse: (a: A) => E) =>
  (a: A): Validation<E, A> =>
    pred(a) ? success<E, A>(a) : failure<E, A>(onFalse(a));

export const fromNullable =
  <A, E>(onNull: () => E) =>
  (a: A | null | undefined): Validation<E, A> =>
    a == null ? failure<E, A>(onNull()) : success<E, A>(a);

// -----------------------------------------------------------------------------
// Semigroup helpers for error accumulation
// -----------------------------------------------------------------------------

export interface Semigroup<A> {
  concat: (x: A, y: A) => A;
}

export const semigroupString: Semigroup<string> = {
  concat: (x, y) => x + y,
};

export const semigroupArray = <A>(): Semigroup<A[]> => ({
  concat: (xs, ys) => xs.concat(ys),
});

// -----------------------------------------------------------------------------
// Applicative instance factory
// -----------------------------------------------------------------------------

export const getValidationApplicative = <E>(S: Semigroup<E>) => {
  const ap = <A, B>(
    fab: Validation<E, (a: A) => B>,
    fa: Validation<E, A>
  ): Validation<E, B> => {
    if (isFailure(fab) && isFailure(fa)) {
      return failure<E, B>(S.concat(fab.left, fa.left));
    }
    if (isFailure(fab)) return fab;
    if (isFailure(fa)) return fa;

    const f = fab.right;

    // Handle functions of any arity.
    try {
      return success<E, B>((f as any)(fa.right));
    } catch {
      // If f does not accept an argument, treat as constant function.
      return success<E, B>((f as any)());
    }
  };

  return {
    of,
    map,
    ap,
  };
};

// -----------------------------------------------------------------------------
// Fantasy Land and fp ts style module dictionary
// -----------------------------------------------------------------------------

export const ValidationModule = {
  URI: "Validation",
  failure,
  success,
  of,
  map,
  mapFailure,
  bimap,
  fromPredicate,
  fromNullable,
  getOrElse,
  getValidationApplicative,
  semigroupString,
  semigroupArray,
  [fl.of]: of,
};
