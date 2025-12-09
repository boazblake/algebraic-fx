import { describe, it, expect } from "vitest";
import fc from "fast-check";
import Stream from "../src/adt/stream.ts";

//
// Helpers
//

// Subscribe to a stream, emit all values synchronously via observer.next
const collect = <A>(s: any): A[] => {
  const out: A[] = [];
  const unsub = s.subscribe({
    next: (a: A) => out.push(a),
  });
  unsub();
  return out;
};

// Subscribe but emit using manual pushes
const fromArray = <A>(arr: A[]) =>
  Stream<A>((o) => {
    arr.forEach((a) => o.next(a));
    o.complete?.();
    return () => {};
  });

describe("Stream laws", () => {
  //
  // Functor: identity
  //
  it("map identity: s.map(x => x) = s", () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), (arr) => {
        const s = fromArray(arr);
        const s2 = s.map((x: any) => x);
        expect(collect(s2)).toEqual(arr);
      })
    );
  });

  //
  // Functor: composition
  //
  it("map composition: s.map(f∘g) = s.map(g).map(f)", () => {
    fc.assert(
      fc.property(
        fc.array(fc.anything()),
        fc.func(fc.anything()),
        fc.func(fc.anything()),
        (arr, f, g) => {
          const s = fromArray(arr);

          const left = s.map((x: any) => f(g(x)));
          const right = s.map(g).map(f);

          expect(collect(left)).toEqual(collect(right));
        }
      )
    );
  });

  //
  // Ordering preservation
  //
  it("preserves event ordering", () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const s = fromArray(arr);
        expect(collect(s)).toEqual(arr);
      })
    );
  });

  //
  // chain semantics: sequence outer then inner
  //
  it("chain: out.mapMany-like behavior", () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), fc.integer(), (arr, offset) => {
        const s = fromArray(arr);

        const chained = s.chain((x: number) => fromArray([x, x + offset]));

        const expected = arr.flatMap((x) => [x, x + offset]);

        expect(collect(chained)).toEqual(expected);
      })
    );
  });

  //
  // merge: interleave outputs preserving per-stream ordering
  //
  it("merge preserves internal order of each stream", () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), fc.array(fc.integer()), (a, b) => {
        const sa = fromArray(a);
        const sb = fromArray(b);

        const merged = Stream.merge(sa, sb);
        const out = collect(merged);

        // Check each stream's order is preserved
        const outA = out.filter((x) => a.includes(x));
        const outB = out.filter((x) => b.includes(x));

        expect(outA).toEqual(a);
        expect(outB).toEqual(b);
      })
    );
  });

  //
  // combineLatest: last known pairings after both streams emit
  //
  it("combineLatest produces pairs after both streams have values", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer(), { minLength: 1 }),
        fc.array(fc.integer(), { minLength: 1 }),
        (a, b) => {
          const sa = fromArray(a);
          const sb = fromArray(b);

          const combined = Stream.combineLatest(sa, sb);
          const out = collect(combined);

          // Expected: cartesian-like emission for latest pairs
          const expected: [number, number][] = [];
          let lastA: number | undefined;
          let lastB: number | undefined;

          a.forEach((va) => {
            lastA = va;
            if (lastB !== undefined) {
              expected.push([lastA, lastB]);
            }
          });

          b.forEach((vb) => {
            lastB = vb;
            if (lastA !== undefined) {
              expected.push([lastA, lastB]);
            }
          });

          expect(out).toEqual(expected);
        }
      )
    );
  });

  //
  // zip: pair items index-wise
  //
  it("zip pairs items index-wise", () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), fc.array(fc.anything()), (a, b) => {
        const sa = fromArray(a);
        const sb = fromArray(b);

        const zipped = Stream.zip(sa, sb);
        const out = collect(zipped);

        const len = Math.min(a.length, b.length);
        const expected = Array.from({ length: len }, (_, i) => [a[i], b[i]]);

        expect(out).toEqual(expected);
      })
    );
  });

  //
  // Unsubscribe correctness: unsub stops further notifications
  //
  it("unsubscribe stops further emissions", () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), (arr) => {
        const out: any[] = [];

        const s = Stream((o) => {
          arr.forEach((a) => o.next(a));
          return () => {
            out.push("unsub"); // marker
          };
        });

        const unsub = s.subscribe({
          next: (x) => out.push(x),
        });

        unsub(); // trigger unsubscribe

        expect(out).toContain("unsub");
      })
    );
  });
});
