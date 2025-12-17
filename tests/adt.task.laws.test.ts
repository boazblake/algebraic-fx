// tests/adt.task.laws.test.ts
import { describe, it } from "vitest";
import fc from "fast-check";
import type { Task } from "@/adt/task";
import { TaskModule, of, map, ap, chain } from "@/adt/task";
import type { Either } from "@/adt/either";

const eqTask = async <E, A>(
  ta: Task<E, A>,
  tb: Task<E, A>
): Promise<boolean> => {
  const [ea, eb] = await Promise.all([ta.run(), tb.run()]);
  if (ea._tag !== eb._tag) return false;
  if (ea._tag === "Left") return Object.is(ea.left, (eb as any).left);
  return Object.is(ea.right, (eb as any).right);
};

describe("Task laws", () => {
  describe("Functor", () => {
    it("identity", async () => {
      await fc.assert(
        fc.asyncProperty(fc.integer(), async (n) => {
          const fa = of<number>(n);
          const lhs = map((x: number) => x)(fa);
          const rhs = fa;
          return await eqTask(lhs, rhs);
        })
      );
    });

    it("composition", async () => {
      const f = (n: number) => n + 1;
      const g = (n: number) => n * 2;

      await fc.assert(
        fc.asyncProperty(fc.integer(), async (n) => {
          const fa = of<number>(n);
          const lhs = map((x: number) => f(g(x)))(fa);
          const rhs = map(f)(map(g)(fa));
          return await eqTask(lhs, rhs);
        })
      );
    });
  });

  describe("Applicative", () => {
    it("identity", async () => {
      await fc.assert(
        fc.asyncProperty(fc.integer(), async (n) => {
          const v = of<number>(n);
          const id = of(<A>(x: A) => x);
          const lhs = ap(id as any)(v);
          const rhs = v;
          return await eqTask(lhs, rhs);
        })
      );
    });

    it("homomorphism", async () => {
      const f = (n: number) => n + 1;

      await fc.assert(
        fc.asyncProperty(fc.integer(), async (n) => {
          const lhs = ap(of(f))(of(n));
          const rhs = of(f(n));
          return await eqTask(lhs, rhs);
        })
      );
    });

    it("interchange", async () => {
      await fc.assert(
        fc.asyncProperty(fc.integer(), async (y) => {
          const u = of((n: number) => n + 1);
          const lhs = ap(u)(of(y));
          const rhs = ap(of((f: (n: number) => number) => f(y)))(u);
          return await eqTask(lhs, rhs);
        })
      );
    });
  });

  describe("Monad", () => {
    it("left identity", async () => {
      const f = (n: number) => of(n + 1);

      await fc.assert(
        fc.asyncProperty(fc.integer(), async (a) => {
          const lhs = chain(f)(of(a));
          const rhs = f(a);
          return await eqTask(lhs, rhs);
        })
      );
    });

    it("right identity", async () => {
      await fc.assert(
        fc.asyncProperty(fc.integer(), async (a) => {
          const m = of(a);
          const lhs = chain(of)(m);
          const rhs = m;
          return await eqTask(lhs, rhs);
        })
      );
    });

    it("associativity", async () => {
      const f = (n: number) => of(n + 1);
      const g = (n: number) => of(n * 2);

      await fc.assert(
        fc.asyncProperty(fc.integer(), async (a) => {
          const m = of(a);
          const lhs = chain(g)(chain(f)(m));
          const rhs = chain((x: number) => chain(g)(f(x)))(m);
          return await eqTask(lhs, rhs);
        })
      );
    });
  });
});
