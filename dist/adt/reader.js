/**
 * Unique nominal brand for Reader. Ensures Readers cannot be confused with plain
 * objects of the same structural shape.
 */
const ReaderBrand = Symbol("ReaderBrand");
/**
 * Construct a Reader from a function `(env: E) => A`.
 *
 * @param run Environment-dependent computation
 */
export const Reader = (run) => ({
    [ReaderBrand]: true,
    run,
    map: (f) => Reader((env) => f(run(env))),
    chain: (f) => Reader((env) => f(run(env)).run(env)),
    ap: (fb) => Reader((env) => fb.run(env)(run(env))),
});
/**
 * Lift a pure value into a Reader that ignores the environment.
 */
Reader.of = (a) => Reader(() => a);
/**
 * Retrieve the entire environment.
 *
 * Equivalent to `(env) => env`.
 */
Reader.ask = () => Reader((env) => env);
/**
 * Extract a value from the environment using a projection function.
 */
Reader.asks = (f) => Reader(f);
/**
 * Point-free functor map.
 */
Reader.map =
    (f) => (r) => r.map(f);
/**
 * Point-free chain.
 */
Reader.chain =
    (f) => (r) => r.chain(f);
/**
 * Point-free applicative apply.
 */
Reader.ap =
    (fb) => (fa) => fa.ap(fb);
/**
 * Run a Reader using a supplied environment.
 *
 * Useful for point-free or curried styles.
 */
Reader.run =
    (env) => (r) => r.run(env);
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
    (f) => (r) => Reader((env) => r.run(f(env)));
/**
 * Execute multiple Readers under the same environment.
 *
 * @returns A Reader that returns an array of results.
 */
Reader.sequence = (readers) => Reader((env) => readers.map((r) => r.run(env)));
/**
 * Traverse an array using a Reader-producing function.
 *
 * Equivalent to: `Reader.sequence(arr.map(f))`.
 */
Reader.traverse =
    (f) => (arr) => Reader((env) => arr.map((a) => f(a).run(env)));
/** Default export for ergonomic imports. */
export default Reader;
//# sourceMappingURL=reader.js.map