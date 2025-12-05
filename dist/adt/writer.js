/**
 * Unique brand for nominal typing of Writer.
 */
const WriterBrand = Symbol("WriterBrand");
/**
 * Default monoid combine strategy when no custom combiner is supplied.
 * - Arrays: concat
 * - Strings: concat
 * - Numbers: add
 * - Objects: shallow merge
 * - Fallback: return w2
 */
function defaultCombine(w1, w2) {
    if (Array.isArray(w1) && Array.isArray(w2))
        return [...w1, ...w2];
    if (typeof w1 === "string" && typeof w2 === "string")
        return (w1 + w2);
    if (typeof w1 === "number" && typeof w2 === "number")
        return (w1 + w2);
    if (typeof w1 === "object" &&
        typeof w2 === "object" &&
        w1 != null &&
        w2 != null)
        return { ...w1, ...w2 };
    return w2;
}
/**
 * Writer constructor.
 */
export const Writer = (run, combine = defaultCombine) => {
    const self = {
        [WriterBrand]: true,
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
    };
    return self;
};
/**
 * Lift a value into Writer with empty log.
 */
Writer.of = (a, empty, combine) => Writer(() => [a, empty], combine);
/**
 * Write a log entry.
 */
Writer.tell = (w, combine) => Writer(() => [undefined, w], combine);
/**
 * Sequence an array of Writers, combining logs sequentially.
 */
Writer.sequence = (writers, combine = defaultCombine) => Writer(() => {
    const values = [];
    let acc = undefined;
    for (const w of writers) {
        const [a, log] = w.run();
        values.push(a);
        acc = acc === undefined ? log : combine(acc, log);
    }
    return [values, acc];
}, combine);
/**
 * Traverse an array and collect results.
 */
Writer.traverse =
    (f, combine = defaultCombine) => (arr) => Writer.sequence(arr.map(f), combine);
export default Writer;
//# sourceMappingURL=writer.js.map