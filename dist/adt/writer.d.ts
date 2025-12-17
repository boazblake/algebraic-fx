import { fl } from "./fl.js";
import type { Monoid } from "./monoid.js";
export type Writer<W, A> = {
    readonly run: () => [A, W];
};
/**
 * of: construct a Writer with value and optional initial log.
 * If log is omitted, uses the monoid empty.
 */
export declare const of: <W, A>(m: Monoid<W>, a: A, w?: W) => Writer<W, A>;
/**
 * tell: append a log value, with void result.
 */
export declare const tell: <W>(m: Monoid<W>, w: W) => Writer<W, void>;
/**
 * map: transform the value, keep the same log.
 */
export declare const map: <W, A, B>(wa: Writer<W, A>, f: (a: A) => B) => Writer<W, B>;
/**
 * chain: sequence computations and combine logs via the monoid.
 */
export declare const chain: <W, A, B>(wa: Writer<W, A>, f: (a: A) => Writer<W, B>) => Writer<W, B>;
/**
 * ap: apply a Writer<W, (a -> b)> to a Writer<W, a>, combining logs.
 */
export declare const ap: <W, A, B>(wf: Writer<W, (a: A) => B>, wa: Writer<W, A>) => Writer<W, B>;
/**
 * listen: produce [value, log] as value, keep same log.
 */
export declare const listen: <W, A>(wa: Writer<W, A>) => Writer<W, [A, W]>;
/**
 * Narrow type guard.
 */
export declare const isWriter: (u: unknown) => u is Writer<unknown, unknown>;
/**
 * fp-ts style module dictionary for a fixed monoid W.
 */
export declare const WriterModule: <W>(m: Monoid<W>) => {
    [fl.of]: <A>(a: A, w?: W) => Writer<W, A>;
    of: <A>(a: A, w?: W) => Writer<W, A>;
    map: <A, B>(wa: Writer<W, A>, f: (a: A) => B) => Writer<W, B>;
    chain: <A, B_1>(wa: Writer<W, A>, f: (a: A) => Writer<W, B_1>) => Writer<W, B_1>;
    ap: <A, B_2>(wf: Writer<W, (a: A) => B_2>, wa: Writer<W, A>) => Writer<W, B_2>;
    tell: (w: W) => Writer<W, void>;
    listen: <A>(wa: Writer<W, A>) => Writer<W, [A, W]>;
    isWriter: (u: unknown) => u is Writer<unknown, unknown>;
};
//# sourceMappingURL=writer.d.ts.map