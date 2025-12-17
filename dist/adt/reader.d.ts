import { fl } from "./fl.js";
export interface Reader<R, A> {
    readonly _tag: "Reader";
    readonly run: (r: R) => A;
    readonly map: <B>(f: (a: A) => B) => Reader<R, B>;
    readonly chain: <B>(f: (a: A) => Reader<R, B>) => Reader<R, B>;
    readonly ap: <B>(this: Reader<R, (a: any) => B>, fa: Reader<R, any>) => Reader<R, B>;
}
export interface ReaderConstructor {
    <R, A>(run: (r: R) => A): Reader<R, A>;
    of: <R, A>(a: A) => Reader<R, A>;
    ask: <R>() => Reader<R, R>;
    asks: <R, A>(f: (r: R) => A) => Reader<R, A>;
}
export declare const of: <R, A>(a: A) => Reader<R, A>;
export declare const ask: <R>() => Reader<R, R>;
export declare const asks: <R, A>(f: (r: R) => A) => Reader<R, A>;
export declare const Reader: ReaderConstructor;
export declare const isReader: (u: unknown) => u is Reader<unknown, unknown>;
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B>;
export declare const chain: <A, B>(f: (a: A) => Reader<any, B>) => <R>(fa: Reader<R, A>) => Reader<R, B>;
export declare const ap: <R, A, B>(fab: Reader<R, (a: A) => B>) => (fa: Reader<R, A>) => Reader<R, B>;
export declare const ReaderModule: {
    readonly [fl.of]: <R, A>(a: A) => Reader<R, A>;
    readonly URI: "Reader";
    readonly of: <R, A>(a: A) => Reader<R, A>;
    readonly map: <R, A, B>(fa: Reader<R, A>, f: (a: A) => B) => Reader<R, B>;
    readonly chain: <R, A, B>(fa: Reader<R, A>, f: (a: A) => Reader<R, B>) => Reader<R, B>;
    readonly ap: <R, A, B>(fab: Reader<R, (a: A) => B>, fa: Reader<R, A>) => Reader<R, B>;
};
//# sourceMappingURL=reader.d.ts.map