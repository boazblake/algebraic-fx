/**
 * Unique brand for nominally typing Stream values.
 * Prevents structural type collisions with plain objects.
 */
declare const StreamBrand: unique symbol;
/**
 * Observer interface used by Streams to emit values, errors, and completion.
 *
 * @typeParam A - Value type emitted by the Stream
 */
export type Observer<A> = {
    /** Emit a value. Required. */
    next: (a: A) => void;
    /** Optional error handler. */
    error?: (e: unknown) => void;
    /** Optional completion handler. */
    complete?: () => void;
};
/**
 * Unsubscribe function returned by `subscribe()`.
 * Calling it stops the stream from sending further events.
 */
export type Unsubscribe = () => void;
/**
 * Push-based functional stream abstraction.
 *
 * Stream<A> is:
 * - Lazy: nothing happens until `subscribe`
 * - Cold: each subscription creates its own execution
 * - Composable: map, chain (switchMap), filter, scan, take, skip, etc.
 *
 * This is intentionally minimal and inspired by `most.js` and RxJS primitives,
 * but with far less surface area.
 *
 * @typeParam A - value type
 */
export type Stream<A> = {
    readonly [StreamBrand]: true;
    /**
     * Begin receiving values from the stream.
     *
     * @param o Observer callbacks
     * @return Unsubscribe function
     */
    subscribe: (o: Observer<A>) => Unsubscribe;
    /** Functor map: transform each emitted value. */
    map: <B>(f: (a: A) => B) => Stream<B>;
    /**
     * Monadic bind / switchMap:
     * - Cancels previously active inner stream whenever a new value arrives
     * - Subscribes to the new inner stream
     */
    chain: <B>(f: (a: A) => Stream<B>) => Stream<B>;
    /** Filter emitted values by predicate. */
    filter: (predicate: (a: A) => boolean) => Stream<A>;
    /**
     * Accumulate values using a reducer.
     *
     * @param f Reducer function `(acc, value) => newAcc`
     * @param initial Initial accumulator value
     */
    scan: <B>(f: (acc: B, a: A) => B, initial: B) => Stream<B>;
    /**
     * Emit only the first `n` values, then complete.
     */
    take: (n: number) => Stream<A>;
    /**
     * Skip the first `n` values and emit the rest.
     */
    skip: (n: number) => Stream<A>;
};
/**
 * Stream constructor.
 *
 * All stream combinators ultimately call this function to build new streams.
 *
 * @param subscribe Function describing how to produce values for an observer
 */
export declare const Stream: {
    <A>(subscribe: (o: Observer<A>) => Unsubscribe): Stream<A>;
    of<A>(a: A): Stream<A>;
    fromArray<A>(arr: A[]): Stream<A>;
    empty<A>(): Stream<A>;
    never<A>(): Stream<A>;
    fromPromise<A>(p: Promise<A>): Stream<A>;
    interval(ms: number): Stream<number>;
    periodic(ms: number): Stream<void>;
    fromEvent<E extends Event>(target: EventTarget, eventName: string): Stream<E>;
    merge<A>(s1: Stream<A>, s2: Stream<A>): Stream<A>;
    concat<A>(s1: Stream<A>, s2: Stream<A>): Stream<A>;
    combineLatest<A, B>(sa: Stream<A>, sb: Stream<B>): Stream<[A, B]>;
    zip<A, B>(sa: Stream<A>, sb: Stream<B>): Stream<[A, B]>;
    debounce<A>(ms: number): (s: Stream<A>) => Stream<A>;
    throttle<A>(ms: number): (s: Stream<A>) => Stream<A>;
    distinctUntilChanged<A>(equals?: (a: A, b: A) => boolean): (s: Stream<A>) => Stream<A>;
};
export default Stream;
//# sourceMappingURL=stream.d.ts.map