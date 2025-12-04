declare const WriterBrand: unique symbol;

export type Writer<W, A> = {
  run: () => [A, W];
  map: <B>(f: (a: A) => B) => Writer<W, B>;
  chain: <B>(f: (a: A) => Writer<W, B>) => Writer<W, B>;
  ap: <B>(fb: Writer<W, (a: A) => B>) => Writer<W, B>;
};

/**
 * Internal default monoid combine:
 * - arrays: concat
 * - strings: concat
 * - numbers: add
 * - objects: shallow merge
 * - fallback: return w2
 */
function defaultCombine<W>(w1: W, w2: W): W {
  if (Array.isArray(w1) && Array.isArray(w2)) return [...w1, ...w2] as any as W;

  if (typeof w1 === "string" && typeof w2 === "string")
    return (w1 + w2) as any as W;

  if (typeof w1 === "number" && typeof w2 === "number")
    return (w1 + w2) as any as W;

  if (
    w1 != null &&
    w2 != null &&
    typeof w1 === "object" &&
    typeof w2 === "object"
  )
    return { ...(w1 as any), ...(w2 as any) };

  // fallback: non-breaking legacy behavior
  return w2;
}

/**
 * Writer constructor with explicit monoid combine.
 */
export const Writer = <W, A>(
  run: () => [A, W],
  combine: (w1: W, w2: W) => W = defaultCombine
): Writer<W, A> => ({
  run,

  map: <B>(f: (a: A) => B): Writer<W, B> =>
    Writer(() => {
      const [a, w] = run();
      return [f(a), w];
    }, combine),

  chain: <B>(f: (a: A) => Writer<W, B>): Writer<W, B> =>
    Writer(() => {
      const [a, w1] = run();
      const [b, w2] = f(a).run();
      return [b, combine(w1, w2)];
    }, combine),

  ap: <B>(fb: Writer<W, (a: A) => B>): Writer<W, B> =>
    Writer(() => {
      const [fn, w1] = fb.run();
      const [a, w2] = run();
      return [fn(a), combine(w1, w2)];
    }, combine),
});

/**
 * Writer.of: requires W's monoid identity.
 */
Writer.of = <W, A>(
  a: A,
  empty: W,
  combine?: (w1: W, w2: W) => W
): Writer<W, A> => Writer(() => [a, empty], combine);

/**
 * Write a log entry.
 */
Writer.tell = <W>(w: W, combine?: (w1: W, w2: W) => W): Writer<W, void> =>
  Writer(() => [undefined, w], combine);

/**
 * Sequence array of writers.
 */
Writer.sequence = <W, A>(
  writers: Writer<W, A>[],
  combine: (w1: W, w2: W) => W = defaultCombine
): Writer<W, A[]> =>
  Writer(() => {
    const values: A[] = [];
    let accLog: W | undefined = undefined;

    for (const w of writers) {
      const [value, log] = w.run();
      values.push(value);
      accLog = accLog === undefined ? log : combine(accLog, log);
    }

    return [values, accLog as W];
  }, combine);

/**
 * Traverse array using Writer.
 */
Writer.traverse =
  <W, A, B>(
    f: (a: A) => Writer<W, B>,
    combine: (w1: W, w2: W) => W = defaultCombine
  ) =>
  (arr: A[]): Writer<W, B[]> =>
    Writer.sequence(arr.map(f), combine);

export default Writer;
