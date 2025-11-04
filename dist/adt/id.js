// src/adt/id.ts
/** Identity constructor */
export const Id = (a) => ({
    run: () => a,
    map: (f) => Id(f(a)),
    chain: (f) => f(a),
});
/** Static helper (pure) */
Id.of = (a) => Id(a);
/** Static utilities for functional composition */
Id.map = (f) => (id) => id.map(f);
Id.chain = (f) => (id) => id.chain(f);
Id.run = (id) => id.run();
/** Default export object for symmetry with other ADTs */
export default Id;
