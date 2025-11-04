export type Validation<E, A> = {
    _tag: "Failure";
    errors: E[];
} | {
    _tag: "Success";
    value: A;
};
export declare const Failure: <E>(errors: E[]) => Validation<E, never>;
export declare const Success: <A>(value: A) => Validation<never, A>;
/** Functor map */
export declare const map: <E, A, B>(f: (a: A) => B, v: Validation<E, A>) => Validation<E, B>;
/** Applicative apply */
export declare const ap: <E, A, B>(vf: Validation<E, (a: A) => B>, va: Validation<E, A>) => Validation<E, B>;
/** Monad chain */
export declare const chain: <E, A, B>(f: (a: A) => Validation<E, B>, v: Validation<E, A>) => Validation<E, B>;
/** Lift value */
export declare const of: <A>(a: A) => Validation<never, A>;
/** Fold */
export declare const fold: <E, A, B>(onFail: (errs: E[]) => B, onSucc: (a: A) => B, v: Validation<E, A>) => B;
/** Unified object export */
export declare const Validation: {
    Failure: <E>(errors: E[]) => Validation<E, never>;
    Success: <A>(value: A) => Validation<never, A>;
    map: <E, A, B>(f: (a: A) => B, v: Validation<E, A>) => Validation<E, B>;
    ap: <E, A, B>(vf: Validation<E, (a: A) => B>, va: Validation<E, A>) => Validation<E, B>;
    chain: <E, A, B>(f: (a: A) => Validation<E, B>, v: Validation<E, A>) => Validation<E, B>;
    of: <A>(a: A) => Validation<never, A>;
    fold: <E, A, B>(onFail: (errs: E[]) => B, onSucc: (a: A) => B, v: Validation<E, A>) => B;
};
export default Validation;
