// src/adt/writer.ts
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
 * - Throws error for unsupported types to maintain monoid laws
 */
const defaultCombine = (w1, w2) => {
    if (Array.isArray(w1) && Array.isArray(w2)) {
        return [...w1, ...w2];
    }
    if (typeof w1 === "string" && typeof w2 === "string") {
        return (w1 + w2);
    }
    if (typeof w1 === "number" && typeof w2 === "number") {
        return (w1 + w2);
    }
    if (w1 != null &&
        w2 != null &&
        typeof w1 === "object" &&
        typeof w2 === "object" &&
        !Array.isArray(w1) &&
        !Array.isArray(w2)) {
        return { ...w1, ...w2 };
    }
    // Throw error instead of silently dropping w1 (violates monoid laws)
    throw new Error(`Writer.defaultCombine: unsupported types. ` +
        `Provide explicit combine function for type W. ` +
        `Received: ${typeof w1}, ${typeof w2}`);
};
/**
 * Internal constructor that creates a Writer with monoid operations baked in.
 * This ensures all operations maintain the monoid contract.
 */
const make = (empty, combine, run) => ({
    [WriterBrand]: true,
    run,
    _combine: combine,
    _empty: empty,
    map: (f) => make(empty, combine, () => {
        const [a, w] = run();
        return [f(a), w];
    }),
    chain: (f) => make(empty, combine, () => {
        const [a, w1] = run();
        const writerB = f(a);
        const [b, w2] = writerB.run();
        return [b, combine(w1, w2)];
    }),
    ap: (wf) => make(empty, combine, () => {
        const [fn, w1] = wf.run();
        const [a, w2] = run();
        return [fn(a), combine(w1, w2)];
    }),
});
/**
 * Lift a pure value into Writer with empty log.
 *
 * @param a The value to wrap
 * @param empty The monoid empty/identity element
 * @param combine The monoid combine operation (defaults to smart combine)
 *
 * @example
 * Writer.of(42, [], (a, b) => [...a, ...b])  // Writer with empty array log
 * Writer.of(42, "", (a, b) => a + b)         // Writer with empty string log
 */
const of = (a, empty, combine = defaultCombine) => make(empty, combine, () => [a, empty]);
/**
 * Write a log entry without producing a value.
 *
 * @param w The log value to write
 * @param empty The monoid empty/identity element
 * @param combine The monoid combine operation
 *
 * @example
 * Writer.tell(["action performed"], [], (a, b) => [...a, ...b])
 */
const tell = (w, empty, combine = defaultCombine) => make(empty, combine, () => [undefined, w]);
/**
 * Execute a Writer and also include the log in the result.
 * Useful for introspecting the accumulated log.
 *
 * @param wa The Writer to listen to
 * @param empty The monoid empty element (used for creating new Writer)
 * @param combine The monoid combine operation
 *
 * @example
 * const w = Writer.of(42, "", (a, b) => a + b);
 * const listened = Writer.listen(w, "", (a, b) => a + b);
 * listened.run() // [[42, ""], ""]
 */
const listen = (wa) => {
    // Extract monoid operations from the input Writer
    const empty = wa._empty;
    const combine = wa._combine;
    return make(empty, combine, () => {
        const [a, w] = wa.run();
        return [[a, w], w];
    });
};
/**
 * Execute a Writer and pass both the value and log to a function,
 * then continue with the modified log.
 *
 * @param wa The Writer to censor
 * @param f Function to transform the log
 *
 * @example
 * const w = Writer.tell(["error"], [], (a, b) => [...a, ...b]);
 * const censored = Writer.censor(w, logs => logs.map(l => "[REDACTED]"));
 */
const censor = (wa, f) => {
    const empty = wa._empty;
    const combine = wa._combine;
    return make(empty, combine, () => {
        const [a, w] = wa.run();
        return [a, f(w)];
    });
};
/**
 * Sequence an array of Writers, combining logs sequentially.
 *
 * @param writers Array of Writers to sequence
 * @param empty The monoid empty element
 * @param combine The monoid combine operation
 *
 * @example
 * const w1 = Writer.of(1, [], (a, b) => [...a, ...b]);
 * const w2 = Writer.of(2, [], (a, b) => [...a, ...b]);
 * Writer.sequence([w1, w2], [], (a, b) => [...a, ...b]).run() // [[1, 2], []]
 */
const sequence = (writers, empty, combine = defaultCombine) => make(empty, combine, () => {
    const results = [];
    let acc = empty;
    for (const w of writers) {
        const [a, log] = w.run();
        results.push(a);
        acc = combine(acc, log);
    }
    return [results, acc];
});
/**
 * Traverse an array using a Writer-producing function, collecting results and logs.
 *
 * @param f Function that produces a Writer for each element
 * @param empty The monoid empty element
 * @param combine The monoid combine operation
 *
 * @example
 * const f = (n: number) => Writer.of(n * 2, [n], (a, b) => [...a, ...b]);
 * Writer.traverse(f, [], (a, b) => [...a, ...b])([1, 2, 3]).run()
 * // [[2, 4, 6], [1, 2, 3]]
 */
const traverse = (f, empty, combine = defaultCombine) => (arr) => sequence(arr.map(f), empty, combine);
/**
 * Point-free map over Writer.
 */
const map = (f) => (wa) => wa.map(f);
/**
 * Point-free chain over Writer.
 */
const chain = (f) => (wa) => wa.chain(f);
/**
 * Point-free ap over Writer.
 */
const ap = (wf) => (wa) => wa.ap(wf);
/**
 * Extract the value from a Writer, discarding the log.
 */
const evalWriter = (wa) => wa.run()[0];
/**
 * Extract the log from a Writer, discarding the value.
 */
const execWriter = (wa) => wa.run()[1];
/**
 * Unified namespace export containing all Writer functions and types.
 */
export const Writer = {
    of,
    tell,
    listen,
    censor,
    sequence,
    traverse,
    map,
    chain,
    ap,
    evalWriter,
    execWriter,
};
export default Writer;
//# sourceMappingURL=writer.js.map