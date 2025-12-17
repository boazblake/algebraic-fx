import type { Monoid } from "./monoid.js";
import type { Task as TaskT } from "./task.js";
export type WriterTask<W, E, A> = {
    readonly runTask: TaskT<E, [A, W]>;
    readonly monoid: Monoid<W>;
};
export declare const makeWriterTask: <W, E, A>(runTask: TaskT<E, [A, W]>, m: Monoid<W>) => WriterTask<W, E, A>;
export declare const of: <W, E, A>(m: Monoid<W>, a: A, w?: W) => WriterTask<W, E, A>;
export declare const tell: <W, E>(m: Monoid<W>, w: W) => WriterTask<W, E, void>;
export declare const map: <W, E, A, B>(wa: WriterTask<W, E, A>, f: (a: A) => B) => WriterTask<W, E, B>;
export declare const chain: <W, E, A, B>(wa: WriterTask<W, E, A>, f: (a: A) => WriterTask<W, E, B>) => WriterTask<W, E, B>;
export declare const ap: <W, E, A, B>(wf: WriterTask<W, E, (a: A) => B>, wa: WriterTask<W, E, A>) => WriterTask<W, E, B>;
export declare const liftTask: <W, E, A>(m: Monoid<W>, t: TaskT<E, A>) => WriterTask<W, E, A>;
export declare const isWriterTask: (u: unknown) => u is WriterTask<unknown, unknown, unknown>;
export declare const WriterTaskModule: <W>(m: Monoid<W>) => {
    of: <E, A>(a: A, w?: W) => WriterTask<W, E, A>;
    map: <E, A_1, B>(wa: WriterTask<W, E, A_1>, f: (a: A_1) => B) => WriterTask<W, E, B>;
    chain: <E, A_2, B_1>(wa: WriterTask<W, E, A_2>, f: (a: A_2) => WriterTask<W, E, B_1>) => WriterTask<W, E, B_1>;
    ap: <E, A_3, B_2>(wf: WriterTask<W, E, (a: A_3) => B_2>, wa: WriterTask<W, E, A_3>) => WriterTask<W, E, B_2>;
    tell: <E>(w: W) => WriterTask<W, E, void>;
    liftTask: <E, A_4>(t: TaskT<E, A_4>) => WriterTask<W, E, A_4>;
    isWriterTask: (u: unknown) => u is WriterTask<unknown, unknown, unknown>;
};
//# sourceMappingURL=writer-task.d.ts.map