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
export const Stream = <A>(
  subscribe: (o: Observer<A>) => Unsubscribe
): Stream<A> => ({
  [StreamBrand]: true,
  subscribe,

  /** Functor map. */
  map: <B>(f: (a: A) => B): Stream<B> =>
    Stream((o) =>
      subscribe({
        next: (a) => {
          try {
            o.next(f(a));
          } catch (e) {
            o.error?.(e);
          }
        },
        error: o.error,
        complete: o.complete,
      })
    ),

  /**
   * Monadic bind / switchMap:
   * - Cancels previous inner stream when a new value arrives
   * - Subscribes to the next inner stream
   */
  chain: <B>(f: (a: A) => Stream<B>): Stream<B> =>
    Stream((o) => {
      let innerUnsub: Unsubscribe | null = null;

      const outerUnsub = subscribe({
        next: (a) => {
          try {
            const inner = f(a);
            innerUnsub?.();
            innerUnsub = inner.subscribe(o);
          } catch (e) {
            o.error?.(e);
          }
        },
        error: o.error,
        complete: o.complete,
      });

      return () => {
        innerUnsub?.();
        outerUnsub();
      };
    }),

  /** Filter values by predicate. */
  filter: (predicate: (a: A) => boolean): Stream<A> =>
    Stream((o) =>
      subscribe({
        next: (a) => {
          try {
            if (predicate(a)) o.next(a);
          } catch (e) {
            o.error?.(e);
          }
        },
        error: o.error,
        complete: o.complete,
      })
    ),

  /** Accumulate state over time. */
  scan: <B>(f: (acc: B, a: A) => B, initial: B): Stream<B> =>
    Stream((o) => {
      let acc = initial;
      return subscribe({
        next: (a) => {
          try {
            acc = f(acc, a);
            o.next(acc);
          } catch (e) {
            o.error?.(e);
          }
        },
        error: o.error,
        complete: o.complete,
      });
    }),

  /** Emit only first n events then complete. */
  take: (n: number): Stream<A> =>
    Stream((o) => {
      let count = 0;
      const unsub = subscribe({
        next: (a) => {
          if (count < n) {
            o.next(a);
            count++;
            if (count === n) {
              o.complete?.();
              unsub();
            }
          }
        },
        error: o.error,
        complete: o.complete,
      });
      return unsub;
    }),

  /** Skip first n events. */
  skip: (n: number): Stream<A> =>
    Stream((o) => {
      let count = 0;
      return subscribe({
        next: (a) => {
          count++;
          if (count > n) o.next(a);
        },
        error: o.error,
        complete: o.complete,
      });
    }),
});

/**
 * Create a Stream that emits a single value then completes.
 */
Stream.of = <A>(a: A): Stream<A> =>
  Stream((o) => {
    o.next(a);
    o.complete?.();
    return () => {};
  });

/**
 * Emit all items of an array synchronously, then complete.
 */
Stream.fromArray = <A>(arr: A[]): Stream<A> =>
  Stream((o) => {
    arr.forEach((a) => o.next(a));
    o.complete?.();
    return () => {};
  });

/**
 * Stream that immediately completes without emitting values.
 */
Stream.empty = <A>(): Stream<A> =>
  Stream((o) => {
    o.complete?.();
    return () => {};
  });

/**
 * Stream that never emits, errors, or completes.
 */
Stream.never = <A>(): Stream<A> => Stream(() => () => {});

/**
 * Convert a Promise into a Stream emitting one value then completing.
 * Unsubscription cancels the resolution (ignores result/error).
 */
Stream.fromPromise = <A>(p: Promise<A>): Stream<A> =>
  Stream((o) => {
    let cancelled = false;
    p.then((a) => {
      if (!cancelled) {
        o.next(a);
        o.complete?.();
      }
    }).catch((e) => {
      if (!cancelled) o.error?.(e);
    });
    return () => {
      cancelled = true;
    };
  });

/**
 * Emit an increasing integer every `ms` milliseconds.
 */
Stream.interval = (ms: number): Stream<number> =>
  Stream((o) => {
    let count = 0;
    const id = setInterval(() => o.next(count++), ms);
    return () => clearInterval(id);
  });

/**
 * Emit `undefined` every `ms` milliseconds.
 */
Stream.periodic = (ms: number): Stream<void> =>
  Stream((o) => {
    const id = setInterval(() => o.next(undefined), ms);
    return () => clearInterval(id);
  });

/**
 * Create a Stream from DOM events.
 *
 * @param target EventTarget to subscribe on
 * @param eventName Event name string
 */
