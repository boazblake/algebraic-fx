// src/adt/id.ts

export type Id<A> = {
  /** Execute the identity computation */
  run: () => A;
  /** Functor map */
  map: <B>(f: (a: A) => B) => Id<B>;
  /** Monad chain */
  chain: <B>(f: (a: A) => Id<B>) => Id<B>;
};

/** Identity constructor */
export const Id = <A>(a: A): Id<A> => ({
  run: () => a,
  map: (f) => Id(f(a)),
  chain: (f) => f(a),
});

/** Static helper (pure) */
Id.of = <A>(a: A): Id<A> => Id(a);

/** Static utilities for functional composition */
Id.map = <A, B>(f: (a: A) => B) => (id: Id<A>): Id<B> => id.map(f);
Id.chain = <A, B>(f: (a: A) => Id<B>) => (id: Id<A>): Id<B> => id.chain(f);
Id.run = <A>(id: Id<A>): A => id.run();

/** Default export object for symmetry with other ADTs */
export default Id;
