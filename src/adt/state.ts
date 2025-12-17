import { fl } from "./fl.js";

export interface State<S, A> {
  readonly _tag: "State";
  readonly run: (s: S) => [A, S];

  readonly [fl.map]: <B>(f: (a: A) => B) => State<S, B>;
  readonly [fl.chain]: <B>(f: (a: A) => State<S, B>) => State<S, B>;
  readonly [fl.ap]: <B>(sf: State<S, (a: A) => B>) => State<S, B>;
}

const make = <S, A>(run: (s: S) => [A, S]): State<S, A> => {
  const self: State<S, A> = {
    _tag: "State",
    run,

    [fl.map]<B>(f: (a: A) => B): State<S, B> {
      return make((s) => {
        const [a, s2] = self.run(s);
        return [f(a), s2];
      });
    },

    [fl.chain]<B>(f: (a: A) => State<S, B>): State<S, B> {
      return make((s) => {
        const [a, s2] = self.run(s);
        return f(a).run(s2);
      });
    },

    [fl.ap]<B>(sf: State<S, (a: A) => B>): State<S, B> {
      return make((s) => {
        const [fn, s2] = sf.run(s);
        const [a, s3] = self.run(s2);
        return [fn(a), s3];
      });
    },
  };

  return self;
};

export const of = <S, A>(a: A): State<S, A> => make((s) => [a, s]);

export const map =
  <S, A, B>(f: (a: A) => B) =>
  (sa: State<S, A>): State<S, B> =>
    make((s) => {
      const [a, s2] = sa.run(s);
      return [f(a), s2];
    });

export const chain =
  <S, A, B>(f: (a: A) => State<S, B>) =>
  (sa: State<S, A>): State<S, B> =>
    make((s) => {
      const [a, s2] = sa.run(s);
      return f(a).run(s2);
    });

export const ap =
  <S, A, B>(sf: State<S, (a: A) => B>) =>
  (sa: State<S, A>): State<S, B> =>
    make((s) => {
      const [fn, s2] = sf.run(s);
      const [a, s3] = sa.run(s2);
      return [fn(a), s3];
    });

export const get = <S>(): State<S, S> => make((s) => [s, s]);

export const put = <S>(s: S): State<S, void> => make(() => [undefined, s]);

export const modify = <S>(f: (s: S) => S): State<S, void> =>
  make((s) => [undefined, f(s)]);

export const evalState = <S, A>(sa: State<S, A>, s: S): A => sa.run(s)[0];

export const execState = <S, A>(sa: State<S, A>, s: S): S => sa.run(s)[1];

export const isState = (u: unknown): u is State<any, any> =>
  !!u && typeof u === "object" && typeof (u as any).run === "function";

export const StateModule = {
  URI: "State",

  of,
  map,
  chain,
  ap,
  get,
  put,
  modify,
  evalState,
  execState,
  isState,

  [fl.of]: of,
  [fl.map]: (f: (a: any) => any) => (sa: State<any, any>) => map(f)(sa),
  [fl.chain]: (f: (a: any) => State<any, any>) => (sa: State<any, any>) =>
    chain(f)(sa),
  [fl.ap]: (sf: State<any, (a: any) => any>) => (sa: State<any, any>) =>
    ap(sf)(sa),
};
