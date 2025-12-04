/**
 * Unique brand for nominal typing of Writer.
 */
declare const WriterBrand: unique symbol;

/**
 * Writer<W, A> accumulates a monoidal log W alongside a computed value A.
 *
 * @typeParam W Log type
 * @typeParam A Result value type
 */
export type Writer<W, A> = {
  readonly [WriterBrand]: true;

  /** Execute computation: returns `[value, log]`. */
  run: () => [A, W];

  /** Functor map: transform the result value only. */
  map: <B>(f: (a: A) => B) => Writer<W, B>;

  /** Monad chain: sequence computations, combining logs. */
  chain: <B>(f: (a: A) => Writer<W, B>) => Writer<W, B>;

  /** Applicative ap: apply logged function to logged value. */
  ap: <B>(fb: Writer<W, (a: A) => B>) => Writer<W, B>;
};

/**
 * Default monoid combine strategy when no custom combiner is supplied.
 * - Arrays: concat
 * - Strings: concat
 * - Numbers: add
 * - Objects: shallow merge
 * - Fallback: return w2
 */
function defaultCombine<W>(w1: W, w2: W): W {
  if (Array.isArray(w1) && Array.isArray(w2)) return [...w1, ...w2] as any as W;
  if (typeof w1 === "string" && typeof w2 === "string")
    return (w1 + w2) as any as W;
  if (typeof w1 === "number" && typeof w2 === "number")
    return (w1 + w2) as any as W;
  if (
    typeof w1 === "object" &&
    typeof w2 === "object" &&
    w1 != null &&
    w2 != null
  )
    return { ...(w1 as any), ...(w2 as any) };
  return w2;
}

/**
 * Writer constructor.
 */
export const Writer = <W, A>(
  run: () => [A, W],
  combine: (w1: W, w2: W) => W = defaultCombine
): Writer<W, A> => {
  const self: Writer<W, A> = {
    [WriterBrand]: true,

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
  };

  return self;
};

/**
 * Lift a value into Writer with empty log.
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
 * Sequence an array of Writers, combining logs sequentially.
 */
Writer.sequence = <W, A>(
  writers: Writer<W, A>[],
  combine: (w1: W, w2: W) => W = defaultCombine
): Writer<W, A[]> =>
  Writer(() => {
    const values: A[] = [];
    let acc: W | undefined = undefined;
    for (const w of writers) {
      const [a, log] = w.run();
      values.push(a);
      acc = acc === undefined ? log : combine(acc, log);
    }
    return [values, acc as W];
  }, combine);

/**
 * Traverse an array and collect results.
 */
Writer.traverse =
  <W, A, B>(
    f: (a: A) => Writer<W, B>,
    combine: (w1: W, w2: W) => W = defaultCombine
  ) =>
  (arr: A[]): Writer<W, B[]> =>
    Writer.sequence(arr.map(f), combine);

export default Writer;
