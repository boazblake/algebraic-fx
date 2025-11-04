export type State<S, A> = {
    run: (s: S) => [A, S];
    map: <B>(f: (a: A) => B) => State<S, B>;
    chain: <B>(f: (a: A) => State<S, B>) => State<S, B>;
};
export declare const State: {
    <S, A>(run: (s: S) => [A, S]): State<S, A>;
    of<S, A>(a: A): State<S, A>;
    get<S>(): State<S, S>;
    put<S>(s: S): State<S, void>;
    map<S, A, B>(f: (a: A) => B): (st: State<S, A>) => State<S, B>;
    chain<S, A, B>(f: (a: A) => State<S, B>): (st: State<S, A>) => State<S, B>;
    run<S, A>(s: S): (st: State<S, A>) => [A, S];
};
export default State;
