// tests/adt.stream.laws.test.ts
import { describe, it } from "vitest";
import fc from "fast-check";
import { Stream } from "@/adt/stream";

const collect = <A>(s: Stream<A>): A[] => {
  const out: A[] = [];
  s.subscribe((v) => out.push(v));
  return out;
};

describe("Stream - Functor laws (finite streams)", () => {
  it("identity", () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const s = Stream.fromArray(arr);

        const left = collect(s.map((x) => x));
        const right = collect(s);

        return JSON.stringify(left) === JSON.stringify(right);
      })
    );
  });

  it("composition", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.func(fc.integer()),
        fc.func(fc.integer()),
        (arr, f, g) => {
          const s = Stream.fromArray(arr);

          const left = collect(s.map(f).map(g));
          const right = collect(s.map((x) => g(f(x))));

          return JSON.stringify(left) === JSON.stringify(right);
        }
      )
    );
  });
});
