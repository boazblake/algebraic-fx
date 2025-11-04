// src/adt/io.ts
/** Main constructor */
export const IO = (run) => ({
    run,
    map: (f) => IO(() => f(run())),
    chain: (f) => IO(() => f(run()).run()),
});
/** Static pure helper */
IO.of = (a) => IO(() => a);
/** Static combinators (point-free) */
IO.map = (f) => (io) => io.map(f);
IO.chain = (f) => (io) => io.chain(f);
IO.run = (io) => io.run();
/** Aggregate under unified export object */
export default IO;
