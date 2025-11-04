export type Just<A> = {
    _tag: "Just";
    value: A;
};
export type Nothing = {
    _tag: "Nothing";
};
export type Maybe<A> = Just<A> | Nothing;
/** Constructors */
export declare const Just: <A>(value: A) => Maybe<A>;
export declare const Nothing: Maybe<never>;
/** Functor map */
export declare const map: <A, B>(f: (a: A) => B, ma: Maybe<A>) => Maybe<B>;
/** Monad chain */
export declare const chain: <A, B>(f: (a: A) => Maybe<B>, ma: Maybe<A>) => Maybe<B>;
/** Applicative pure */
export declare const of: <A>(a: A) => Maybe<A>;
/** Pattern matching (fold) */
export declare const fold: <A, B>(onNothing: () => B, onJust: (a: A) => B, ma: Maybe<A>) => B;
/** Unified static interface */
export declare const Maybe: {
    Just: <A>(value: A) => Maybe<A>;
    Nothing: Nothing;
    map: <A, B>(f: (a: A) => B, ma: Maybe<A>) => Maybe<B>;
    chain: <A, B>(f: (a: A) => Maybe<B>, ma: Maybe<A>) => Maybe<B>;
    of: <A>(a: A) => Maybe<A>;
    fold: <A, B>(onNothing: () => B, onJust: (a: A) => B, ma: Maybe<A>) => B;
};
export default Maybe;
