/**
 * Unique brand for nominal typing of Writer.
 */
declare const WriterBrand: unique symbol;
/**
 * Writer<W, A> accumulates a monoidal log W alongside a computed value A.
 *
 * @typeParam W Log type (must form a monoid with empty and combine)
 * @typeParam A Result value type
 */
export type Writer<W, A> = {
    readonly [WriterBrand]: true;
    /** Execute computation: returns `[value, log]`. */
    run: () => [A, W];
    /** Functor map: transform the result value only. */
    map: <B>(f: (a: A) => B) => Writer<W, B>;
    /** Monad chain: sequence computations, combining logs. */
    chain: <B>(f: (a: A) => Writer<W, B>) => Writer<W, B>;
    /** Applicative ap: apply logged function to logged value. */
    ap: <B>(wf: Writer<W, (a: A) => B>) => Writer<W, B>;
    /** Access the combine function for this Writer instance. */
    _combine: (w1: W, w2: W) => W;
    /** Access the empty value for this Writer instance. */
    _empty: W;
};
/**
 * Unified namespace export containing all Writer functions and types.
 */
export declare const Writer: {
    of: <W, A>(a: A, empty: W, combine?: (w1: W, w2: W) => W) => Writer<W, A>;
    tell: <W>(w: W, empty: W, combine?: (w1: W, w2: W) => W) => Writer<W, void>;
    listen: <W, A>(wa: Writer<W, A>) => Writer<W, [A, W]>;
    censor: <W, A>(wa: Writer<W, A>, f: (w: W) => W) => Writer<W, A>;
    sequence: <W, A>(writers: Writer<W, A>[], empty: W, combine?: (w1: W, w2: W) => W) => Writer<W, A[]>;
    traverse: <W, A, B>(f: (a: A) => Writer<W, B>, empty: W, combine?: (w1: W, w2: W) => W) => (arr: A[]) => Writer<W, B[]>;
    map: <W, A, B>(f: (a: A) => B) => (wa: Writer<W, A>) => Writer<W, B>;
    chain: <W, A, B>(f: (a: A) => Writer<W, B>) => (wa: Writer<W, A>) => Writer<W, B>;
    ap: <W, A, B>(wf: Writer<W, (a: A) => B>) => (wa: Writer<W, A>) => Writer<W, B>;
    evalWriter: <W, A>(wa: Writer<W, A>) => A;
    execWriter: <W, A>(wa: Writer<W, A>) => W;
};
export default Writer;
//# sourceMappingURL=writer.d.ts.map