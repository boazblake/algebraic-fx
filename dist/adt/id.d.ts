/**
 * Nominal brand for Identity values, preventing structural collisions.
 */
declare const IdBrand: unique symbol;
/**
 * Identity monad.
 *
 * Represents a pure wrapped value `A` and supports:
 * - Functor map
 * - Monad chain
 * - Applicative apply
 *
 * Conceptually:
 *   Id<A> ≅ A
 *
 * It is primarily used to unify APIs that expect a monadic interface
 * even when effects are not needed.
 *
 * @typeParam A Wrapped value type
 */
export type Id<A> = {
    readonly [IdBrand]: true;
    /** Extract the wrapped value. */
    run: () => A;
    /** Functor map. */
    map: <B>(f: (a: A) => B) => Id<B>;
    /** Monad chain. */
    chain: <B>(f: (a: A) => Id<B>) => Id<B>;
    /** Applicative apply. */
    ap: <B>(fb: Id<(a: A) => B>) => Id<B>;
};
/**
 * Identity constructor.
 *
 * @param a Wrapped value
 */
export declare const Id: {
    <A>(a: A): Id<A>;
    of<A>(a: A): Id<A>;
    ap<A, B>(fb: Id<(a: A) => B>): (fa: Id<A>) => Id<B>;
    map<A, B>(f: (a: A) => B): (id: Id<A>) => Id<B>;
    chain<A, B>(f: (a: A) => Id<B>): (id: Id<A>) => Id<B>;
    run<A>(id: Id<A>): A;
    extract<A>(id: Id<A>): A;
};
/**
 * Default export for ergonomic usage.
 */
export default Id;
//# sourceMappingURL=id.d.ts.map