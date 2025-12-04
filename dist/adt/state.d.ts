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
export declare const State: {
    <S, A>(run: (s: S) => [A, S]): State<S, A>;
    of<S, A>(a: A): State<S, A>;
    get<S>(): State<S, S>;
    put<S>(s: S): State<S, void>;
    modify<S>(f: (s: S) => S): State<S, void>;
    gets<S, A>(f: (s: S) => A): State<S, A>;
    map<S, A, B>(f: (a: A) => B): (st: State<S, A>) => State<S, B>;
    chain<S, A, B>(f: (a: A) => State<S, B>): (st: State<S, A>) => State<S, B>;
    ap<S, A, B>(fb: State<S, (a: A) => B>): (fa: State<S, A>) => State<S, B>;
    run<S, A>(s: S): (st: State<S, A>) => [A, S];
    evalState<S, A>(s: S): (st: State<S, A>) => A;
    execState<S, A>(s: S): (st: State<S, A>) => S;
    sequence<S, A>(states: State<S, A>[]): State<S, A[]>;
    traverse<S, A, B>(f: (a: A) => State<S, B>): (arr: A[]) => State<S, B[]>;
};
export default State;
//# sourceMappingURL=state.d.ts.map