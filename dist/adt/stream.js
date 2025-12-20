// src/adt/stream.ts
import { fl } from "./fl.js";
const mkStream = (subscribe) => {
    const self = {
        _tag: "Stream",
        subscribe,
        map(f) {
            return mkStream((listener) => subscribe((a) => listener(f(a))));
        },
        filter(pred) {
            return mkStream((listener) => subscribe((a) => {
                if (pred(a))
                    listener(a);
            }));
        },
        scan(f, initial) {
            let acc = initial;
            return mkStream((listener) => {
                listener(acc);
                return subscribe((a) => {
                    acc = f(acc, a);
                    listener(acc);
                });
            });
        },
        [fl.map](f) {
            return self.map(f);
        },
    };
    return self;
};
export const Stream = Object.assign((subscribe) => mkStream(subscribe), {
    // Manual emitter constructor
    new() {
        const listeners = new Set();
        return mkStream((listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        });
    },
    // Emitter API
    create() {
        const listeners = new Set();
        const stream = mkStream((listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        });
        const emit = (value) => {
            listeners.forEach((f) => f(value));
        };
        return [stream, emit];
    },
    // Finite helper
    fromArray(arr) {
        return mkStream((listener) => {
            arr.forEach(listener);
            return () => { };
        });
    },
    debounce(ms) {
        return (stream) => mkStream((listener) => {
            let timeout = null;
            const unsub = stream.subscribe((a) => {
                if (timeout !== null)
                    clearTimeout(timeout);
                timeout = setTimeout(() => {
                    listener(a);
                    timeout = null;
                }, ms);
            });
            return () => {
                if (timeout !== null)
                    clearTimeout(timeout);
                unsub();
            };
        });
    },
});
export const createStream = Stream.create;
//# sourceMappingURL=stream.js.map