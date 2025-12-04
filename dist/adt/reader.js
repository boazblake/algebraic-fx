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
 * Equivalent to:
 *    local : (env -> env) -> Reader env a -> Reader env a
 *
 * @example
 * const withTestConfig = Reader.local(cfg => ({ ...cfg, test: true }));
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