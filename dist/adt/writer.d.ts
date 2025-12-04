export type Writer<W, A> = {
    run: () => [A, W];
    map: <B>(f: (a: A) => B) => Writer<W, B>;
    chain: <B>(f: (a: A) => Writer<W, B>) => Writer<W, B>;
    ap: <B>(fb: Writer<W, (a: A) => B>) => Writer<W, B>;
};
/**
 * Writer constructor with explicit monoid combine.
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