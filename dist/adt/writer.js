/** Writer constructor */
export const Writer = (run) => ({
    run,
    map: (f) => Writer(() => {
        const [a, w] = run();
        return [f(a), w];
    }),
    chain: (f) => Writer(() => {
        const [a, w1] = run();
        const [b, w2] = f(a).run();
        const combined = Array.isArray(w1)
            ? [...w1, ...w2]
            : w2;
        return [b, combined];
    }),
});
/** Static helpers */
Writer.of = (a, empty) => Writer(() => [a, empty]);
Writer.tell = (w) => Writer(() => [undefined, w]);
/** Utility for updating + logging */
Writer.updateValueAndLog = (w, message) => w.chain((a) => Writer(() => [a, [message]]));
/** Unified object export */
export default Writer;
