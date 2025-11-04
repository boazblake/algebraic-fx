export type State<S, A> = {
  run: (s: S) => [A, S];
  map: <B>(f: (a: A) => B) => State<S, B>;
  chain: <B>(f: (a: A) => State<S, B>) => State<S, B>;
};

export const State = <S, A>(run: (s: S) => [A, S]): State<S, A> => ({
  run,
  map: (f) =>
    State((s: S) => {
      const [a, s1] = run(s);
      return [f(a), s1];
    }),
  chain: (f) =>
    State((s: S) => {
      const [a, s1] = run(s);
      return f(a).run(s1);
    }),
});

State.of = <S, A>(a: A): State<S, A> => State((s) => [a, s]);
State.get = <S>(): State<S, S> => State((s) => [s, s]);
State.put = <S>(s: S): State<S, void> => State(() => [undefined, s]);

/** Point-free combinators */
State.map = <S, A, B>(f: (a: A) => B) => (st: State<S, A>): State<S, B> =>
  st.map(f);
State.chain =
  <S, A, B>(f: (a: A) => State<S, B>) =>
  (st: State<S, A>): State<S, B> =>
    st.chain(f);
State.run =
  <S, A>(s: S) =>
  (st: State<S, A>): [A, S] =>
    st.run(s);

export default State;
