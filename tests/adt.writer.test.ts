import { describe, it, expect } from "vitest";
import {
  of,
  map,
  chain,
  ap,
  tell,
  listen,
  isWriter,
  WriterModule,
} from "../src/adt/writer.js";
import { fl } from "../src/adt/fl.js";
import { monoidArray, monoidString, monoidSum } from "../src/adt/monoid.js";

describe("Writer ADT", () => {
  it("constructs a Writer and runs it", () => {
    const M = monoidArray<string>();
    const w = of(M, 42, ["log"]);
    const [v, l] = w.run();
    expect(v).toBe(42);
    expect(l).toEqual(["log"]);
  });

  it("of uses empty log when not provided", () => {
    const M = monoidString;
    const w = of(M, "hello");
    const [v, l] = w.run();
    expect(v).toBe("hello");
    expect(l).toBe("");
  });

  it("map transforms the value and preserves the log", () => {
    const M = monoidArray<string>();
    const w = of(M, 2, ["a"]);
    const w2 = map(w, (n) => n + 1);
    const [v, l] = w2.run();
    expect(v).toBe(3);
    expect(l).toEqual(["a"]);
  });

  it("chain sequences computations and accumulates logs", () => {
    const M = monoidArray<string>();
    const W = WriterModule(M);

    const program = W.chain(of(M, 2, ["a"]), (n) => of(M, n + 1, ["b"]));

    const [v, l] = program.run();
    expect(v).toBe(3);
    expect(l).toEqual(["a", "b"]);
  });

  it("ap applies a function Writer to a value Writer and accumulates logs", () => {
    const M = monoidArray<string>();
    const wv = of(M, 5, ["v"]);
    const wf = of(M, (n: number) => n * 3, ["f"]);

    const w = ap(wf, wv);
    const [v, l] = w.run();

    expect(v).toBe(15);
    // matches current ap implementation order (function log then value log)
    expect(l).toEqual(["f", "v"]);
  });

  it("tell appends log", () => {
    const M = monoidArray<string>();
    const w = tell(M, ["x"]);
    const [v, l] = w.run();
    expect(v).toBeUndefined();
    expect(l).toEqual(["x"]);
  });

  it("listen produces [value, log] and keeps log", () => {
    const M = monoidArray<string>();
    const w = of(M, 1, ["a", "b"]);
    const wl = listen(w);
    const [v, l] = wl.run();
    expect(v).toEqual([1, ["a", "b"]]);
    expect(l).toEqual(["a", "b"]);
  });

  it("isWriter detects valid Writer structures", () => {
    const M = monoidSum;
    const w = of(M, 1, 0);
    expect(isWriter(w)).toBe(true);
    expect(isWriter({})).toBe(false);
    expect(isWriter(null)).toBe(false);
  });

  it("exposes Fantasy-Land methods on the value", () => {
    const M = monoidArray<string>();

    const w0 = of(M, 2, ["start"]);

    const r1 = (w0 as any)[fl.map]((n: number) => n + 1);
    const r2 = (r1 as any)[fl.chain]((n: number) => of(M, n * 2, ["chain"]));
    const r3 = (r2 as any)[fl.ap](of(M, (n: number) => n - 3, ["ap"]));

    const [v, l] = r3.run();

    expect(v).toBe((2 + 1) * 2 - 3);
    // matches current ap semantics (function writer log first)
    expect(l).toEqual(["ap", "start", "chain"]);
  });

  it("WriterModule exposes fp-ts style dictionary", () => {
    const M = monoidArray<string>();
    const W = WriterModule(M);

    const ofS = <A>(a: A, log?: string[]) => W.of(a, log ?? []);

    const program = W.chain(
      W.chain(ofS(2, ["a"]), (n) => ofS(n + 1, ["b"])),
      (n2) => ofS(n2 * 2 - 3, ["c"])
    );

    const [v, l] = program.run();

    expect(v).toBe((2 + 1) * 2 - 3);
    expect(l).toEqual(["a", "b", "c"]);
  });

  it("WriterModule exposes FL.of on module", () => {
    const M = monoidString;
    const W = WriterModule(M);

    const [v, l] = W.of(10).run(); // NOW run the returned Writer

    expect(v).toBe(10);
    expect(l).toBe("");
  });
});
