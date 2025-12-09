/**
 * Unique nominal brand for Reader. Ensures Readers cannot be confused with plain
 * objects of the same structural shape.
 */
declare const ReaderBrand: unique symbol;
/**
 * The Reader monad (also known as the environment monad).
 *
 * `Reader<E, A>` represents a computation that depends on an environment `E`
 * and produces a value `A`.
 *
 * It provides:
 * - Dependency injection
 * - Pure environment access
 * - Composition without manually threading env everywhere
 *
 * Conceptually:
 *    Reader<E, A>  ≅  (env: E) => A
 *
 * @typeParam E The environment type
 * @typeParam A The produced value
 */
export type Reader<E, A> = {
    readonly [ReaderBrand]: true;
    /** Execute the computation using the provided environment. */
    run: (env: E) => A;
    /** Functor map: transform the output value while leaving environment access untouched. */
    map: <B>(f: (a: A) => B) => Reader<E, B>;
    /**
     * Monad chain / flatMap:
     * Feed the result of this Reader into another Reader-producing function,
     * using the same environment.
     */
    chain: <B>(f: (a: A) => Reader<E, B>) => Reader<E, B>;
    /**
     * Applicative apply:
     * Apply an environment-dependent function to an environment-dependent value.
     */
    ap: <B>(fb: Reader<E, (a: A) => B>) => Reader<E, B>;
};
/**
 * Construct a Reader from a function `(env: E) => A`.
 *
 * @param run Environment-dependent computation
 */
export declare const Reader: {
    <E, A>(run: (env: E) => A): Reader<E, A>;
    of<E, A>(a: A): Reader<E, A>;
    ask<E>(): Reader<E, E>;
    asks<E, A>(f: (env: E) => A): Reader<E, A>;
    map<E, A, B>(f: (a: A) => B): (r: Reader<E, A>) => Reader<E, B>;
    chain<E, A, B>(f: (a: A) => Reader<E, B>): (r: Reader<E, A>) => Reader<E, B>;
    ap<E, A, B>(fb: Reader<E, (a: A) => B>): (fa: Reader<E, A>) => Reader<E, B>;
    run<E, A>(env: E): (r: Reader<E, A>) => A;
    local<E1, E2, A>(f: (env: E1) => E2): (r: Reader<E2, A>) => Reader<E1, A>;
    sequence<E, A>(readers: Reader<E, A>[]): Reader<E, A[]>;
    traverse<E, A, B>(f: (a: A) => Reader<E, B>): (arr: A[]) => Reader<E, B[]>;
};
/** Default export for ergonomic imports. */
export default Reader;
//# sourceMappingURL=reader.d.ts.map