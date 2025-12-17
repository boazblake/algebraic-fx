// src/adt/validation.ts
import { fl } from "./fl.js";
// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------
export const failure = (e) => ({
    _tag: "Failure",
    left: e,
});
export const success = (a) => ({
    _tag: "Success",
    right: a,
});
export const of = (a) => success(a);
// -----------------------------------------------------------------------------
// Type guards
// -----------------------------------------------------------------------------
export const isFailure = (v) => v._tag === "Failure";
export const isSuccess = (v) => v._tag === "Success";
export const isValidation = (u) => (!!u && typeof u === "object" && u._tag === "Failure") ||
    u._tag === "Success";
// -----------------------------------------------------------------------------
// Core combinators
// -----------------------------------------------------------------------------
export const map = (f) => (fa) => isSuccess(fa) ? success(f(fa.right)) : fa;
export const mapFailure = (f) => (fa) => isFailure(fa) ? failure(f(fa.left)) : fa;
export const bimap = (f, g) => (fa) => isFailure(fa)
    ? failure(f(fa.left))
    : success(g(fa.right));
// Pattern matching
export const match = (onFailure, onSuccess) => (fa) => isFailure(fa) ? onFailure(fa.left) : onSuccess(fa.right);
export const getOrElse = (onFailure) => (fa) => isFailure(fa) ? onFailure() : fa.right;
// Constructors from other shapes
export const fromPredicate = (pred, onFalse) => (a) => pred(a) ? success(a) : failure(onFalse(a));
export const fromNullable = (onNull) => (a) => a == null ? failure(onNull()) : success(a);
export const semigroupString = {
    concat: (x, y) => x + y,
};
export const semigroupArray = () => ({
    concat: (xs, ys) => xs.concat(ys),
});
// -----------------------------------------------------------------------------
// Applicative instance factory
// -----------------------------------------------------------------------------
export const getValidationApplicative = (S) => {
    const ap = (fab, fa) => {
        if (isFailure(fab) && isFailure(fa)) {
            return failure(S.concat(fab.left, fa.left));
        }
        if (isFailure(fab))
            return fab;
        if (isFailure(fa))
            return fa;
        const f = fab.right;
        // Handle functions of any arity.
        try {
            return success(f(fa.right));
        }
        catch {
            // If f does not accept an argument, treat as constant function.
            return success(f());
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
//# sourceMappingURL=validation.js.map