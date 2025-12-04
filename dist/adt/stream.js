/**
 * Stream constructor.
 *
 * All stream combinators ultimately call this function to build new streams.
 *
 * @param subscribe Function describing how to produce values for an observer
 */
export const Stream = (subscribe) => ({
    [StreamBrand]: true,
    subscribe,
    /** Functor map. */
    map: (f) => Stream((o) => subscribe({
        next: (a) => {
            try {
                o.next(f(a));
            }
            catch (e) {
                o.error?.(e);
            }
        },
        error: o.error,
        complete: o.complete,
    })),
    /**
     * Monadic bind / switchMap:
     * - Cancels previous inner stream when a new value arrives
     * - Subscribes to the next inner stream
     */
    chain: (f) => Stream((o) => {
        let innerUnsub = null;
        const outerUnsub = subscribe({
            next: (a) => {
                try {
                    const inner = f(a);
                    innerUnsub?.();
                    innerUnsub = inner.subscribe(o);
                }
                catch (e) {
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
    filter: (predicate) => Stream((o) => subscribe({
        next: (a) => {
            try {
                if (predicate(a))
                    o.next(a);
            }
            catch (e) {
                o.error?.(e);
            }
        },
        error: o.error,
        complete: o.complete,
    })),
    /** Accumulate state over time. */
    scan: (f, initial) => Stream((o) => {
        let acc = initial;
        return subscribe({
            next: (a) => {
                try {
                    acc = f(acc, a);
                    o.next(acc);
                }
                catch (e) {
                    o.error?.(e);
                }
            },
            error: o.error,
            complete: o.complete,
        });
    }),
    /** Emit only first n events then complete. */
    take: (n) => Stream((o) => {
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
    skip: (n) => Stream((o) => {
        let count = 0;
        return subscribe({
            next: (a) => {
                count++;
                if (count > n)
                    o.next(a);
            },
            error: o.error,
            complete: o.complete,
        });
    }),
});
/**
 * Create a Stream that emits a single value then completes.
 */
Stream.of = (a) => Stream((o) => {
    o.next(a);
    o.complete?.();
    return () => { };
});
/**
 * Emit all items of an array synchronously, then complete.
 */
Stream.fromArray = (arr) => Stream((o) => {
    arr.forEach((a) => o.next(a));
    o.complete?.();
    return () => { };
});
/**
 * Stream that immediately completes without emitting values.
 */
Stream.empty = () => Stream((o) => {
    o.complete?.();
    return () => { };
});
/**
 * Stream that never emits, errors, or completes.
 */
Stream.never = () => Stream(() => () => { });
/**
 * Convert a Promise into a Stream emitting one value then completing.
 * Unsubscription cancels the resolution (ignores result/error).
 */
Stream.fromPromise = (p) => Stream((o) => {
    let cancelled = false;
    p.then((a) => {
        if (!cancelled) {
            o.next(a);
            o.complete?.();
        }
    }).catch((e) => {
        if (!cancelled)
            o.error?.(e);
    });
    return () => {
        cancelled = true;
    };
});
/**
 * Emit an increasing integer every `ms` milliseconds.
 */
Stream.interval = (ms) => Stream((o) => {
    let count = 0;
    const id = setInterval(() => o.next(count++), ms);
    return () => clearInterval(id);
});
/**
 * Emit `undefined` every `ms` milliseconds.
 */
Stream.periodic = (ms) => Stream((o) => {
    const id = setInterval(() => o.next(undefined), ms);
    return () => clearInterval(id);
});
/**
 * Create a Stream from DOM events.
 *
 * @param target EventTarget to subscribe on
 * @param eventName Event name string
 */
Stream.fromEvent = (target, eventName) => Stream((o) => {
    const handler = (e) => o.next(e);
    target.addEventListener(eventName, handler);
    return () => target.removeEventListener(eventName, handler);
});
/** Merge two streams, interleaving events as they arrive. */
Stream.merge = (s1, s2) => Stream((o) => {
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
Stream.concat = (s1, s2) => Stream((o) => {
    let unsub2 = null;
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
Stream.combineLatest = (sa, sb) => Stream((o) => {
    let latestA;
    let latestB;
    let hasA = false;
    let hasB = false;
    const emit = () => {
        if (hasA && hasB) {
            o.next([latestA, latestB]);
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
Stream.zip = (sa, sb) => Stream((o) => {
    const queueA = [];
    const queueB = [];
    const tryEmit = () => {
        if (queueA.length > 0 && queueB.length > 0) {
            o.next([queueA.shift(), queueB.shift()]);
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
    (ms) => (s) => Stream((o) => {
        let timeoutId = null;
        const unsub = s.subscribe({
            next: (a) => {
                if (timeoutId)
                    clearTimeout(timeoutId);
                timeoutId = setTimeout(() => o.next(a), ms);
            },
            error: o.error,
            complete: o.complete,
        });
        return () => {
            if (timeoutId)
                clearTimeout(timeoutId);
            unsub();
        };
    });
/**
 * Throttle a stream: emit at most one event every `ms` milliseconds.
 */
Stream.throttle =
    (ms) => (s) => Stream((o) => {
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
    (equals) => (s) => Stream((o) => {
        let last;
        let hasLast = false;
        const eq = equals || ((a, b) => a === b);
        return s.subscribe({
            next: (a) => {
                if (!hasLast || !eq(last, a)) {
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
//# sourceMappingURL=stream.js.map