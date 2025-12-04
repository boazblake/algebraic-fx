/**
 * Unique brand for nominal typing of Writer.
 */
declare const WriterBrand: unique symbol;
/**
 * Writer<W, A> accumulates a monoidal log W alongside a computed value A.
 *
 * @typeParam W Log type
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
    ap: <B>(fb: Writer<W, (a: A) => B>) => Writer<W, B>;
};
/**
 * Writer constructor.
 */
export declare const Writer: {
    <W, A>(run: () => [A, W], combine?: (w1: W, w2: W) => W): Writer<W, A>;
    of<W, A>(a: A, empty: W, combine?: (w1: W, w2: W) => W): Writer<W, A>;
    tell<W>(w: W, combine?: (w1: W, w2: W) => W): Writer<W, void>;
    sequence<W, A>(writers: Writer<W, A>[], combine?: (w1: W, w2: W) => W): Writer<W, A[]>;
    traverse<W, A, B>(f: (a: A) => Writer<W, B>, combine?: (w1: W, w2: W) => W): (arr: A[]) => Writer<W, B[]>;
};
export default Writer;
//# sourceMappingURL=writer.d.ts.map