export type Left<L> = {
    _tag: "Left";
    left: L;
};
export type Right<R> = {
    _tag: "Right";
    right: R;
};
export type Either<L, R> = Left<L> | Right<R>;
/** Constructors */
export declare const Left: <L>(l: L) => Either<L, never>;
export declare const Right: <R>(r: R) => Either<never, R>;
/** Functor map */
export declare const map: <L, A, B>(f: (a: A) => B, e: Either<L, A>) => Either<L, B>;
/** Monad chain */
export declare const chain: <L, A, B>(f: (a: A) => Either<L, B>, e: Either<L, A>) => Either<L, B>;
/** Fold (pattern match) */
export declare const fold: <L, A, B>(onLeft: (l: L) => B, onRight: (a: A) => B, e: Either<L, A>) => B;
/** Applicative */
export declare const of: <A>(a: A) => Either<never, A>;
/** Combine as a single runtime object (so Either.Right() works) */
export declare const Either: {
    Left: <L>(l: L) => Either<L, never>;
    Right: <R>(r: R) => Either<never, R>;
    map: <L, A, B>(f: (a: A) => B, e: Either<L, A>) => Either<L, B>;
    chain: <L, A, B>(f: (a: A) => Either<L, B>, e: Either<L, A>) => Either<L, B>;
    fold: <L, A, B>(onLeft: (l: L) => B, onRight: (a: A) => B, e: Either<L, A>) => B;
    of: <A>(a: A) => Either<never, A>;
};
export default Either;
