import { fl } from "./fl.js";
export type Listener<A> = (value: A) => void;
export type Unsubscribe = () => void;
export interface Stream<A> {
    readonly _tag: "Stream";
    subscribe(listener: Listener<A>): Unsubscribe;
    map<B>(f: (a: A) => B): Stream<B>;
    filter(pred: (a: A) => boolean): Stream<A>;
    scan<B>(f: (acc: B, a: A) => B, initial: B): Stream<B>;
    [fl.map]<B>(f: (a: A) => B): Stream<B>;
}
export declare const Stream: (<A>(subscribe: (listener: Listener<A>) => Unsubscribe) => Stream<A>) & {
    "new"<A>(): Stream<A>;
    create<A>(): [Stream<A>, (value: A) => void];
    fromArray<A>(arr: readonly A[]): Stream<A>;
    debounce<A>(ms: number): (stream: Stream<A>) => Stream<A>;
};
export declare const createStream: <A>() => [Stream<A>, (value: A) => void];
//# sourceMappingURL=stream.d.ts.map