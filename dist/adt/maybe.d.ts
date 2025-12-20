import { fl } from "./fl.js";
export type Maybe<A> = Just<A> | Nothing;
interface FLMethods<A> {
    readonly [fl.map]: <B>(f: (a: A) => B) => Maybe<B>;
    readonly [fl.chain]: <B>(f: (a: A) => Maybe<B>) => Maybe<B>;
    readonly [fl.ap]: <B>(mf: Maybe<(a: A) => B>) => Maybe<B>;
    readonly [fl.of]: <B>(b: B) => Maybe<B>;
}
export interface Just<A> extends FLMethods<A> {
    readonly _tag: "Just";
    readonly value: A;
}
export interface Nothing extends FLMethods<never> {
    readonly _tag: "Nothing";
}
export declare const isJust: <A>(m: Maybe<A>) => m is Just<A>;
export declare const isNothing: <A>(m: Maybe<A>) => m is Nothing;
export declare const isMaybe: (u: unknown) => u is Maybe<unknown>;
export declare const of: <A>(a: A) => Maybe<A>;
export declare const just: <A>(value: A) => Just<A>;
export declare const nothing: Nothing;
export declare const map: <A, B>(f: (a: A) => B) => (ma: Maybe<A>) => Maybe<B>;
export declare const chain: <A, B>(f: (a: A) => Maybe<B>) => (ma: Maybe<A>) => Maybe<B>;
export declare const ap: <A, B>(mf: Maybe<(a: A) => B>) => (ma: Maybe<A>) => Maybe<B>;
export declare const fromNullable: <A>(a: A | null | undefined) => Maybe<A>;
export declare const toNullable: <A>(ma: Maybe<A>) => A | null;
export declare const toUndefined: <A>(ma: Maybe<A>) => A | undefined;
export declare const fromPredicate: <A>(pred: (a: A) => boolean) => (a: A) => Maybe<A>;
export declare const withDefault: <A>(onNothing: A) => (ma: Maybe<A>) => A;
export declare const match: <A, B>(onNothing: () => B, onJust: (a: A) => B) => (ma: Maybe<A>) => B;
export declare const maybe: <A, B>(onNothing: B, onJust: (a: A) => B) => (ma: Maybe<A>) => B;
export declare const traverse: <F, A, B>(ofF: <X>(x: X) => F, mapF: <X, Y>(f: (x: X) => Y) => (fx: F) => F, apF: <X, Y_1>(ff: F) => (fx: F) => F, f: (a: A) => F) => (ma: Maybe<A>) => F;
export declare const sequence: <F, A>(ofF: <X>(x: X) => F, mapF: <X, Y>(f: (x: X) => Y) => (fx: F) => F, apF: <X, Y_1>(ff: F) => (fx: F) => F) => (mma: Maybe<F>) => F;
export declare const MAYBE_URI: "Maybe";
export type MAYBE_URI = typeof MAYBE_URI;
export declare const MaybeModule: {
    URI: "Maybe";
    of: <A>(a: A) => Maybe<A>;
    map: <A, B>(f: (a: A) => B) => (ma: Maybe<A>) => Maybe<B>;
    ap: <A, B>(mf: Maybe<(a: A) => B>) => (ma: Maybe<A>) => Maybe<B>;
    chain: <A, B>(f: (a: A) => Maybe<B>) => (ma: Maybe<A>) => Maybe<B>;
    fromNullable: <A>(a: A | null | undefined) => Maybe<A>;
    fromPredicate: <A>(pred: (a: A) => boolean) => (a: A) => Maybe<A>;
    withDefault: <A>(onNothing: A) => (ma: Maybe<A>) => A;
    match: <A, B>(onNothing: () => B, onJust: (a: A) => B) => (ma: Maybe<A>) => B;
    maybe: <A, B>(onNothing: B, onJust: (a: A) => B) => (ma: Maybe<A>) => B;
};
export {};
//# sourceMappingURL=maybe.d.ts.map