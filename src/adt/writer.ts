// src/adt/writer.ts

/**
 * Unique brand for nominal typing of Writer.
 */
const WriterBrand = Symbol("WriterBrand");

/**
 * Writer<W, A> accumulates a monoidal log W alongside a computed value A.
 *
 * @typeParam W Log type (must form a monoid with empty and combine)
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
  ap: <B>(wf: Writer<W, (a: A) => B>) => Writer<W, B>;

  /** Access the combine function for this Writer instance. */
  _combine: (w1: W, w2: W) => W;

  /** Access the empty value for this Writer instance. */
  _empty: W;
};

/**
 * Default monoid combine strategy when no custom combiner is supplied.
 * - Arrays: concat
 * - Strings: concat
 * - Numbers: add
 * - Objects: shallow merge
 * - Throws error for unsupported types to maintain monoid laws
 */
const defaultCombine = <W>(w1: W, w2: W): W => {
  if (Array.isArray(w1) && Array.isArray(w2)) {
    return [...w1, ...w2] as any as W;
  }
  if (typeof w1 === "string" && typeof w2 === "string") {
    return (w1 + w2) as any as W;
  }
  if (typeof w1 === "number" && typeof w2 === "number") {
    return (w1 + w2) as any as W;
  }
  if (
    w1 != null &&
    w2 != null &&
    typeof w1 === "object" &&
    typeof w2 === "object" &&
    !Array.isArray(w1) &&
    !Array.isArray(w2)
  ) {
    return { ...(w1 as any), ...(w2 as any) } as W;
  }

  // Throw error instead of silently dropping w1 (violates monoid laws)
  throw new Error(
    `Writer.defaultCombine: unsupported types. ` +
      `Provide explicit combine function for type W. ` +
      `Received: ${typeof w1}, ${typeof w2}`
  );
};

/**
 * Internal constructor that creates a Writer with monoid operations baked in.
 * This ensures all operations maintain the monoid contract.
 */
const make = <W, A>(
  empty: W,
  combine: (w1: W, w2: W) => W,
  run: () => [A, W]
): Writer<W, A> => ({
  [WriterBrand]: true,
  run,
  _combine: combine,
  _empty: empty,

  map: <B>(f: (a: A) => B): Writer<W, B> =>
    make(empty, combine, () => {
      const [a, w] = run();
      return [f(a), w];
    }),

  chain: <B>(f: (a: A) => Writer<W, B>): Writer<W, B> =>
    make(empty, combine, () => {
      const [a, w1] = run();
      const writerB = f(a);
      const [b, w2] = writerB.run();
      return [b, combine(w1, w2)];
    }),

  ap: <B>(wf: Writer<W, (a: A) => B>): Writer<W, B> =>
    make(empty, combine, () => {
      const [fn, w1] = wf.run();
      const [a, w2] = run();
      return [fn(a), combine(w1, w2)];
    }),
});

/**
 * Lift a pure value into Writer with empty log.
 *
 * @param a The value to wrap
 * @param empty The monoid empty/identity element
 * @param combine The monoid combine operation (defaults to smart combine)
 *
 * @example
 * Writer.of(42, [], (a, b) => [...a, ...b])  // Writer with empty array log
 * Writer.of(42, "", (a, b) => a + b)         // Writer with empty string log
 */
const of = <W, A>(
  a: A,
  empty: W,
  combine: (w1: W, w2: W) => W = defaultCombine
): Writer<W, A> => make(empty, combine, () => [a, empty]);

/**
 * Write a log entry without producing a value.
 *
 * @param w The log value to write
 * @param empty The monoid empty/identity element
 * @param combine The monoid combine operation
 *
 * @example
 * Writer.tell(["action performed"], [], (a, b) => [...a, ...b])
 */
const tell = <W>(
  w: W,
  empty: W,
  combine: (w1: W, w2: W) => W = defaultCombine
): Writer<W, void> => make(empty, combine, () => [undefined, w]);

