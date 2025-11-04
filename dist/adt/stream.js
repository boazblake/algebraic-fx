export const Stream = (subscribe) => ({
    subscribe,
    map: (f) => Stream((o) => subscribe({
        next: (a) => o.next(f(a)),
        complete: () => o.complete?.(),
    })),
});
Stream.of = (a) => Stream((o) => {
    o.next(a);
    o.complete?.();
    return () => { };
});
Stream.fromArray = (arr) => Stream((o) => {
    arr.forEach(o.next);
    o.complete?.();
    return () => { };
});
export default Stream;
