import { fl } from "./fl.js";
export interface IO<A> {
    readonly _tag: "IO";
    readonly run: () => A;
    readonly [fl.map]: <B>(f: (a: A) => B) => IO<B>;
    readonly [fl.chain]: <B>(f: (a: A) => IO<B>) => IO<B>;
    readonly [fl.ap]: <B>(fa: IO<A>) => IO<B>;
}
export declare const IO_URI = "IO";
export declare const IO: <A>(thunk: () => A) => IO<A>;
export declare const of: <A>(a: A) => IO<A>;
export declare const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B>;
export declare const chain: <A, B>(f: (a: A) => IO<B>) => (fa: IO<A>) => IO<B>;
export declare const ap: <A, B>(fab: IO<(a: A) => B>) => (fa: IO<A>) => IO<B>;
export declare const isIO: (u: unknown) => u is IO<unknown>;
export declare const fromThunk: <A>(thunk: () => A) => IO<A>;
export declare const toThunk: <A>(io: IO<A>) => (() => A);
export declare const ioModule: {
    readonly URI: "IO";
    readonly of: <A>(a: A) => IO<A>;
    readonly map: <A, B>(fa: IO<A>, f: (a: A) => B) => IO<B>;
    readonly ap: <A, B>(fab: IO<(a: A) => B>, fa: IO<A>) => IO<B>;
    readonly chain: <A, B>(fa: IO<A>, f: (a: A) => IO<B>) => IO<B>;
    readonly [fl_of]: <A>(a: A) => IO<A>;
};
//# sourceMappingURL=io.d.ts.map