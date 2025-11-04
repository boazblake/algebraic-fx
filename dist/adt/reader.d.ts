export type Reader<E, A> = {
    run: (env: E) => A;
    map: <B>(f: (a: A) => B) => Reader<E, B>;
    chain: <B>(f: (a: A) => Reader<E, B>) => Reader<E, B>;
};
/** Reader constructor */
export declare const Reader: {
    <E, A>(run: (env: E) => A): Reader<E, A>;
    of<E, A>(a: A): Reader<E, A>;
    ask<E>(): Reader<E, E>;
    map<E, A, B>(f: (a: A) => B): (r: Reader<E, A>) => Reader<E, B>;
    chain<E, A, B>(f: (a: A) => Reader<E, B>): (r: Reader<E, A>) => Reader<E, B>;
    run<E, A>(env: E): (r: Reader<E, A>) => A;
};
/** Unified export */
export default Reader;
