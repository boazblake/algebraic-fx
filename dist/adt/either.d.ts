/**
 * Unique brand to nominally type Either values, preventing structural collisions.
 */
declare const EitherBrand: unique symbol;
/**
 * Left value of Either.
 *
 * Represents failure or alternate branch.
 *
 * @typeParam L Error or alternate type
 */
export type Left<L> = {
    _tag: "Left";
    left: L;
};
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
export declare const Left: <L>(l: L) => Either<L, never>;
/**
 * Construct a Right value (success).
 */
export declare const Right: <R>(r: R) => Either<never, R>;
/**
 * Functor map: transform the Right value, preserve Left as-is.
 */
export declare const map: <L, A, B>(f: (a: A) => B, e: Either<L, A>) => Either<L, B>;
/**
 * Applicative apply: apply a Right-wrapped function to a Right-wrapped value.
 */
export declare const ap: <L, A, B>(ef: Either<L, (a: A) => B>, ea: Either<L, A>) => Either<L, B>;
/**
 * Monad chain: bind the Right value to the next computation, short-circuiting on Left.
 */
export declare const chain: <L, A, B>(f: (a: A) => Either<L, B>, e: Either<L, A>) => Either<L, B>;
/**
 * Bifunctor map over Left OR Right.
 */
export declare const bimap: <L, A, L2, B>(onLeft: (l: L) => L2, onRight: (a: A) => B, e: Either<L, A>) => Either<L2, B>;
/**
 * Map only the Left (error) side.
 */
export declare const mapLeft: <L, A, L2>(f: (l: L) => L2, e: Either<L, A>) => Either<L2, A>;
/**
 * Pattern match for Either.
 */
export declare const fold: <L, A, B>(onLeft: (l: L) => B, onRight: (a: A) => B, e: Either<L, A>) => B;
/**
 * Lift a value into Right (pure).
 */
export declare const of: <A>(a: A) => Either<never, A>;
/**
 * Extract the Right or fallback to a default.
 */
export declare const getOrElse: <L, A>(defaultValue: A, e: Either<L, A>) => A;
/**
 * Extract Right or compute fallback.
 */
export declare const getOrElseW: <L, A, B>(onLeft: (l: L) => B, e: Either<L, A>) => A | B;
/**
 * Alternative: return the first Right encountered.
 */
export declare const alt: <L, A>(e1: Either<L, A>, e2: Either<L, A>) => Either<L, A>;
/**
 * Type guard: check if e is Left.
 */
export declare const isLeft: <L, A>(e: Either<L, A>) => e is Either<L, never>;
/**
 * Type guard: check if e is Right.
 */
export declare const isRight: <L, A>(e: Either<L, A>) => e is Either<never, A>;
/**
 * Convert nullable to Either.
 *
 * @example
 * fromNullable("missing")(null)    // Left("missing")
 * fromNullable("missing")(42)      // Right(42)
 */
export declare const fromNullable: <L>(onNull: L) => <A>(a: A | null | undefined) => Either<L, NonNullable<A>>;
/**
 * Try/catch wrapper for synchronous code.
 */
export declare const tryCatch: <A>(f: () => A) => Either<unknown, A>;
/**
 * Try/catch wrapper with custom error mapping.
 */
export declare const tryCatchK: <E, A>(f: () => A, onError: (e: unknown) => E) => Either<E, A>;
/**
 * Swap Left and Right positions.
 */
export declare const swap: <L, A>(e: Either<L, A>) => Either<A, L>;
/**
 * Keep Right only if predicate succeeds; otherwise convert to Left.
 */
export declare const filterOrElse: <L, A>(predicate: (a: A) => boolean, onFalse: (a: A) => L, e: Either<L, A>) => Either<L, A>;
/**
 * Traverse an array, short-circuiting on Left.
 */
export declare const traverse: <L, A, B>(f: (a: A) => Either<L, B>, arr: A[]) => Either<L, B[]>;
/**
 * Sequence an array of Eithers into Either of array.
 */
export declare const sequence: <L, A>(arr: Either<L, A>[]) => Either<L, A[]>;
/**
 * Unified namespace export.
 */
export declare const Either: {
    Left: <L>(l: L) => Either<L, never>;
    Right: <R>(r: R) => Either<never, R>;
    map: <L, A, B>(f: (a: A) => B, e: Either<L, A>) => Either<L, B>;
    ap: <L, A, B>(ef: Either<L, (a: A) => B>, ea: Either<L, A>) => Either<L, B>;
    chain: <L, A, B>(f: (a: A) => Either<L, B>, e: Either<L, A>) => Either<L, B>;
    bimap: <L, A, L2, B>(onLeft: (l: L) => L2, onRight: (a: A) => B, e: Either<L, A>) => Either<L2, B>;
    mapLeft: <L, A, L2>(f: (l: L) => L2, e: Either<L, A>) => Either<L2, A>;
    fold: <L, A, B>(onLeft: (l: L) => B, onRight: (a: A) => B, e: Either<L, A>) => B;
    of: <A>(a: A) => Either<never, A>;
    getOrElse: <L, A>(defaultValue: A, e: Either<L, A>) => A;
    getOrElseW: <L, A, B>(onLeft: (l: L) => B, e: Either<L, A>) => A | B;
    alt: <L, A>(e1: Either<L, A>, e2: Either<L, A>) => Either<L, A>;
    isLeft: <L, A>(e: Either<L, A>) => e is Either<L, never>;
    isRight: <L, A>(e: Either<L, A>) => e is Either<never, A>;
    fromNullable: <L>(onNull: L) => <A>(a: A | null | undefined) => Either<L, NonNullable<A>>;
    tryCatch: <A>(f: () => A) => Either<unknown, A>;
    tryCatchK: <E, A>(f: () => A, onError: (e: unknown) => E) => Either<E, A>;
    swap: <L, A>(e: Either<L, A>) => Either<A, L>;
    filterOrElse: <L, A>(predicate: (a: A) => boolean, onFalse: (a: A) => L, e: Either<L, A>) => Either<L, A>;
    traverse: <L, A, B>(f: (a: A) => Either<L, B>, arr: A[]) => Either<L, B[]>;
    sequence: <L, A>(arr: Either<L, A>[]) => Either<L, A[]>;
};
export default Either;
//# sourceMappingURL=either.d.ts.map