// src/adt/id.ts
import { fl } from "./fl.js";

export interface Identity<A> {
  readonly _tag: "ID";
  readonly value: A;
  readonly run: () => A;

  map: <B>(f: (a: A) => B) => Identity<B>;
  chain: <B>(f: (a: A) => Identity<B>) => Identity<B>;
  ap: <B>(fab: Identity<(a: A) => B>) => Identity<B>;

  readonly [fl.map]: Identity<A>["map"];
  readonly [fl.chain]: Identity<A>["chain"];
  readonly [fl.ap]: Identity<A>["ap"];
}

const makeID = <A>(a: A): Identity<A> => {
  const self: Identity<A> = {
    _tag: "ID",
    value: a,
    run: () => a,

    map<B>(f: (x: A) => B): Identity<B> {
      return makeID(f(a));
    },

    chain<B>(f: (x: A) => Identity<B>): Identity<B> {
      return f(a);
    },

    ap<B>(fab: Identity<(x: A) => B>): Identity<B> {
      return makeID(fab.value(a));
    },

    [fl.map]: undefined as any,
    [fl.chain]: undefined as any,
    [fl.ap]: undefined as any,
  };

  (self as any)[fl.map] = self.map;
  (self as any)[fl.chain] = self.chain;
  (self as any)[fl.ap] = self.ap;

  return self;
};

export const of = <A>(a: A): Identity<A> => makeID(a);

export const map =
  <A, B>(f: (a: A) => B) =>
  (fa: Identity<A>): Identity<B> =>
    fa[fl.map](f);

export const chain =
  <A, B>(f: (a: A) => Identity<B>) =>
  (fa: Identity<A>): Identity<B> =>
    fa[fl.chain](f);

export const ap =
  <A, B>(fab: Identity<(a: A) => B>) =>
  (fa: Identity<A>): Identity<B> =>
    fa[fl.ap](fab);

export const isID = (u: unknown): u is Identity<unknown> =>
  !!u &&
  typeof u === "object" &&
  (u as any)._tag === "ID" &&
  typeof (u as any).run === "function";

// fp-ts style dictionary
export const IDModule = {
  URI: "ID",

  of,
  map: <A, B>(fa: Identity<A>, f: (a: A) => B): Identity<B> => map(f)(fa),
  chain: <A, B>(fa: Identity<A>, f: (a: A) => Identity<B>): Identity<B> =>
    chain(f)(fa),
  ap: <A, B>(fab: Identity<(a: A) => B>, fa: Identity<A>) => ap(fab)(fa),
  isID,

  [fl.of]: (a: any) => of(a),
  [fl.map]:
    (f: any) =>
    (fa: Identity<any>): Identity<any> =>
      map(f)(fa),
  [fl.chain]:
    (f: any) =>
    (fa: Identity<any>): Identity<any> =>
      chain(f)(fa),
  [fl.ap]: (fab: Identity<(a: any) => any>) => (fa: Identity<any>) =>
    ap(fab)(fa),
};

export type ID<A> = Identity<A>;
