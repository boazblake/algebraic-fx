export type IO<A> = {
    run: () => A;
    map: <B>(f: (a: A) => B) => IO<B>;
    chain: <B>(f: (a: A) => IO<B>) => IO<B>;
};
/** Main constructor */
export declare const IO: {
    <A>(run: () => A): IO<A>;
    of<A>(a: A): IO<A>;
    map<A, B>(f: (a: A) => B): (io: IO<A>) => IO<B>;
    chain<A, B>(f: (a: A) => IO<B>): (io: IO<A>) => IO<B>;
    run<A>(io: IO<A>): A;
};
/** Aggregate under unified export object */
export default IO;
