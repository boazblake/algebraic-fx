/**
 * Unique brand ensuring Validation values are nominally typed.
 * Prevents accidental mixing with plain objects of identical shape.
 */
const ValidationBrand = Symbol("ValidationBrand");

/**
 * Validation<E, A> represents a computation that may succeed (`Success<A>`)
 * or fail (`Failure<E[]>`). Unlike Either:
 *
 * - Validation supports *parallel* error accumulation via `ap`, `combine`,
 *   `traverse`, and `sequence`.
 * - `chain` behaves like Either and short-circuits.
 *
 * Typical use cases:
 * - form validation
 * - configuration validation
 * - batch data validation
 */
export type Validation<E, A> =
  | ({ _tag: "Failure"; errors: E[] } & { readonly [ValidationBrand]: true })
  | ({ _tag: "Success"; value: A } & { readonly [ValidationBrand]: true });

/**
 * Construct a failing Validation from an array of errors.
 *
 * @example
 * Failure(["invalid email"])
 */
export const Failure = <E>(errors: E[]): Validation<E, never> => ({
  _tag: "Failure",
  errors,
  [ValidationBrand]: true,
});

/**
 * Construct a successful Validation containing a value.
 *
 * @example
 * Success(42)
 */
export const Success = <A>(value: A): Validation<never, A> => ({
  _tag: "Success",
  value,
  [ValidationBrand]: true,
});

/**
 * Functor map over a successful Validation.
 * If the value is `Success(a)`, returns `Success(f(a))`.
 * If `Failure`, returns unchanged.
 */
export const map = <E, A, B>(
  f: (a: A) => B,
  v: Validation<E, A>
): Validation<E, B> => (v._tag === "Success" ? Success(f(v.value)) : v);

/**
 * Applicative apply for Validation.
 *
 * - If both function and value are failures, errors accumulate.
 * - If any side is Failure, that Failure is returned.
 * - If both are Success, applies the function to the value.
 *
 * @example
 * ap(Success(x => x + 1), Success(2))     // Success(3)
 * ap(Failure(["e1"]), Failure(["e2"]))    // Failure(["e1", "e2"])
 */
export const ap = <E, A, B>(
  vf: Validation<E, (a: A) => B>,
  va: Validation<E, A>
): Validation<E, B> => {
  if (vf._tag === "Failure" && va._tag === "Failure")
    return Failure([...vf.errors, ...va.errors]);
  if (vf._tag === "Failure") return vf;
  if (va._tag === "Failure") return va;
  return Success(vf.value(va.value));
};

/**
 * Monad chain for Validation.
 *
 * Important:
 * - `chain` *short-circuits* like Either, NOT accumulating errors.
 *   Use here only for sequential validation that should stop on the first error.
 */
export const chain = <E, A, B>(
  f: (a: A) => Validation<E, B>,
  v: Validation<E, A>
): Validation<E, B> => (v._tag === "Success" ? f(v.value) : v);

/**
 * Map over both Failure and Success branches.
 */
export const bimap = <E, A, E2, B>(
  onFailure: (errs: E[]) => E2[],
  onSuccess: (a: A) => B,
  v: Validation<E, A>
): Validation<E2, B> =>
  v._tag === "Failure"
    ? Failure(onFailure(v.errors))
    : Success(onSuccess(v.value));

/**
 * Map only the error list.
 */
export const mapErrors = <E, A, E2>(
  f: (errs: E[]) => E2[],
  v: Validation<E, A>
): Validation<E2, A> => (v._tag === "Failure" ? Failure(f(v.errors)) : v);

/**
 * Lift a value into a successful Validation.
 */
export const of = <A>(a: A): Validation<never, A> => Success(a);

/**
 * Pattern match on Validation.
 *
 * @param onFail Called with accumulated errors
 * @param onSucc Called with the success value
 */
export const fold = <E, A, B>(
  onFail: (errs: E[]) => B,
  onSucc: (a: A) => B,
  v: Validation<E, A>
): B => (v._tag === "Failure" ? onFail(v.errors) : onSucc(v.value));

/**
 * Extract the success value or fall back to a default.
 */
export const getOrElse = <E, A>(defaultValue: A, v: Validation<E, A>): A =>
  v._tag === "Success" ? v.value : defaultValue;

/**
 * Extract the success value or compute a fallback based on the errors.
 */
export const getOrElseW = <E, A, B>(
  onFailure: (errs: E[]) => B,
  v: Validation<E, A>
): A | B => (v._tag === "Success" ? v.value : onFailure(v.errors));

/**
 * Type guard: check if Validation is Failure.
 */
export const isFailure = <E, A>(
  v: Validation<E, A>
): v is Validation<E, never> => v._tag === "Failure";

/**
 * Type guard: check if Validation is Success.
 */
export const isSuccess = <E, A>(
  v: Validation<E, A>
): v is Validation<never, A> => v._tag === "Success";

/**
 * Create a failure from a single error.
 */
export const fail = <E>(error: E): Validation<E, never> => Failure([error]);

/**
 * Alternative operator:
 * - returns the first Success
 * - if both are Failure, errors accumulate
 */
export const alt = <E, A>(
  v1: Validation<E, A>,
  v2: Validation<E, A>
): Validation<E, A> => {
  if (v1._tag === "Success") return v1;
  if (v2._tag === "Success") return v2;
  return Failure([...v1.errors, ...v2.errors]);
};

/**
 * Combine a list of Validations, accumulating ALL errors.
 *
 * - If any failures exist → return `Failure(all errors)`
 * - Otherwise → return `Success(array of all values)`
 */
export const combine = <E, A>(
  validations: Validation<E, A>[]
): Validation<E, A[]> => {
  const successes: A[] = [];
  const errors: E[] = [];

  for (const v of validations) {
    if (v._tag === "Success") successes.push(v.value);
    else errors.push(...v.errors);
  }

  return errors.length > 0 ? Failure(errors) : Success(successes);
};

/**
 * Traverse an array, applying a Validation-producing function `f`.
 *
 * - Accumulates ALL errors across the entire array.
 * - Equivalent to `Applicative` traversal.
 */
export const traverse = <E, A, B>(
  f: (a: A) => Validation<E, B>,
  arr: A[]
): Validation<E, B[]> => {
  const results: B[] = [];
  const errors: E[] = [];

  for (const a of arr) {
    const vb = f(a);
    if (vb._tag === "Success") results.push(vb.value);
    else errors.push(...vb.errors);
  }

  return errors.length > 0 ? Failure(errors) : Success(results);
};

/**
 * Sequence an array of Validations.
 *
 * Equivalent to: `traverse(x => x)`
 */
export const sequence = <E, A>(arr: Validation<E, A>[]): Validation<E, A[]> =>
  traverse((x) => x, arr);

/**
 * Lift a predicate into Validation.
 *
 * - If predicate holds → Success(a)
 * - If predicate fails → Failure([onFalse(a)])
 */
export const fromPredicate =
  <E, A>(predicate: (a: A) => boolean, onFalse: (a: A) => E) =>
  (a: A): Validation<E, A> =>
    predicate(a) ? Success(a) : fail(onFalse(a));

/**
 * Namespace-style export object for ergonomic importing.
 *
 * @example
 * import { Validation } from "algebraic-fx/adt/validation";
 */
export const Validation = {
  Failure,
  Success,
  map,
  ap,
  chain,
  bimap,
  mapErrors,
  of,
  fold,
  getOrElse,
  getOrElseW,
  isFailure,
  isSuccess,
  fail,
  alt,
  combine,
  traverse,
  sequence,
  fromPredicate,
};

export default Validation;
