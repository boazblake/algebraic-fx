/**
 * Unique nominal brand for IO values.
 * Ensures IO cannot be confused with plain objects.
 */
declare const IOBrand: unique symbol;
/**
 * IO<A> represents a *lazy*, *purely described* effect that produces a value of type A.
 *
 * IO does not execute until `.run()` is called.
 *
 * Characteristics:
 * - Lazy by default (no side effects until explicitly run)
 * - Referentially transparent (IO(() => x) always describes the same effect)
 * - Composable with map, chain, and ap
 *
 * Equivalent to:
 *     IO<A> ≅ () => A
 *
 * @typeParam A The produced value type
 */
export type IO<A> = {
    readonly [IOBrand]: true;
    /** Execute the effect and return the value. */
    run: () => A;
    /** Functor map: transform the result of running the IO. */
    map: <B>(f: (a: A) => B) => IO<B>;
    /**
     * Monad chain / flatMap:
     * Feed the result into another IO-producing function.
     *
     * IO(() => a).chain(x => IO(() => f(x)))
     */
    chain: <B>(f: (a: A) => IO<B>) => IO<B>;
    /**
     * Applicative apply:
     * Apply an IO that produces a function to an IO that produces a value.
     */
    ap: <B>(fb: IO<(a: A) => B>) => IO<B>;
};
/**
 * Construct a new lazy IO effect.
 *
 * @param run A function describing the effect
 */
export declare const IO: {
    <A>(run: () => A): IO<A>;
    of<A>(a: A): IO<A>;
    map<A, B>(f: (a: A) => B): (io: IO<A>) => IO<B>;
    chain<A, B>(f: (a: A) => IO<B>): (io: IO<A>) => IO<B>;
    ap<A, B>(fb: IO<(a: A) => B>): (fa: IO<A>) => IO<B>;
    run<A>(io: IO<A>): A;
    sequence<A>(ios: IO<A>[]): IO<A[]>;
    traverse<A, B>(f: (a: A) => IO<B>): (arr: A[]) => IO<B[]>;
    tryCatch<A>(f: () => A, onError: (e: unknown) => A): IO<A>;
};
/**
 * Default export for convenience.
 */
export default IO;
//# sourceMappingURL=io.d.ts.map