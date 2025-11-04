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

export const Stream = <A>(subscribe: (o: Observer<A>) => Unsubscribe): Stream<A> => ({
  subscribe,
  map: <B>(f: (a: A) => B): Stream<B> =>
    Stream((o) =>
      subscribe({
        next: (a) => o.next(f(a)),
        complete: () => o.complete?.(),
      })
    ),
});

Stream.of = <A>(a: A): Stream<A> =>
  Stream((o) => {
    o.next(a);
    o.complete?.();
    return () => {};
  });

Stream.fromArray = <A>(arr: A[]): Stream<A> =>
  Stream((o) => {
    arr.forEach(o.next);
    o.complete?.();
    return () => {};
  });

export default Stream;
