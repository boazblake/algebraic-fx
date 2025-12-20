import { fl } from "./fl.js";
export interface Identity<A> {
    readonly _tag: "ID";
    readonly value: A;
    readonly run: () => A;
    map: <B>(f: (a: A) => B) => Identity<B>;
    chain: <B>(f: (a: A) => Identity<B>) => Identity<B>;
    ap: <B>(fab: Identity<(a: A) => B>) => Identity<B>;
    readonly [fl.map]: Identity<A>["map"];
    readonly [fl.chain]: Identity<A>["chain"];
    readonly [fl.ap]: Identity<A>["ap"];
}
export declare const of: <A>(a: A) => Identity<A>;
export declare const map: <A, B>(f: (a: A) => B) => (fa: Identity<A>) => Identity<B>;
export declare const chain: <A, B>(f: (a: A) => Identity<B>) => (fa: Identity<A>) => Identity<B>;
export declare const ap: <A, B>(fab: Identity<(a: A) => B>) => (fa: Identity<A>) => Identity<B>;
export declare const isID: (u: unknown) => u is Identity<unknown>;
export declare const IDModule: {
    URI: string;
    of: <A>(a: A) => Identity<A>;
    map: <A, B>(fa: Identity<A>, f: (a: A) => B) => Identity<B>;
    chain: <A, B>(fa: Identity<A>, f: (a: A) => Identity<B>) => Identity<B>;
    ap: <A, B>(fab: Identity<(a: A) => B>, fa: Identity<A>) => Identity<B>;
    isID: (u: unknown) => u is Identity<unknown>;
    [fl_of]: (a: any) => Identity<any>;
    [fl_map]: (f: any) => (fa: Identity<any>) => Identity<any>;
    [fl_chain]: (f: any) => (fa: Identity<any>) => Identity<any>;
    [fl_ap]: (fab: Identity<(a: any) => any>) => (fa: Identity<any>) => Identity<any>;
};
export type ID<A> = Identity<A>;
//# sourceMappingURL=id.d.ts.map