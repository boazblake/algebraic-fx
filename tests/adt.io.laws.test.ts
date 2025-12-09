import { describe, it } from "vitest";
import fc from "fast-check";
import IO from "../src/adt/io.ts";

// Helpers
const eqIO = <A>(
  io1: any,
  io2: any,
  eq: (a: A, b: A) => boolean = Object.is
) => {
  const a = io1.run();
  const b = io2.run();
  if (!eq(a, b)) throw new Error(`IO mismatch: ${a} vs ${b}`);
};

describe("IO laws", () => {
  // Functor: identity
  it("functor identity: io.map(x => x) = io", () => {
    fc.assert(
      fc.property(fc.anything(), (x) => {
        const io = IO(() => x);
        eqIO(
          io.map((y) => y),
          io
        );
      })
    );
  });

  // Functor: composition
  it("functor composition: io.map(f∘g) = io.map(g).map(f)", () => {
    fc.assert(
      fc.property(
        fc.anything(),
        fc.func(fc.anything()),
        fc.func(fc.anything()),
        (x, f, g) => {
          const io = IO(() => x);
          const left = io.map((z) => f(g(z)));
          const right = io.map(g).map(f);
          eqIO(left, right);
        }
      )
    );
  });

  // Monad: left identity
  it("monad left identity: IO.of(a).chain(f) = f(a)", () => {
    fc.assert(
      fc.property(fc.anything(), fc.func(fc.anything()), (a, fRaw) => {
        // lift f into IO-returning function
        const f = (x: any) => IO(() => fRaw(x));
        const left = IO.of(a).chain(f);
        const right = f(a);
        eqIO(left, right);
      })
    );
  });

  // Monad: right identity
  it("monad right identity: m.chain(IO.of) = m", () => {
    fc.assert(
      fc.property(fc.anything(), (a) => {
        const m = IO(() => a);
        const left = m.chain(IO.of);
        eqIO(left, m);
      })
    );
  });

  // Monad: associativity
  it("monad associativity: m.chain(f).chain(g) = m.chain(a => f(a).chain(g))", () => {
    fc.assert(
      fc.property(
        fc.anything(),
        fc.func(fc.anything()),
        fc.func(fc.anything()),
        (x, fRaw, gRaw) => {
          const f = (a: any) => IO(() => fRaw(a));
          const g = (a: any) => IO(() => gRaw(a));
          const m = IO(() => x);

          const left = m.chain(f).chain(g);
          const right = m.chain((a) => f(a).chain(g));

          eqIO(left, right);
        }
      )
    );
  });
});