/**
 * Execute a Writer and also include the log in the result.
 * Useful for introspecting the accumulated log.
 *
 * @param wa The Writer to listen to
 * @param empty The monoid empty element (used for creating new Writer)
 * @param combine The monoid combine operation
 *
 * @example
 * const w = Writer.of(42, "", (a, b) => a + b);
 * const listened = Writer.listen(w, "", (a, b) => a + b);
 * listened.run() // [[42, ""], ""]
 */
const listen = <W, A>(wa: Writer<W, A>): Writer<W, [A, W]> => {
  // Extract monoid operations from the input Writer
  const empty = wa._empty;
  const combine = wa._combine;

  return make(empty, combine, () => {
    const [a, w] = wa.run();
    return [[a, w], w];
  });
};

/**
 * Execute a Writer and pass both the value and log to a function,
 * then continue with the modified log.
 *
 * @param wa The Writer to censor
 * @param f Function to transform the log
 *
 * @example
 * const w = Writer.tell(["error"], [], (a, b) => [...a, ...b]);
 * const censored = Writer.censor(w, logs => logs.map(l => "[REDACTED]"));
 */
const censor = <W, A>(wa: Writer<W, A>, f: (w: W) => W): Writer<W, A> => {
  const empty = wa._empty;
  const combine = wa._combine;

  return make(empty, combine, () => {
    const [a, w] = wa.run();
    return [a, f(w)];
  });
};

/**
 * Sequence an array of Writers, combining logs sequentially.
 *
 * @param writers Array of Writers to sequence
 * @param empty The monoid empty element
 * @param combine The monoid combine operation
 *
 * @example
 * const w1 = Writer.of(1, [], (a, b) => [...a, ...b]);
 * const w2 = Writer.of(2, [], (a, b) => [...a, ...b]);
 * Writer.sequence([w1, w2], [], (a, b) => [...a, ...b]).run() // [[1, 2], []]
 */
const sequence = <W, A>(
  writers: Writer<W, A>[],
  empty: W,
  combine: (w1: W, w2: W) => W = defaultCombine
): Writer<W, A[]> =>
  make(empty, combine, () => {
    const results: A[] = [];
    let acc = empty;

    for (const w of writers) {
      const [a, log] = w.run();
      results.push(a);
      acc = combine(acc, log);
    }

    return [results, acc];
  });

/**
 * Traverse an array using a Writer-producing function, collecting results and logs.
 *
 * @param f Function that produces a Writer for each element
 * @param empty The monoid empty element
 * @param combine The monoid combine operation
 *
 * @example
 * const f = (n: number) => Writer.of(n * 2, [n], (a, b) => [...a, ...b]);
 * Writer.traverse(f, [], (a, b) => [...a, ...b])([1, 2, 3]).run()
 * // [[2, 4, 6], [1, 2, 3]]
 */
const traverse =
  <W, A, B>(
    f: (a: A) => Writer<W, B>,
    empty: W,
    combine: (w1: W, w2: W) => W = defaultCombine
  ) =>
  (arr: A[]): Writer<W, B[]> =>
    sequence(arr.map(f), empty, combine);

/**
 * Point-free map over Writer.
 */
const map =
  <W, A, B>(f: (a: A) => B) =>
  (wa: Writer<W, A>): Writer<W, B> =>
    wa.map(f);

/**
 * Point-free chain over Writer.
 */
const chain =
  <W, A, B>(f: (a: A) => Writer<W, B>) =>
  (wa: Writer<W, A>): Writer<W, B> =>
    wa.chain(f);

/**
 * Point-free ap over Writer.
 */
const ap =
  <W, A, B>(wf: Writer<W, (a: A) => B>) =>
  (wa: Writer<W, A>): Writer<W, B> =>
    wa.ap(wf);

/**
 * Extract the value from a Writer, discarding the log.
 */
const evalWriter = <W, A>(wa: Writer<W, A>): A => wa.run()[0];

/**
 * Extract the log from a Writer, discarding the value.
 */
const execWriter = <W, A>(wa: Writer<W, A>): W => wa.run()[1];

/**
 * Unified namespace export containing all Writer functions and types.
 */
export const Writer = {
  of,
  tell,
  listen,
  censor,
  sequence,
  traverse,
  map,
  chain,
  ap,
  evalWriter,
  execWriter,
};

export default Writer;
