import { fl } from "./fl.js";
export type Failure<E> = {
    readonly _tag: "Failure";
    readonly left: E;
};
export type Success<A> = {
    readonly _tag: "Success";
    readonly right: A;
};
export type Validation<E, A> = Failure<E> | Success<A>;
export declare const failure: <E = unknown, A = never>(e: E) => Validation<E, A>;
export declare const success: <E = never, A = unknown>(a: A) => Validation<E, A>;
export declare const of: <A>(a: A) => Validation<never, A>;
export declare const isFailure: <E, A>(v: Validation<E, A>) => v is Failure<E>;
export declare const isSuccess: <E, A>(v: Validation<E, A>) => v is Success<A>;
export declare const isValidation: (u: unknown) => u is Validation<unknown, unknown>;
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Validation<E, A>) => Validation<E, B>;
export declare const mapFailure: <E, F>(f: (e: E) => F) => <A>(fa: Validation<E, A>) => Validation<F, A>;
export declare const bimap: <E, F, A, B>(f: (e: E) => F, g: (a: A) => B) => (fa: Validation<E, A>) => Validation<F, B>;
export declare const match: <E, A, R>(onFailure: (e: E) => R, onSuccess: (a: A) => R) => (fa: Validation<E, A>) => R;
export declare const getOrElse: <A>(onFailure: () => A) => <E>(fa: Validation<E, A>) => A;
export declare const fromPredicate: <A, E>(pred: (a: A) => boolean, onFalse: (a: A) => E) => (a: A) => Validation<E, A>;
export declare const fromNullable: <A, E>(onNull: () => E) => (a: A | null | undefined) => Validation<E, A>;
export interface Semigroup<A> {
    concat: (x: A, y: A) => A;
}
export declare const semigroupString: Semigroup<string>;
export declare const semigroupArray: <A>() => Semigroup<A[]>;
export declare const getValidationApplicative: <E>(S: Semigroup<E>) => {
    of: <A>(a: A) => Validation<never, A>;
    map: <A, B>(f: (a: A) => B) => <E_1>(fa: Validation<E_1, A>) => Validation<E_1, B>;
    ap: <A, B_1>(fab: Validation<E, (a: A) => B_1>, fa: Validation<E, A>) => Validation<E, B_1>;
};
export declare const ValidationModule: {
    URI: string;
    failure: <E = unknown, A = never>(e: E) => Validation<E, A>;
    success: <E = never, A = unknown>(a: A) => Validation<E, A>;
    of: <A>(a: A) => Validation<never, A>;
    map: <A, B>(f: (a: A) => B) => <E>(fa: Validation<E, A>) => Validation<E, B>;
    mapFailure: <E, F>(f: (e: E) => F) => <A>(fa: Validation<E, A>) => Validation<F, A>;
    bimap: <E, F, A, B>(f: (e: E) => F, g: (a: A) => B) => (fa: Validation<E, A>) => Validation<F, B>;
    fromPredicate: <A, E>(pred: (a: A) => boolean, onFalse: (a: A) => E) => (a: A) => Validation<E, A>;
    fromNullable: <A, E>(onNull: () => E) => (a: A | null | undefined) => Validation<E, A>;
    getOrElse: <A>(onFailure: () => A) => <E>(fa: Validation<E, A>) => A;
    getValidationApplicative: <E>(S: Semigroup<E>) => {
        of: <A>(a: A) => Validation<never, A>;
        map: <A, B>(f: (a: A) => B) => <E_1>(fa: Validation<E_1, A>) => Validation<E_1, B>;
        ap: <A, B_1>(fab: Validation<E, (a: A) => B_1>, fa: Validation<E, A>) => Validation<E, B_1>;
    };
    semigroupString: Semigroup<string>;
    semigroupArray: <A>() => Semigroup<A[]>;
    [fl_of]: <A>(a: A) => Validation<never, A>;
};
//# sourceMappingURL=validation.d.ts.map