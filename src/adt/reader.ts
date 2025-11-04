// src/adt/reader.ts

export type Reader<E, A> = {
  run: (env: E) => A;
  map: <B>(f: (a: A) => B) => Reader<E, B>;
  chain: <B>(f: (a: A) => Reader<E, B>) => Reader<E, B>;
};

/** Reader constructor */
export const Reader = <E, A>(run: (env: E) => A): Reader<E, A> => ({
  run,
  map: (f) => Reader((env: E) => f(run(env))),
  chain: (f) => Reader((env: E) => f(run(env)).run(env)),
});

/** Static helpers */
Reader.of = <E, A>(a: A): Reader<E, A> => Reader(() => a);
Reader.ask = <E>(): Reader<E, E> => Reader((env) => env);

/** Point-free combinators */
Reader.map = <E, A, B>(f: (a: A) => B) => (r: Reader<E, A>): Reader<E, B> => r.map(f);
Reader.chain = <E, A, B>(f: (a: A) => Reader<E, B>) => (r: Reader<E, A>): Reader<E, B> =>
  r.chain(f);
Reader.run = <E, A>(env: E) => (r: Reader<E, A>) => r.run(env);

/** Unified export */
export default Reader;
