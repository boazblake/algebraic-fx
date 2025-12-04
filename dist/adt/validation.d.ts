/**
 * Unique brand ensuring Validation values are nominally typed.
 * Prevents accidental mixing with plain objects of identical shape.
 */
declare const ValidationBrand: unique symbol;
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
export type Validation<E, A> = ({
    _tag: "Failure";
    errors: E[];
} & {
    readonly [ValidationBrand]: true;
}) | ({
    _tag: "Success";
    value: A;
} & {
    readonly [ValidationBrand]: true;
});
/**
 * Construct a failing Validation from an array of errors.
 *
 * @example
 * Failure(["invalid email"])
 */
export declare const Failure: <E>(errors: E[]) => Validation<E, never>;
/**
 * Construct a successful Validation containing a value.
 *
 * @example
 * Success(42)
 */
export declare const Success: <A>(value: A) => Validation<never, A>;
/**
 * Functor map over a successful Validation.
 * If the value is `Success(a)`, returns `Success(f(a))`.
 * If `Failure`, returns unchanged.
 */
export declare const map: <E, A, B>(f: (a: A) => B, v: Validation<E, A>) => Validation<E, B>;
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
export declare const ap: <E, A, B>(vf: Validation<E, (a: A) => B>, va: Validation<E, A>) => Validation<E, B>;
/**
 * Monad chain for Validation.
 *
 * Important:
 * - `chain` *short-circuits* like Either, NOT accumulating errors.
 *   Use here only for sequential validation that should stop on the first error.
 */
export declare const chain: <E, A, B>(f: (a: A) => Validation<E, B>, v: Validation<E, A>) => Validation<E, B>;
/**
 * Map over both Failure and Success branches.
 */
export declare const bimap: <E, A, E2, B>(onFailure: (errs: E[]) => E2[], onSuccess: (a: A) => B, v: Validation<E, A>) => Validation<E2, B>;
/**
 * Map only the error list.
 */
export declare const mapErrors: <E, A, E2>(f: (errs: E[]) => E2[], v: Validation<E, A>) => Validation<E2, A>;
/**
 * Lift a value into a successful Validation.
 */
export declare const of: <A>(a: A) => Validation<never, A>;
/**
 * Pattern match on Validation.
 *
 * @param onFail Called with accumulated errors
 * @param onSucc Called with the success value
 */
export declare const fold: <E, A, B>(onFail: (errs: E[]) => B, onSucc: (a: A) => B, v: Validation<E, A>) => B;
/**
 * Extract the success value or fall back to a default.
 */
export declare const getOrElse: <E, A>(defaultValue: A, v: Validation<E, A>) => A;
/**
 * Extract the success value or compute a fallback based on the errors.
 */
export declare const getOrElseW: <E, A, B>(onFailure: (errs: E[]) => B, v: Validation<E, A>) => A | B;
/**
 * Type guard: check if Validation is Failure.
 */
export declare const isFailure: <E, A>(v: Validation<E, A>) => v is Validation<E, never>;
/**
 * Type guard: check if Validation is Success.
 */
export declare const isSuccess: <E, A>(v: Validation<E, A>) => v is Validation<never, A>;
/**
 * Create a failure from a single error.
 */
export declare const fail: <E>(error: E) => Validation<E, never>;
/**
 * Alternative operator:
 * - returns the first Success
 * - if both are Failure, errors accumulate
 */
export declare const alt: <E, A>(v1: Validation<E, A>, v2: Validation<E, A>) => Validation<E, A>;
/**
 * Combine a list of Validations, accumulating ALL errors.
 *
 * - If any failures exist → return `Failure(all errors)`
 * - Otherwise → return `Success(array of all values)`
 */
export declare const combine: <E, A>(validations: Validation<E, A>[]) => Validation<E, A[]>;
/**
 * Traverse an array, applying a Validation-producing function `f`.
 *
 * - Accumulates ALL errors across the entire array.
 * - Equivalent to `Applicative` traversal.
 */
export declare const traverse: <E, A, B>(f: (a: A) => Validation<E, B>, arr: A[]) => Validation<E, B[]>;
/**
 * Sequence an array of Validations.
 *
 * Equivalent to: `traverse(x => x)`
 */
export declare const sequence: <E, A>(arr: Validation<E, A>[]) => Validation<E, A[]>;
/**
 * Lift a predicate into Validation.
 *
 * - If predicate holds → Success(a)
 * - If predicate fails → Failure([onFalse(a)])
 */
export declare const fromPredicate: <E, A>(predicate: (a: A) => boolean, onFalse: (a: A) => E) => (a: A) => Validation<E, A>;
/**
 * Namespace-style export object for ergonomic importing.
 *
 * @example
 * import { Validation } from "algebraic-fx/adt/validation";
 */
export declare const Validation: {
    Failure: <E>(errors: E[]) => Validation<E, never>;
    Success: <A>(value: A) => Validation<never, A>;
    map: <E, A, B>(f: (a: A) => B, v: Validation<E, A>) => Validation<E, B>;
    ap: <E, A, B>(vf: Validation<E, (a: A) => B>, va: Validation<E, A>) => Validation<E, B>;
    chain: <E, A, B>(f: (a: A) => Validation<E, B>, v: Validation<E, A>) => Validation<E, B>;
    bimap: <E, A, E2, B>(onFailure: (errs: E[]) => E2[], onSuccess: (a: A) => B, v: Validation<E, A>) => Validation<E2, B>;
    mapErrors: <E, A, E2>(f: (errs: E[]) => E2[], v: Validation<E, A>) => Validation<E2, A>;
    of: <A>(a: A) => Validation<never, A>;
    fold: <E, A, B>(onFail: (errs: E[]) => B, onSucc: (a: A) => B, v: Validation<E, A>) => B;
    getOrElse: <E, A>(defaultValue: A, v: Validation<E, A>) => A;
    getOrElseW: <E, A, B>(onFailure: (errs: E[]) => B, v: Validation<E, A>) => A | B;
    isFailure: <E, A>(v: Validation<E, A>) => v is Validation<E, never>;
    isSuccess: <E, A>(v: Validation<E, A>) => v is Validation<never, A>;
    fail: <E>(error: E) => Validation<E, never>;
    alt: <E, A>(v1: Validation<E, A>, v2: Validation<E, A>) => Validation<E, A>;
    combine: <E, A>(validations: Validation<E, A>[]) => Validation<E, A[]>;
    traverse: <E, A, B>(f: (a: A) => Validation<E, B>, arr: A[]) => Validation<E, B[]>;
    sequence: <E, A>(arr: Validation<E, A>[]) => Validation<E, A[]>;
    fromPredicate: <E, A>(predicate: (a: A) => boolean, onFalse: (a: A) => E) => (a: A) => Validation<E, A>;
};
export default Validation;
//# sourceMappingURL=validation.d.ts.map