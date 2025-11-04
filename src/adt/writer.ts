export type Writer<W, A> = {
  run: () => [A, W];
  map: <B>(f: (a: A) => B) => Writer<W, B>;
  chain: <B>(f: (a: A) => Writer<W, B>) => Writer<W, B>;
};

/** Writer constructor */
export const Writer = <W, A>(run: () => [A, W]): Writer<W, A> => ({
  run,
  map: <B>(f: (a: A) => B): Writer<W, B> =>
    Writer(() => {
      const [a, w] = run();
      return [f(a), w];
    }),

  chain: <B>(f: (a: A) => Writer<W, B>): Writer<W, B> =>
    Writer(() => {
      const [a, w1] = run();
      const [b, w2] = f(a).run();
      const combined = Array.isArray(w1)
        ? ([...(w1 as any), ...(w2 as any)] as any as W)
        : (w2 as W);
      return [b, combined];
    }),
});

/** Static helpers */
Writer.of = <W, A>(a: A, empty: W): Writer<W, A> => Writer(() => [a, empty]);
Writer.tell = <W>(w: W): Writer<W, void> => Writer(() => [undefined, w]);

/** Utility for updating + logging */
Writer.updateValueAndLog = <A>(
  w: Writer<string[], A>,
  message: string
): Writer<string[], A> =>
  w.chain((a) => Writer(() => [a, [message]]));

/** Unified object export */
export default Writer;
