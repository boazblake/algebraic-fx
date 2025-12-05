/**
 * Unique brand ensuring Validation values are nominally typed.
 * Prevents accidental mixing with plain objects of identical shape.
 */
const ValidationBrand = Symbol("ValidationBrand");
/**
 * Construct a failing Validation from an array of errors.
 *
 * @example
 * Failure(["invalid email"])
 */
export const Failure = (errors) => ({
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
export const Success = (value) => ({
    _tag: "Success",
    value,
    [ValidationBrand]: true,
});
/**
 * Functor map over a successful Validation.
 * If the value is `Success(a)`, returns `Success(f(a))`.
 * If `Failure`, returns unchanged.
 */
export const map = (f, v) => (v._tag === "Success" ? Success(f(v.value)) : v);
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
export const ap = (vf, va) => {
    if (vf._tag === "Failure" && va._tag === "Failure")
        return Failure([...vf.errors, ...va.errors]);
    if (vf._tag === "Failure")
        return vf;
    if (va._tag === "Failure")
        return va;
    return Success(vf.value(va.value));
};
/**
 * Monad chain for Validation.
 *
 * Important:
 * - `chain` *short-circuits* like Either, NOT accumulating errors.
 *   Use here only for sequential validation that should stop on the first error.
 */
export const chain = (f, v) => (v._tag === "Success" ? f(v.value) : v);
/**
 * Map over both Failure and Success branches.
 */
export const bimap = (onFailure, onSuccess, v) => v._tag === "Failure"
    ? Failure(onFailure(v.errors))
    : Success(onSuccess(v.value));
/**
 * Map only the error list.
 */
export const mapErrors = (f, v) => (v._tag === "Failure" ? Failure(f(v.errors)) : v);
/**
 * Lift a value into a successful Validation.
 */
export const of = (a) => Success(a);
/**
 * Pattern match on Validation.
 *
 * @param onFail Called with accumulated errors
 * @param onSucc Called with the success value
 */
export const fold = (onFail, onSucc, v) => (v._tag === "Failure" ? onFail(v.errors) : onSucc(v.value));
/**
 * Extract the success value or fall back to a default.
 */
export const getOrElse = (defaultValue, v) => v._tag === "Success" ? v.value : defaultValue;
/**
 * Extract the success value or compute a fallback based on the errors.
 */
export const getOrElseW = (onFailure, v) => (v._tag === "Success" ? v.value : onFailure(v.errors));
/**
 * Type guard: check if Validation is Failure.
 */
export const isFailure = (v) => v._tag === "Failure";
/**
 * Type guard: check if Validation is Success.
 */
export const isSuccess = (v) => v._tag === "Success";
/**
 * Create a failure from a single error.
 */
export const fail = (error) => Failure([error]);
/**
 * Alternative operator:
 * - returns the first Success
 * - if both are Failure, errors accumulate
 */
export const alt = (v1, v2) => {
    if (v1._tag === "Success")
        return v1;
    if (v2._tag === "Success")
        return v2;
    return Failure([...v1.errors, ...v2.errors]);
};
/**
 * Combine a list of Validations, accumulating ALL errors.
 *
 * - If any failures exist → return `Failure(all errors)`
 * - Otherwise → return `Success(array of all values)`
 */
export const combine = (validations) => {
    const successes = [];
    const errors = [];
    for (const v of validations) {
        if (v._tag === "Success")
            successes.push(v.value);
        else
            errors.push(...v.errors);
    }
    return errors.length > 0 ? Failure(errors) : Success(successes);
};
/**
 * Traverse an array, applying a Validation-producing function `f`.
 *
 * - Accumulates ALL errors across the entire array.
 * - Equivalent to `Applicative` traversal.
 */
export const traverse = (f, arr) => {
    const results = [];
    const errors = [];
    for (const a of arr) {
        const vb = f(a);
        if (vb._tag === "Success")
            results.push(vb.value);
        else
            errors.push(...vb.errors);
    }
    return errors.length > 0 ? Failure(errors) : Success(results);
};
/**
 * Sequence an array of Validations.
 *
 * Equivalent to: `traverse(x => x)`
 */
export const sequence = (arr) => traverse((x) => x, arr);
/**
 * Lift a predicate into Validation.
 *
 * - If predicate holds → Success(a)
 * - If predicate fails → Failure([onFalse(a)])
 */
export const fromPredicate = (predicate, onFalse) => (a) => predicate(a) ? Success(a) : fail(onFalse(a));
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
//# sourceMappingURL=validation.js.map