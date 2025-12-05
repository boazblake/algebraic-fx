/**
 * Nominal brand for Identity values, preventing structural collisions.
 */
const IdBrand = Symbol("IdBrand");
/**
 * Identity constructor.
 *
 * @param a Wrapped value
 */
export const Id = (a) => ({
    [IdBrand]: true,
    run: () => a,
    map: (f) => Id(f(a)),
    chain: (f) => f(a),
    ap: (fb) => Id(fb.run()(a)),
});
/**
 * Lift a pure value into the Identity monad.
 */
Id.of = (a) => Id(a);
/**
 * Point-free applicative apply.
 */
Id.ap =
    (fb) => (fa) => fa.ap(fb);
/**
 * Point-free functor map.
 */
Id.map =
    (f) => (id) => id.map(f);
/**
 * Point-free monadic chain.
 */
Id.chain =
    (f) => (id) => id.chain(f);
/**
 * Execute and retrieve the wrapped value.
 */
Id.run = (id) => id.run();
/**
 * Alias for `run`.
 */
Id.extract = (id) => id.run();
/**
 * Default export for ergonomic usage.
 */
export default Id;
//# sourceMappingURL=id.js.map