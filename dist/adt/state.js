export const State = (run) => ({
    run,
    map: (f) => State((s) => {
        const [a, s1] = run(s);
        return [f(a), s1];
    }),
    chain: (f) => State((s) => {
        const [a, s1] = run(s);
        return f(a).run(s1);
    }),
});
State.of = (a) => State((s) => [a, s]);
State.get = () => State((s) => [s, s]);
State.put = (s) => State(() => [undefined, s]);
/** Point-free combinators */
State.map = (f) => (st) => st.map(f);
State.chain =
    (f) => (st) => st.chain(f);
State.run =
    (s) => (st) => st.run(s);
export default State;
