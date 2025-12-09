/**
 * Unique nominal brand for Reader. Ensures Readers cannot be confused with plain
 * objects of the same structural shape.
 */
const ReaderBrand = Symbol("ReaderBrand");

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
export const Reader = <E, A>(run: (env: E) => A): Reader<E, A> => ({
  [ReaderBrand]: true,
  run,
  map: (f) => Reader((env: E) => f(run(env))),
  chain: (f) => Reader((env: E) => f(run(env)).run(env)),
  ap: (fb) => Reader((env: E) => fb.run(env)(run(env))),
});

/**
 * Lift a pure value into a Reader that ignores the environment.
 */
Reader.of = <E, A>(a: A): Reader<E, A> => Reader(() => a);

/**
 * Retrieve the entire environment.
 *
 * Equivalent to `(env) => env`.
 */
Reader.ask = <E>(): Reader<E, E> => Reader((env) => env);

/**
 * Extract a value from the environment using a projection function.
 */
Reader.asks = <E, A>(f: (env: E) => A): Reader<E, A> => Reader(f);

/**
 * Point-free functor map.
 */
Reader.map =
  <E, A, B>(f: (a: A) => B) =>
  (r: Reader<E, A>): Reader<E, B> =>
    r.map(f);

/**
 * Point-free chain.
 */
Reader.chain =
  <E, A, B>(f: (a: A) => Reader<E, B>) =>
  (r: Reader<E, A>): Reader<E, B> =>
    r.chain(f);

/**
 * Point-free applicative apply.
 */
Reader.ap =
  <E, A, B>(fb: Reader<E, (a: A) => B>) =>
  (fa: Reader<E, A>): Reader<E, B> =>
    fa.ap(fb);

/**
 * Run a Reader using a supplied environment.
 *
 * Useful for point-free or curried styles.
 */
Reader.run =
  <E, A>(env: E) =>
  (r: Reader<E, A>): A =>
    r.run(env);

/**
 * Modify the environment for the duration of a Reader computation.
 *
 * Transforms environment from E1 to E2, allowing the Reader to work with
 * a transformed environment.
 *
 * Equivalent to:
 *    local : (e1 -> e2) -> Reader e2 a -> Reader e1 a
 *
 * This is the CORRECTED version that allows transforming between different
 * environment types.
 *
 * @example
 * type Config = { dbUrl: string };
 * type ExtendedConfig = Config & { debug: boolean };
 *
 * const readDb = Reader<Config, string>(env => env.dbUrl);
 * const withDebug = Reader.local<ExtendedConfig, Config, string>(
 *   env => ({ dbUrl: env.dbUrl })
 * )(readDb);
 *
 * withDebug.run({ dbUrl: "localhost", debug: true }); // "localhost"
 */
Reader.local =
  <E1, E2, A>(f: (env: E1) => E2) =>
  (r: Reader<E2, A>): Reader<E1, A> =>
    Reader((env: E1) => r.run(f(env)));

/**
 * Execute multiple Readers under the same environment.
 *
 * @returns A Reader that returns an array of results.
 */
Reader.sequence = <E, A>(readers: Reader<E, A>[]): Reader<E, A[]> =>
  Reader((env) => readers.map((r) => r.run(env)));

/**
 * Traverse an array using a Reader-producing function.
 *
 * Equivalent to: `Reader.sequence(arr.map(f))`.
 */
Reader.traverse =
  <E, A, B>(f: (a: A) => Reader<E, B>) =>
  (arr: A[]): Reader<E, B[]> =>
    Reader((env) => arr.map((a) => f(a).run(env)));

/** Default export for ergonomic imports. */
export default Reader;
