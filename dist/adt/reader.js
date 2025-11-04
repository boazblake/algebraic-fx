// src/adt/reader.ts
/** Reader constructor */
export const Reader = (run) => ({
    run,
    map: (f) => Reader((env) => f(run(env))),
    chain: (f) => Reader((env) => f(run(env)).run(env)),
});
/** Static helpers */
Reader.of = (a) => Reader(() => a);
Reader.ask = () => Reader((env) => env);
/** Point-free combinators */
Reader.map = (f) => (r) => r.map(f);
Reader.chain = (f) => (r) => r.chain(f);
Reader.run = (env) => (r) => r.run(env);
/** Unified export */
export default Reader;
