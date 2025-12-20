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
export declare const isLeft: <E, A>(fa: Either<E, A>) => fa is Left<E>;
export declare const isRight: <E, A>(fa: Either<E, A>) => fa is Right<A>;
export declare const left: <E = never, A = never>(e: E) => Either<E, A>;
export declare const right: <E = never, A = never>(a: A) => Either<E, A>;
/**
 * Applicative "of" injects a value in the Right side.
 */
export declare const of: <A>(a: A) => Either<never, A>;
/**
 * Functor map.
 */
export declare const map: <E, A, B>(fa: Either<E, A>, f: (a: A) => B) => Either<E, B>;
/**
 * Map over the Left side.
 */
export declare const mapLeft: <E, A, F>(fa: Either<E, A>, f: (e: E) => F) => Either<F, A>;
/**
 * Bimap over both sides.
 */
export declare const bimap: <E, A, F, B>(fa: Either<E, A>, f: (e: E) => F, g: (a: A) => B) => Either<F, B>;
/**
 * Apply. If either side is Left, it short circuits.
 */
export declare const ap: <E, A, B>(fab: Either<E, (a: A) => B>, fa: Either<E, A>) => Either<E, B>;
/**
 * Monad chain.
 */
export declare const chain: <E, A, B>(fa: Either<E, A>, f: (a: A) => Either<E, B>) => Either<E, B>;
/**
 * Swap Left and Right.
 */
export declare const swap: <E, A>(fa: Either<E, A>) => Either<A, E>;
/**
 * Pattern match.
 */
export declare const match: <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) => (fa: Either<E, A>) => B;
/**
 * Same as match but flipped argument order, aligns with maybe().
 */
export declare const either: <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) => (fa: Either<E, A>) => B;
/**
 * Extract with default for Left.
 */
export declare const getOrElse: <E, A>(onLeft: (e: E) => A) => (fa: Either<E, A>) => A;
/**
 * Build Either from nullable value.
 */
export declare const fromNullable: <E>(onNull: () => E) => <A>(a: A | null | undefined) => Either<E, A>;
/**
 * Build Either from predicate.
 */
export declare const fromPredicate: <E, A>(predicate: (a: A) => boolean, onFalse: (a: A) => E) => (a: A) => Either<E, A>;
/**
 * Effectful construction with error capture.
 */
export declare const tryCatch: <E, A>(thunk: () => A, onThrow: (u: unknown) => E) => Either<E, A>;
/**
 * Narrow type guard for Either values.
 */
export declare const isEither: (u: unknown) => u is Either<unknown, unknown>;
/**
 * fp ts style module dictionary.
 */
export declare const EitherModule: {
    URI: string;
    left: <E = never, A = never>(e: E) => Either<E, A>;
    right: <E = never, A = never>(a: A) => Either<E, A>;
    of: <A>(a: A) => Either<never, A>;
    isLeft: <E, A>(fa: Either<E, A>) => fa is Left<E>;
    isRight: <E, A>(fa: Either<E, A>) => fa is Right<A>;
    map: <E, A, B>(fa: Either<E, A>, f: (a: A) => B) => Either<E, B>;
    mapLeft: <E, A, F>(fa: Either<E, A>, f: (e: E) => F) => Either<F, A>;
    bimap: <E, A, F, B>(fa: Either<E, A>, f: (e: E) => F, g: (a: A) => B) => Either<F, B>;
    ap: <E, A, B>(fab: Either<E, (a: A) => B>, fa: Either<E, A>) => Either<E, B>;
    chain: <E, A, B>(fa: Either<E, A>, f: (a: A) => Either<E, B>) => Either<E, B>;
    swap: <E, A>(fa: Either<E, A>) => Either<A, E>;
    match: <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) => (fa: Either<E, A>) => B;
    either: <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) => (fa: Either<E, A>) => B;
    getOrElse: <E, A>(onLeft: (e: E) => A) => (fa: Either<E, A>) => A;
    fromNullable: <E>(onNull: () => E) => <A>(a: A | null | undefined) => Either<E, A>;
    fromPredicate: <E, A>(predicate: (a: A) => boolean, onFalse: (a: A) => E) => (a: A) => Either<E, A>;
    tryCatch: <E, A>(thunk: () => A, onThrow: (u: unknown) => E) => Either<E, A>;
    isEither: (u: unknown) => u is Either<unknown, unknown>;
    [fl_of]: <A>(a: A) => Either<never, A>;
};
//# sourceMappingURL=either.d.ts.map