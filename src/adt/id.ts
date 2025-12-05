/**
 * Nominal brand for Identity values, preventing structural collisions.
 */
const IdBrand = Symbol("IdBrand");

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
export const Id = <A>(a: A): Id<A> => ({
  [IdBrand]: true,
  run: () => a,
  map: (f) => Id(f(a)),
  chain: (f) => f(a),
  ap: (fb) => Id(fb.run()(a)),
});

/**
 * Lift a pure value into the Identity monad.
 */
Id.of = <A>(a: A): Id<A> => Id(a);

/**
 * Point-free applicative apply.
 */
Id.ap =
  <A, B>(fb: Id<(a: A) => B>) =>
  (fa: Id<A>): Id<B> =>
    fa.ap(fb);

/**
 * Point-free functor map.
 */
Id.map =
  <A, B>(f: (a: A) => B) =>
  (id: Id<A>): Id<B> =>
    id.map(f);

/**
 * Point-free monadic chain.
 */
Id.chain =
  <A, B>(f: (a: A) => Id<B>) =>
  (id: Id<A>): Id<B> =>
    id.chain(f);

/**
 * Execute and retrieve the wrapped value.
 */
Id.run = <A>(id: Id<A>): A => id.run();

/**
 * Alias for `run`.
 */
Id.extract = <A>(id: Id<A>): A => id.run();

/**
 * Default export for ergonomic usage.
 */
export default Id;
