/**
 * Unique brand for nominal typing of State values.
 * Prevents accidental structural equivalence.
 */
declare const StateBrand: unique symbol;

/**
 * The State monad represents a pure state transition:
 *
 *     State<S, A>  ≅  S → [A, S]
 *
 * It is:
 * - Lazy: nothing runs until `.run(initialState)` is called
 * - Pure: no effects, only deterministic state threading
 * - Composable: supports map, chain, ap, sequence, traverse
 *
 * Common uses:
 * - Pure parsers
 * - Reducer-style transformations
 * - Simulating local mutable state in a purely functional way
 *
 * @typeParam S State type
 * @typeParam A Result value type
 */
export type State<S, A> = {
  readonly [StateBrand]: true;

  /** Execute the stateful computation starting from initial state `s`. */
  run: (s: S) => [A, S];

  /** Functor map: transform the result value, leaving state threading untouched. */
  map: <B>(f: (a: A) => B) => State<S, B>;

  /**
   * Monad chain / flatMap:
   * Feed the result of this state transition into the next stateful computation.
   */
  chain: <B>(f: (a: A) => State<S, B>) => State<S, B>;

  /**
   * Applicative apply:
   * Apply a stateful function to a stateful value.
   */
  ap: <B>(fb: State<S, (a: A) => B>) => State<S, B>;
};

/**
 * Construct a new State computation.
 *
 * @param run A pure function `(state: S) => [result, newState]`
 */
export const State = <S, A>(run: (s: S) => [A, S]): State<S, A> => ({
  [StateBrand]: true,
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

  ap: (fb) =>
    State((s: S) => {
      const [fn, s1] = fb.run(s);
      const [a, s2] = run(s1);
      return [fn(a), s2];
    }),
});

/**
 * Lift a pure value into State, leaving the state unchanged.
 */
State.of = <S, A>(a: A): State<S, A> => State((s) => [a, s]);

/**
 * Retrieve the current state as the result value.
 */
State.get = <S>(): State<S, S> => State((s) => [s, s]);

/**
 * Replace the current state with `s`, returning no result value.
 */
State.put = <S>(s: S): State<S, void> => State(() => [undefined, s]);

/**
 * Modify the state using a pure function.
 */
State.modify = <S>(f: (s: S) => S): State<S, void> =>
  State((s) => [undefined, f(s)]);

/**
 * Extract a value from the state using `f(state)`, without modifying it.
 */
State.gets = <S, A>(f: (s: S) => A): State<S, A> => State((s) => [f(s), s]);

/** Point-free functor map. */
State.map =
  <S, A, B>(f: (a: A) => B) =>
  (st: State<S, A>): State<S, B> =>
    st.map(f);

/** Point-free monadic chain. */
State.chain =
  <S, A, B>(f: (a: A) => State<S, B>) =>
  (st: State<S, A>): State<S, B> =>
    st.chain(f);

/** Point-free applicative apply. */
State.ap =
  <S, A, B>(fb: State<S, (a: A) => B>) =>
  (fa: State<S, A>): State<S, B> =>
    fa.ap(fb);

/**
 * Run a State computation with initial state `s`.
 */
State.run =
  <S, A>(s: S) =>
  (st: State<S, A>): [A, S] =>
    st.run(s);

/**
 * Evaluate: run state and return only the result value.
 */
State.evalState =
  <S, A>(s: S) =>
  (st: State<S, A>): A =>
    st.run(s)[0];

/**
 * Execute: run state and return only the final state.
 */
State.execState =
  <S, A>(s: S) =>
  (st: State<S, A>): S =>
    st.run(s)[1];

/**
 * Sequence an array of State computations sequentially.
 *
 * @returns A State that returns array of results while threading state forward.
 */
State.sequence = <S, A>(states: State<S, A>[]): State<S, A[]> =>
  State((s) => {
    let currentState = s;
    const values: A[] = [];

    for (const st of states) {
      const [a, nextState] = st.run(currentState);
      values.push(a);
      currentState = nextState;
    }

    return [values, currentState];
  });

/**
 * Traverse an array using a function that returns a State.
 * Equivalent to: `State.sequence(arr.map(f))`.
 */
State.traverse =
  <S, A, B>(f: (a: A) => State<S, B>) =>
  (arr: A[]): State<S, B[]> =>
    State.sequence(arr.map(f));

export default State;