Stream.fromEvent = <E extends Event>(
  target: EventTarget,
  eventName: string
): Stream<E> =>
  Stream((o) => {
    const handler = (e: Event) => o.next(e as E);
    target.addEventListener(eventName, handler);
    return () => target.removeEventListener(eventName, handler);
  });

/** Merge two streams, interleaving events as they arrive. */
Stream.merge = <A>(s1: Stream<A>, s2: Stream<A>): Stream<A> =>
  Stream((o) => {
    const unsub1 = s1.subscribe(o);
    const unsub2 = s2.subscribe(o);
    return () => {
      unsub1();
      unsub2();
    };
  });

/**
 * Concatenate two streams:
 * - consume s1 fully
 * - then subscribe to s2
 */
Stream.concat = <A>(s1: Stream<A>, s2: Stream<A>): Stream<A> =>
  Stream((o) => {
    let unsub2: Unsubscribe | null = null;
    const unsub1 = s1.subscribe({
      next: o.next,
      error: o.error,
      complete: () => {
        unsub2 = s2.subscribe(o);
      },
    });
    return () => {
      unsub1();
      unsub2?.();
    };
  });

/**
 * Combine latest values from two streams.
 * Emits whenever either stream updates, but only after both have emitted at least once.
 */
Stream.combineLatest = <A, B>(sa: Stream<A>, sb: Stream<B>): Stream<[A, B]> =>
  Stream((o) => {
    let latestA: A | undefined;
    let latestB: B | undefined;
    let hasA = false;
    let hasB = false;

    const emit = () => {
      if (hasA && hasB) {
        o.next([latestA!, latestB!]);
      }
    };

    const unsubA = sa.subscribe({
      next: (a) => {
        latestA = a;
        hasA = true;
        emit();
      },
      error: o.error,
    });

    const unsubB = sb.subscribe({
      next: (b) => {
        latestB = b;
        hasB = true;
        emit();
      },
      error: o.error,
    });

    return () => {
      unsubA();
      unsubB();
    };
  });

/**
 * Zip two streams pairwise.
 * Emits only when both queues have available events.
 */
Stream.zip = <A, B>(sa: Stream<A>, sb: Stream<B>): Stream<[A, B]> =>
  Stream((o) => {
    const queueA: A[] = [];
    const queueB: B[] = [];

    const tryEmit = () => {
      if (queueA.length > 0 && queueB.length > 0) {
        o.next([queueA.shift()!, queueB.shift()!]);
      }
    };

    const unsubA = sa.subscribe({
      next: (a) => {
        queueA.push(a);
        tryEmit();
      },
      error: o.error,
      complete: o.complete,
    });

    const unsubB = sb.subscribe({
      next: (b) => {
        queueB.push(b);
        tryEmit();
      },
      error: o.error,
      complete: o.complete,
    });

    return () => {
      unsubA();
      unsubB();
    };
  });

/**
 * Debounce a stream: wait `ms` milliseconds after each event before emitting.
 */
Stream.debounce =
  <A>(ms: number) =>
  (s: Stream<A>): Stream<A> =>
    Stream((o) => {
      let timeoutId: NodeJS.Timeout | null = null;
      const unsub = s.subscribe({
        next: (a) => {
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => o.next(a), ms);
        },
        error: o.error,
        complete: o.complete,
      });
      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        unsub();
      };
    });

/**
 * Throttle a stream: emit at most one event every `ms` milliseconds.
 */
Stream.throttle =
  <A>(ms: number) =>
  (s: Stream<A>): Stream<A> =>
    Stream((o) => {
      let lastEmit = 0;
      return s.subscribe({
        next: (a) => {
          const now = Date.now();
          if (now - lastEmit >= ms) {
            o.next(a);
            lastEmit = now;
          }
        },
        error: o.error,
        complete: o.complete,
      });
    });

/**
 * Emit only when the value differs from the previous emission.
 *
 * @param equals Optional custom equality check
 */
Stream.distinctUntilChanged =
  <A>(equals?: (a: A, b: A) => boolean) =>
  (s: Stream<A>): Stream<A> =>
    Stream((o) => {
      let last: A | undefined;
      let hasLast = false;
      const eq = equals || ((a, b) => a === b);

      return s.subscribe({
        next: (a) => {
          if (!hasLast || !eq(last!, a)) {
            o.next(a);
            last = a;
            hasLast = true;
          }
        },
        error: o.error,
        complete: o.complete,
      });
    });

export default Stream;
