import { fl } from "./fl.js";
export interface State<S, A> {
    readonly _tag: "State";
    readonly run: (s: S) => [A, S];
    readonly [fl.map]: <B>(f: (a: A) => B) => State<S, B>;
    readonly [fl.chain]: <B>(f: (a: A) => State<S, B>) => State<S, B>;
    readonly [fl.ap]: <B>(sf: State<S, (a: A) => B>) => State<S, B>;
}
export declare const of: <S, A>(a: A) => State<S, A>;
export declare const map: <S, A, B>(f: (a: A) => B) => (sa: State<S, A>) => State<S, B>;
export declare const chain: <S, A, B>(f: (a: A) => State<S, B>) => (sa: State<S, A>) => State<S, B>;
export declare const ap: <S, A, B>(sf: State<S, (a: A) => B>) => (sa: State<S, A>) => State<S, B>;
export declare const get: <S>() => State<S, S>;
export declare const put: <S>(s: S) => State<S, void>;
export declare const modify: <S>(f: (s: S) => S) => State<S, void>;
export declare const evalState: <S, A>(sa: State<S, A>, s: S) => A;
export declare const execState: <S, A>(sa: State<S, A>, s: S) => S;
export declare const isState: (u: unknown) => u is State<any, any>;
export declare const StateModule: {
    URI: string;
    of: <S, A>(a: A) => State<S, A>;
    map: <S, A, B>(f: (a: A) => B) => (sa: State<S, A>) => State<S, B>;
    chain: <S, A, B>(f: (a: A) => State<S, B>) => (sa: State<S, A>) => State<S, B>;
    ap: <S, A, B>(sf: State<S, (a: A) => B>) => (sa: State<S, A>) => State<S, B>;
    get: <S>() => State<S, S>;
    put: <S>(s: S) => State<S, void>;
    modify: <S>(f: (s: S) => S) => State<S, void>;
    evalState: <S, A>(sa: State<S, A>, s: S) => A;
    execState: <S, A>(sa: State<S, A>, s: S) => S;
    isState: (u: unknown) => u is State<any, any>;
    [fl_of]: <S, A>(a: A) => State<S, A>;
    [fl_map]: (f: (a: any) => any) => (sa: State<any, any>) => State<unknown, any>;
    [fl_chain]: (f: (a: any) => State<any, any>) => (sa: State<any, any>) => State<any, any>;
    [fl_ap]: (sf: State<any, (a: any) => any>) => (sa: State<any, any>) => State<any, any>;
};
//# sourceMappingURL=state.d.ts.map