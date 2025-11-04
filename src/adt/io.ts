// src/adt/io.ts

export type IO<A> = {
  run: () => A;
  map: <B>(f: (a: A) => B) => IO<B>;
  chain: <B>(f: (a: A) => IO<B>) => IO<B>;
};

/** Main constructor */
export const IO = <A>(run: () => A): IO<A> => ({
  run,
  map: (f) => IO(() => f(run())),
  chain: (f) => IO(() => f(run()).run()),
});

/** Static pure helper */
IO.of = <A>(a: A): IO<A> => IO(() => a);

/** Static combinators (point-free) */
IO.map = <A, B>(f: (a: A) => B) => (io: IO<A>): IO<B> => io.map(f);
IO.chain = <A, B>(f: (a: A) => IO<B>) => (io: IO<A>): IO<B> => io.chain(f);
IO.run = <A>(io: IO<A>): A => io.run();

/** Aggregate under unified export object */
export default IO;
