export type Writer<W, A> = {
    run: () => [A, W];
    map: <B>(f: (a: A) => B) => Writer<W, B>;
    chain: <B>(f: (a: A) => Writer<W, B>) => Writer<W, B>;
};
/** Writer constructor */
export declare const Writer: {
    <W, A>(run: () => [A, W]): Writer<W, A>;
    of<W, A>(a: A, empty: W): Writer<W, A>;
    tell<W>(w: W): Writer<W, void>;
    updateValueAndLog<A>(w: Writer<string[], A>, message: string): Writer<string[], A>;
};
/** Unified object export */
export default Writer;
