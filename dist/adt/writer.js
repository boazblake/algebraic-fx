/**
 * Internal default monoid combine:
 * - arrays: concat
 * - strings: concat
 * - numbers: add
 * - objects: shallow merge
 * - fallback: return w2
 */
function defaultCombine(w1, w2) {
    if (Array.isArray(w1) && Array.isArray(w2))
        return [...w1, ...w2];
    if (typeof w1 === "string" && typeof w2 === "string")
        return (w1 + w2);
    if (typeof w1 === "number" && typeof w2 === "number")
        return (w1 + w2);
    if (w1 != null &&
        w2 != null &&
        typeof w1 === "object" &&
        typeof w2 === "object")
        return { ...w1, ...w2 };
    // fallback: non-breaking legacy behavior
    return w2;
}
/**
 * Writer constructor with explicit monoid combine.
 */
export const Writer = (run, combine = defaultCombine) => ({
    run,
    map: (f) => Writer(() => {
        const [a, w] = run();
        return [f(a), w];
    }, combine),
    chain: (f) => Writer(() => {
        const [a, w1] = run();
        const [b, w2] = f(a).run();
        return [b, combine(w1, w2)];
    }, combine),
    ap: (fb) => Writer(() => {
        const [fn, w1] = fb.run();
        const [a, w2] = run();
        return [fn(a), combine(w1, w2)];
    }, combine),
});
/**
 * Writer.of: requires W's monoid identity.
 */
Writer.of = (a, empty, combine) => Writer(() => [a, empty], combine);
/**
 * Write a log entry.
 */
Writer.tell = (w, combine) => Writer(() => [undefined, w], combine);
/**
 * Sequence array of writers.
 */
Writer.sequence = (writers, combine = defaultCombine) => Writer(() => {
    const values = [];
    let accLog = undefined;
    for (const w of writers) {
        const [value, log] = w.run();
        values.push(value);
        accLog = accLog === undefined ? log : combine(accLog, log);
    }
    return [values, accLog];
}, combine);
/**
 * Traverse array using Writer.
 */
Writer.traverse =
    (f, combine = defaultCombine) => (arr) => Writer.sequence(arr.map(f), combine);
export default Writer;
//# sourceMappingURL=writer.js.map