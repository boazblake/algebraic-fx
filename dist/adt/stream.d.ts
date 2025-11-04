export type Observer<A> = {
    next: (a: A) => void;
    complete?: () => void;
};
export type Unsubscribe = () => void;
export type Stream<A> = {
    subscribe: (o: Observer<A>) => Unsubscribe;
    map: <B>(f: (a: A) => B) => Stream<B>;
    chain?: <B>(f: (a: A) => Stream<B>) => Stream<B>;
};
export declare const Stream: {
    <A>(subscribe: (o: Observer<A>) => Unsubscribe): Stream<A>;
    of<A>(a: A): Stream<A>;
    fromArray<A>(arr: A[]): Stream<A>;
};
export default Stream;
