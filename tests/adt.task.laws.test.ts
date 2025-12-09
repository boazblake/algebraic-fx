// tests/adt.task.laws.test.ts
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import TaskModule, { type Task as TaskT } from "../src/adt/task.ts";
import { Right, Left, type Either as EitherT } from "../src/adt/either.ts";

const Task = TaskModule;

// Arbitrary pure async Task<never, number>
const arbTaskNumber: fc.Arbitrary<TaskT<never, number>> = fc
  .integer()
  .map((n) => Task.of(n));

// Helper equality for Task<never, number>
const eqTaskNumber = async (
  t1: TaskT<never, number>,
  t2: TaskT<never, number>
): Promise<boolean> => {
  const r1 = await t1.run();
  const r2 = await t2.run();
  if (r1._tag === "Right" && r2._tag === "Right") return r1.right === r2.right;
  if (r1._tag === "Left" && r2._tag === "Left") return true; // no error type here
  return false;
};

describe("Task laws (fast-check)", () => {
  it("Functor identity", async () => {
    await fc.assert(
      fc.asyncProperty(arbTaskNumber, async (fa) => {
        const id = (x: number): number => x;
        const lhs = fa.map(id);
        const rhs = fa;
        expect(await eqTaskNumber(lhs, rhs)).toBe(true);
      })
    );
  });

  it("Functor composition", async () => {
    await fc.assert(
      fc.asyncProperty(
        arbTaskNumber,
        fc.func<number, number>(fc.integer()),
        fc.func<number, number>(fc.integer()),
        async (fa, f, g) => {
          const compose = (x: number): number => f(g(x));
          const lhs = fa.map(compose);
          const rhs = fa.map(g).map(f);
          expect(await eqTaskNumber(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  it("Monad left identity", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer(),
        fc.func<number, TaskT<never, number>>(arbTaskNumber),
        async (a, f) => {
          const lhs = Task.of(a).chain(f);
          const rhs = f(a);
          expect(await eqTaskNumber(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  it("Monad right identity", async () => {
    await fc.assert(
      fc.asyncProperty(arbTaskNumber, async (fa) => {
        const lhs = fa.chain(Task.of);
        const rhs = fa;
        expect(await eqTaskNumber(lhs, rhs)).toBe(true);
      })
    );
  });

  it("Monad associativity", async () => {
    await fc.assert(
      fc.asyncProperty(
        arbTaskNumber,
        fc.func<number, TaskT<never, number>>(arbTaskNumber),
        fc.func<number, TaskT<never, number>>(arbTaskNumber),
        async (fa, f, g) => {
          const lhs = fa.chain(f).chain(g);
          const rhs = fa.chain((a) => f(a).chain(g));
          expect(await eqTaskNumber(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  // Applicative identity: pure id <*> v = v
  it("Applicative identity", async () => {
    await fc.assert(
      fc.asyncProperty(arbTaskNumber, async (v) => {
        const id = (x: number): number => x;
        const pureId = Task.of<(x: number) => number>(id);
        const lhs = v.ap(pureId);
        const rhs = v;
        expect(await eqTaskNumber(lhs, rhs)).toBe(true);
      })
    );
  });

  // Basic cancellation: aborted signal short-circuits when used
  it("Cancellation: runWith respects aborted signal", async () => {
    const t: TaskT<string, number> = Task((signal) => {
      return new Promise<EitherT<string, number>>((resolve) => {
        if (signal?.aborted) {
          resolve(Left("aborted"));
          return;
        }
        const id = setTimeout(() => resolve(Right(42)), 10);
        signal?.addEventListener(
          "abort",
          () => {
            clearTimeout(id);
            resolve(Left("aborted"));
          },
          { once: true }
        );
      });
    });

    const controller = new AbortController();
    controller.abort();

    const res = await t.runWith(controller.signal);
    expect(res._tag).toBe("Left");
  });
});
