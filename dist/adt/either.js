/**
 * Unique brand to nominally type Either values, preventing structural collisions.
 */
const EitherBrand = Symbol("EitherBrand");
/**
 * Construct a Left value (failure).
 */
export const Left = (l) => ({
    _tag: "Left",
    left: l,
    [EitherBrand]: true,
});
/**
 * Construct a Right value (success).
 */
export const Right = (r) => ({
    _tag: "Right",
    right: r,
    [EitherBrand]: true,
});
/**
 * Functor map: transform the Right value, preserve Left as-is.
 */
export const map = (f, e) => e._tag === "Right" ? Right(f(e.right)) : e;
/**
 * Applicative apply: apply a Right-wrapped function to a Right-wrapped value.
 */
export const ap = (ef, ea) => {
    if (ef._tag === "Left")
        return Left(ef.left);
    if (ea._tag === "Left")
        return Left(ea.left);
    return Right(ef.right(ea.right));
};
/**
 * Monad chain: bind the Right value to the next computation, short-circuiting on Left.
 */
export const chain = (f, e) => (e._tag === "Right" ? f(e.right) : e);
/**
 * Bifunctor map over Left OR Right.
 */
export const bimap = (onLeft, onRight, e) => e._tag === "Left" ? Left(onLeft(e.left)) : Right(onRight(e.right));
/**
 * Map only the Left (error) side.
 */
export const mapLeft = (f, e) => (e._tag === "Left" ? Left(f(e.left)) : e);
/**
 * Pattern match for Either.
 */
export const fold = (onLeft, onRight, e) => (e._tag === "Left" ? onLeft(e.left) : onRight(e.right));
/**
 * Lift a value into Right (pure).
 */
export const of = (a) => Right(a);
/**
 * Extract the Right or fallback to a default.
 */
export const getOrElse = (defaultValue, e) => e._tag === "Right" ? e.right : defaultValue;
/**
 * Extract Right or compute fallback.
 */
export const getOrElseW = (onLeft, e) => (e._tag === "Right" ? e.right : onLeft(e.left));
/**
 * Alternative: return the first Right encountered.
 */
export const alt = (e1, e2) => e1._tag === "Right" ? e1 : e2;
/**
 * Type guard: check if e is Left.
 */
export const isLeft = (e) => e._tag === "Left";
/**
 * Type guard: check if e is Right.
 */
export const isRight = (e) => e._tag === "Right";
/**
 * Convert nullable to Either.
 *
 * @example
 * fromNullable("missing")(null)    // Left("missing")
 * fromNullable("missing")(42)      // Right(42)
 */
export const fromNullable = (onNull) => (a) => a == null ? Left(onNull) : Right(a);
/**
 * Try/catch wrapper for synchronous code.
 */
export const tryCatch = (f) => {
    try {
        return Right(f());
    }
    catch (e) {
        return Left(e);
    }
};
/**
 * Try/catch wrapper with custom error mapping.
 */
export const tryCatchK = (f, onError) => {
    try {
        return Right(f());
    }
    catch (e) {
        return Left(onError(e));
    }
};
/**
 * Swap Left and Right positions.
 */
export const swap = (e) => e._tag === "Left" ? Right(e.left) : Left(e.right);
/**
 * Keep Right only if predicate succeeds; otherwise convert to Left.
 */
export const filterOrElse = (predicate, onFalse, e) => e._tag === "Right" && !predicate(e.right) ? Left(onFalse(e.right)) : e;
/**
 * Traverse an array, short-circuiting on Left.
 */
export const traverse = (f, arr) => {
    const result = [];
    for (const a of arr) {
        const eb = f(a);
        if (eb._tag === "Left")
            return eb;
        result.push(eb.right);
    }
    return Right(result);
};
/**
 * Sequence an array of Eithers into Either of array.
 */
export const sequence = (arr) => traverse((x) => x, arr);
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
//# sourceMappingURL=either.js.map