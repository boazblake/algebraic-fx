// src/adt/writer-task.ts
import type { Monoid } from "./monoid.js";
import type { Task as TaskT } from "./task.js";
import { TaskModule } from "./task.js";

export type WriterTask<W, E, A> = {
  readonly runTask: TaskT<E, [A, W]>;
  readonly monoid: Monoid<W>;
};

export const makeWriterTask = <W, E, A>(
  runTask: TaskT<E, [A, W]>,
  m: Monoid<W>
): WriterTask<W, E, A> => ({
  runTask,
  monoid: m,
});

export const of = <W, E, A>(m: Monoid<W>, a: A, w?: W): WriterTask<W, E, A> => {
  const initial: [A, W] = [a, w ?? m.empty];
  const task = TaskModule.of<E, [A, W]>(initial);
  return makeWriterTask<W, E, A>(task, m);
};

export const tell = <W, E>(m: Monoid<W>, w: W): WriterTask<W, E, void> => {
  const initial: [void, W] = [undefined as void, w];
  const task = TaskModule.of<E, [void, W]>(initial);
  return makeWriterTask<W, E, void>(task, m);
};

export const map = <W, E, A, B>(
  wa: WriterTask<W, E, A>,
  f: (a: A) => B
): WriterTask<W, E, B> => {
  const m = wa.monoid;
  const mapped = TaskModule.map<E, [A, W], [B, W]>(([a, w]) => [f(a), w])(
    wa.runTask
  );
  return makeWriterTask<W, E, B>(mapped, m);
};

export const chain = <W, E, A, B>(
  wa: WriterTask<W, E, A>,
  f: (a: A) => WriterTask<W, E, B>
): WriterTask<W, E, B> => {
  const m = wa.monoid;

  const chained = TaskModule.chain<E, [A, W], [B, W]>(([a, w1]) => {
    const wb = f(a);
    const tb = wb.runTask;
    return TaskModule.map<E, [B, W], [B, W]>(([b, w2]) => [
      b,
      m.concat(w1, w2),
    ])(tb);
  })(wa.runTask);

  return makeWriterTask<W, E, B>(chained, m);
};

export const ap = <W, E, A, B>(
  wf: WriterTask<W, E, (a: A) => B>,
  wa: WriterTask<W, E, A>
): WriterTask<W, E, B> => {
  const m = wf.monoid;

  const applied = TaskModule.chain<E, [(a: A) => B, W], [B, W]>(([g, w1]) =>
    TaskModule.map<E, [A, W], [B, W]>(([a, w2]) => [g(a), m.concat(w1, w2)])(
      wa.runTask
    )
  )(wf.runTask);

  return makeWriterTask<W, E, B>(applied, m);
};

export const liftTask = <W, E, A>(
  m: Monoid<W>,
  t: TaskT<E, A>
): WriterTask<W, E, A> => {
  const lifted = TaskModule.map<E, A, [A, W]>((a) => [a, m.empty])(t);
  return makeWriterTask<W, E, A>(lifted, m);
};

export const isWriterTask = (
  u: unknown
): u is WriterTask<unknown, unknown, unknown> =>
  !!u &&
  typeof u === "object" &&
  "runTask" in (u as any) &&
  TaskModule.isTask((u as any).runTask);

export const WriterTaskModule = <W>(m: Monoid<W>) => ({
  of: <E, A>(a: A, w?: W) => of<W, E, A>(m, a, w),
  map: <E, A, B>(wa: WriterTask<W, E, A>, f: (a: A) => B) =>
    map<W, E, A, B>(wa, f),
  chain: <E, A, B>(wa: WriterTask<W, E, A>, f: (a: A) => WriterTask<W, E, B>) =>
    chain<W, E, A, B>(wa, f),
  ap: <E, A, B>(wf: WriterTask<W, E, (a: A) => B>, wa: WriterTask<W, E, A>) =>
    ap<W, E, A, B>(wf, wa),
  tell: <E>(w: W) => tell<W, E>(m, w),
  liftTask: <E, A>(t: TaskT<E, A>) => liftTask<W, E, A>(m, t),
  isWriterTask,
});
