/**
 * Unique brand for nominal typing of State values.
 * Prevents accidental structural equivalence.
 */
const StateBrand = Symbol("StateBrand");
/**
 * Construct a new State computation.
 *
 * @param run A pure function `(state: S) => [result, newState]`
 */
export const State = (run) => ({
    [StateBrand]: true,
    run,
    map: (f) => State((s) => {
        const [a, s1] = run(s);
        return [f(a), s1];
    }),
    chain: (f) => State((s) => {
        const [a, s1] = run(s);
        return f(a).run(s1);
    }),
    ap: (fb) => State((s) => {
        const [fn, s1] = fb.run(s);
        const [a, s2] = run(s1);
        return [fn(a), s2];
    }),
});
/**
 * Lift a pure value into State, leaving the state unchanged.
 */
State.of = (a) => State((s) => [a, s]);
/**
 * Retrieve the current state as the result value.
 */
State.get = () => State((s) => [s, s]);
/**
 * Replace the current state with `s`, returning no result value.
 */
State.put = (s) => State(() => [undefined, s]);
/**
 * Modify the state using a pure function.
 */
State.modify = (f) => State((s) => [undefined, f(s)]);
/**
 * Extract a value from the state using `f(state)`, without modifying it.
 */
State.gets = (f) => State((s) => [f(s), s]);
/** Point-free functor map. */
State.map =
    (f) => (st) => st.map(f);
/** Point-free monadic chain. */
State.chain =
    (f) => (st) => st.chain(f);
/** Point-free applicative apply. */
State.ap =
    (fb) => (fa) => fa.ap(fb);
/**
 * Run a State computation with initial state `s`.
 */
State.run =
    (s) => (st) => st.run(s);
/**
 * Evaluate: run state and return only the result value.
 */
State.evalState =
    (s) => (st) => st.run(s)[0];
/**
 * Execute: run state and return only the final state.
 */
State.execState =
    (s) => (st) => st.run(s)[1];
/**
 * Sequence an array of State computations sequentially.
 *
 * @returns A State that returns array of results while threading state forward.
 */
State.sequence = (states) => State((s) => {
    let currentState = s;
    const values = [];
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
    (f) => (arr) => State.sequence(arr.map(f));
export default State;
//# sourceMappingURL=state.js.map