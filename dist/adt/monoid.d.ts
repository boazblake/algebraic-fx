import { fl } from "./fl.js";
export type Monoid<A> = {
    readonly empty: A;
    readonly concat: (x: A, y: A) => A;
    readonly [fl.empty]?: A;
    readonly [fl.concat]?: (x: A, y: A) => A;
};
export declare const makeMonoid: <A>(empty: A, concat: (x: A, y: A) => A) => Monoid<A>;
export declare const monoidString: Monoid<string>;
export declare const monoidSum: Monoid<number>;
export declare const monoidArray: <A>() => Monoid<A[]>;
export declare const monoidStringFn: () => Monoid<string>;
export declare const monoidSumFn: () => Monoid<number>;
export declare const MonoidString: Monoid<string>;
export declare const MonoidSum: Monoid<number>;
export declare const fold: <A>(M: Monoid<A>) => (xs: A[]) => A;
//# sourceMappingURL=monoid.d.ts.map