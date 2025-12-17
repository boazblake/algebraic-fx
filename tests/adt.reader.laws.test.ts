// tests/adt.reader.laws.test.ts
import fc from "fast-check";
import { Reader, of, map, ap, chain } from "../src/adt/reader.js";

describe("Reader laws", () => {
  type Env = { tag: string };

  const env: Env = { tag: "env" };

  const arbNumberReader = (): fc.Arbitrary<
    ReturnType<typeof of<Env, number>>
  > => fc.integer().map((n) => of<Env, number>(n));

  const run = <A>(r: Reader<Env, A>): A => r.run(env);

  test("Functor identity", () => {
    fc.assert(
      fc.property(arbNumberReader(), (fa) => {
        const lhs = map<Env, number, number>((x) => x)(fa);
        const rhs = fa;
        expect(run(lhs)).toBe(run(rhs));
      })
    );
  });

  test("Functor composition", () => {
    fc.assert(
      fc.property(
        arbNumberReader(),
        fc.func(fc.integer()),
        fc.func(fc.integer()),
        (fa, f, g) => {
          const lhs = map<Env, number, number>((x) => g(f(x)))(fa);
          const rhs = map<Env, number, number>(g)(
            map<Env, number, number>(f)(fa)
          );
          expect(run(lhs)).toBe(run(rhs));
        }
      )
    );
  });

  test("Applicative identity", () => {
    fc.assert(
      fc.property(arbNumberReader(), (fa) => {
        const pureId = of<Env, (x: number) => number>((x) => x);
        const lhs = ap<Env, number, number>(pureId)(fa);
        expect(run(lhs)).toBe(run(fa));
      })
    );
  });

  test("Applicative homomorphism", () => {
    fc.assert(
      fc.property(fc.integer(), fc.func(fc.integer()), (x, f) => {
        const lhs = ap<Env, number, number>(of<Env, (y: number) => number>(f))(
          of<Env, number>(x)
        );
        const rhs = of<Env, number>(f(x));
        expect(run(lhs)).toBe(run(rhs));
      })
    );
  });

  test("Applicative interchange", () => {
    fc.assert(
      fc.property(fc.integer(), fc.func(fc.integer()), (y, f) => {
        const u = of<Env, (x: number) => number>(f);
        const lhs = ap<Env, number, number>(u)(of<Env, number>(y));
        const rhs = ap<Env, (x: number) => number, number>(
          of<Env, (g: (x: number) => number) => number>((g) => g(y))
        )(u);
        expect(run(lhs)).toBe(run(rhs));
      })
    );
  });

  test("Monad left identity", () => {
    fc.assert(
      fc.property(fc.integer(), fc.func(fc.integer()), (a, fBody) => {
        const f = (x: number) => of<Env, number>(fBody(x));
        const lhs = chain<Env, number, number>(f)(of<Env, number>(a));
        const rhs = f(a);
        expect(run(lhs)).toBe(run(rhs));
      })
    );
  });

  test("Monad right identity", () => {
    fc.assert(
      fc.property(arbNumberReader(), (m) => {
        const lhs = chain<Env, number, number>((x) => of<Env, number>(x))(m);
        expect(run(lhs)).toBe(run(m));
      })
    );
  });

  test("Monad associativity", () => {
    fc.assert(
      fc.property(
        arbNumberReader(),
        fc.func(fc.integer()),
        fc.func(fc.integer()),
        (m, fBody, gBody) => {
          const f = (x: number) => of<Env, number>(fBody(x));
          const g = (x: number) => of<Env, number>(gBody(x));

          const lhs = chain<Env, number, number>(g)(
            chain<Env, number, number>(f)(m)
          );
          const rhs = chain<Env, number, number>((x) =>
            chain<Env, number, number>(g)(f(x))
          )(m);

          expect(run(lhs)).toBe(run(rhs));
        }
      )
    );
  });
});
