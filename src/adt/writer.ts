// src/adt/writer.ts
import { fl } from "./fl.js";
import type { Monoid } from "./monoid.js";

export type Writer<W, A> = {
  readonly run: () => [A, W];
};

const WRITER_MONOID: unique symbol = Symbol("WriterMonoid");

type WriterInternal<W, A> = Writer<W, A> & {
  readonly [WRITER_MONOID]: Monoid<W>;
  [fl.map]<B>(f: (a: A) => B): Writer<W, B>;
  [fl.chain]<B>(f: (a: A) => Writer<W, B>): Writer<W, B>;
  [fl.ap]<B>(wa: Writer<W, (a: A) => B>): Writer<W, B>;
};

const makeWriter = <W, A>(
  m: Monoid<W>,
  run: () => [A, W]
): WriterInternal<W, A> => {
  const self: WriterInternal<W, A> = {
    run,
    [WRITER_MONOID]: m,
    [fl.map]<B>(f: (a: A) => B): Writer<W, B> {
      return map<W, A, B>(self, f);
    },
    [fl.chain]<B>(f: (a: A) => Writer<W, B>): Writer<W, B> {
      return chain<W, A, B>(self, f);
    },
    [fl.ap]<B>(wf: Writer<W, (a: A) => B>): Writer<W, B> {
      return ap<W, A, B>(wf, self);
    },
  };

  return self;
};

/**
 * of: construct a Writer with value and optional initial log.
 * If log is omitted, uses the monoid empty.
 */
export const of = <W, A>(m: Monoid<W>, a: A, w?: W): Writer<W, A> =>
  makeWriter(m, () => [a, w ?? m.empty]);

/**
 * tell: append a log value, with void result.
 */
export const tell = <W>(m: Monoid<W>, w: W): Writer<W, void> =>
  makeWriter(m, () => [undefined as void, w]);

/**
 * map: transform the value, keep the same log.
 */
export const map = <W, A, B>(
  wa: Writer<W, A>,
  f: (a: A) => B
): Writer<W, B> => {
  const wi = wa as WriterInternal<W, A>;
  const m = wi[WRITER_MONOID];
  const [a, w] = wi.run();
  return makeWriter(m, () => [f(a), w]);
};

/**
 * chain: sequence computations and combine logs via the monoid.
 */
export const chain = <W, A, B>(
  wa: Writer<W, A>,
  f: (a: A) => Writer<W, B>
): Writer<W, B> => {
  const wi = wa as WriterInternal<W, A>;
  const m = wi[WRITER_MONOID];
  const [a, w1] = wi.run();
  const [b, w2] = (f(a) as WriterInternal<W, B>).run();
  return makeWriter(m, () => [b, m.concat(w1, w2)]);
};

/**
 * ap: apply a Writer<W, (a -> b)> to a Writer<W, a>, combining logs.
 */
export const ap = <W, A, B>(
  wf: Writer<W, (a: A) => B>,
  wa: Writer<W, A>
): Writer<W, B> => {
  const wfI = wf as WriterInternal<W, (a: A) => B>;
  const waI = wa as WriterInternal<W, A>;
  const m = wfI[WRITER_MONOID];

  const [g, w1] = wfI.run();
  const [a, w2] = waI.run();

  return makeWriter(m, () => [g(a), m.concat(w1, w2)]);
};

/**
 * listen: produce [value, log] as value, keep same log.
 */
export const listen = <W, A>(wa: Writer<W, A>): Writer<W, [A, W]> => {
  const [a, w] = wa.run();
  return {
    run: () => [[a, w], w],
  };
};

/**
 * Narrow type guard.
 */
export const isWriter = (u: unknown): u is Writer<unknown, unknown> =>
  !!u && typeof u === "object" && typeof (u as any).run === "function";

/**
 * fp-ts style module dictionary for a fixed monoid W.
 */
export const WriterModule = <W>(m: Monoid<W>) => {
  const ofM = <A>(a: A, w?: W): Writer<W, A> => of(m, a, w);
  const mapM = <A, B>(wa: Writer<W, A>, f: (a: A) => B): Writer<W, B> =>
    map(wa, f);
  const chainM = <A, B>(
    wa: Writer<W, A>,
    f: (a: A) => Writer<W, B>
  ): Writer<W, B> => chain(wa, f);
  const apM = <A, B>(
    wf: Writer<W, (a: A) => B>,
    wa: Writer<W, A>
  ): Writer<W, B> => ap(wf, wa);
  const tellM = (w: W): Writer<W, void> => tell(m, w);
  const listenM = listen as <A>(wa: Writer<W, A>) => Writer<W, [A, W]>;

  const module = {
    of: ofM,
    map: mapM,
    chain: chainM,
    ap: apM,
    tell: tellM,
    listen: listenM,
    isWriter,
    [fl.of]: ofM,
  };

  return module;
};
