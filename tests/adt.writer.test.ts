import { describe, it, expect } from "vitest";
import WriterGeneric from "../src/adt/writer.js";

// local aliases for convenience
const empty: string[] = [];
const combine = (w1: string[], w2: string[]) => [...w1, ...w2];

const Writer = {
  of: <A>(a: A) => WriterGeneric.of<string[], A>(a, empty, combine),

  tell: (msg: string) => WriterGeneric.tell<string[]>([msg], empty, combine),

  listen: <A>(w: any) => WriterGeneric.listen<string[], A>(w),

  sequence: (arr: any[]) =>
    WriterGeneric.sequence<string[], any>(arr, empty, combine),
};

describe("Writer (generic W, specialized here to string[])", () => {
  it("records log and value", () => {
    const w = Writer.of(1);
    const [val, log] = w.run();

    expect(val).toBe(1);
    expect(log).toEqual([]); // empty string[] monoid
  });

  it("map keeps log", () => {
    const w = Writer.tell("a");
    const m = w.chain(() => Writer.of(2)).map((x) => x * 2);

    const [val, log] = m.run();

    expect(val).toBe(4);
    expect(log).toEqual(["a"]);
  });

  it("chain appends logs", () => {
    const combined = Writer.tell("a")
      .chain(() => Writer.tell("b"))
      .chain(() => Writer.of(3));

    const [val, log] = combined.run();

    expect(val).toBe(3);
    expect(log).toEqual(["a", "b"]);
  });

  it("tell + listen", () => {
    const w = Writer.tell("x").chain(() => Writer.listen(Writer.tell("y")));

    const [val, log] = w.run();

    // val = [undefined, ["y"]]
    expect(val[1]).toEqual(["y"]);

    // accumulated logs = ["x", "y"]
    expect(log).toEqual(["x", "y"]);
  });
});
