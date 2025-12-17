// src/adt/stream.ts
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

const mkStream = <A>(
  subscribe: (listener: Listener<A>) => Unsubscribe
): Stream<A> => {
  const self: Stream<A> = {
    _tag: "Stream",

    subscribe,

    map<B>(f: (a: A) => B): Stream<B> {
      return mkStream<B>((listener) => subscribe((a) => listener(f(a))));
    },

    filter(pred: (a: A) => boolean): Stream<A> {
      return mkStream<A>((listener) =>
        subscribe((a) => {
          if (pred(a)) listener(a);
        })
      );
    },

    scan<B>(f: (acc: B, a: A) => B, initial: B): Stream<B> {
      let acc = initial;
      return mkStream<B>((listener) => {
        listener(acc);
        return subscribe((a) => {
          acc = f(acc, a);
          listener(acc);
        });
      });
    },

    [fl.map]<B>(f: (a: A) => B): Stream<B> {
      return self.map(f);
    },
  };
  return self;
};

export const Stream = Object.assign(
  <A>(subscribe: (listener: Listener<A>) => Unsubscribe): Stream<A> =>
    mkStream(subscribe),

  {
    // Manual emitter constructor
    new<A>() {
      const listeners = new Set<Listener<A>>();
      return mkStream<A>((listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      });
    },

    // Emitter API
    create<A>(): [Stream<A>, (value: A) => void] {
      const listeners = new Set<Listener<A>>();

      const stream = mkStream<A>((listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      });

      const emit = (value: A) => {
        listeners.forEach((f) => f(value));
      };

      return [stream, emit];
    },

    // Finite helper
    fromArray<A>(arr: readonly A[]): Stream<A> {
      return mkStream<A>((listener) => {
        arr.forEach(listener);
        return () => {};
      });
    },

    debounce<A>(ms: number) {
      return (stream: Stream<A>): Stream<A> =>
        mkStream<A>((listener) => {
          let timeout: any = null;

          const unsub = stream.subscribe((a) => {
            if (timeout !== null) clearTimeout(timeout);
            timeout = setTimeout(() => {
              listener(a);
              timeout = null;
            }, ms);
          });

          return () => {
            if (timeout !== null) clearTimeout(timeout);
            unsub();
          };
        });
    },
  }
);

export const createStream = Stream.create;
