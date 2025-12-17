// tests/adt.writer-task.test.ts
import { describe, it, expect } from "vitest";
import {
  of,
  map,
  chain,
  ap,
  tell,
  liftTask,
  makeWriterTask,
  isWriterTask,
  WriterTaskModule,
  type WriterTask,
} from "../src/adt/writer-task";
import { TaskModule } from "../src/adt/task";
import { monoidArray } from "../src/adt/monoid";

describe("WriterTask ADT", () => {
  it("of uses empty log when not provided", async () => {
    const M = monoidArray<string>();
    const wt = of<string[], never, number>(M, 42);

    const result: any = await wt.runTask.run();
    expect(result._tag).toBe("Right");
    expect(result.right).toEqual([42, []]);
  });

  it("of uses provided initial log when given", async () => {
    const M = monoidArray<string>();
    const wt = of<string[], never, number>(M, 42, ["init"]);

    const result: any = await wt.runTask.run();
    expect(result._tag).toBe("Right");
    expect(result.right).toEqual([42, ["init"]]);
  });

  it("map transforms the value and preserves the log", async () => {
    const M = monoidArray<string>();
    const wt0 = of<string[], never, number>(M, 2, ["a"]);
    const wt1 = map<string[], never, number, number>(wt0, (n) => n + 1);

    const result: any = await wt1.runTask.run();
    expect(result._tag).toBe("Right");
    expect(result.right).toEqual([3, ["a"]]);
  });

  it("chain sequences computations and accumulates logs", async () => {
    const M = monoidArray<string>();

    const wt0 = of<string[], never, number>(M, 2, ["a"]);
    const wt1 = chain<string[], never, number, number>(wt0, (n) =>
      of<string[], never, number>(M, n + 1, ["b"])
    );

    const result: any = await wt1.runTask.run();
    expect(result._tag).toBe("Right");
    expect(result.right).toEqual([3, ["a", "b"]]);
  });

  it("ap applies a function WriterTask to a value WriterTask and accumulates logs", async () => {
    const M = monoidArray<string>();

    const wv = of<string[], never, number>(M, 5, ["v"]);
    const wf = of<string[], never, (n: number) => number>(M, (n) => n * 3, [
      "f",
    ]);

    const wt = ap<string[], never, number, number>(wf, wv);
    const result: any = await wt.runTask.run();

    expect(result._tag).toBe("Right");
    expect(result.right).toEqual([15, ["f", "v"]]);
  });

  it("tell appends log with void value", async () => {
    const M = monoidArray<string>();

    const wt = tell<string[], never>(M, ["x"]);
    const result: any = await wt.runTask.run();

    expect(result._tag).toBe("Right");
    expect(result.right).toEqual([undefined, ["x"]]);
  });

  it("liftTask lifts a Task into WriterTask with empty log", async () => {
    const M = monoidArray<string>();
    const t = TaskModule.of<never, number>(10);

    const wt = liftTask<string[], never, number>(M, t);
    const result: any = await wt.runTask.run();

    expect(result._tag).toBe("Right");
    expect(result.right).toEqual([10, []]);
  });

  it("isWriterTask detects valid WriterTask structures", () => {
    const M = monoidArray<string>();
    const wt: WriterTask<string[], never, number> = makeWriterTask(
      TaskModule.of<never, [number, string[]]>([1, ["a"]]),
      M
    );

    expect(isWriterTask(wt)).toBe(true);
    expect(isWriterTask({})).toBe(false);
    expect(isWriterTask(null)).toBe(false);
  });

  it("WriterTaskModule exposes fp-ts style dictionary", async () => {
    const M = monoidArray<string>();
    const W = WriterTaskModule(M);

    const ofS = <A>(a: A, log?: string[]) => W.of<never, A>(a, log ?? []);

    const program = W.chain(
      W.chain(ofS(2, ["a"]), (n) => ofS(n + 1, ["b"])),
      (n2) => ofS(n2 * 2 - 3, ["c"])
    );

    const result: any = await program.runTask.run();
    expect(result._tag).toBe("Right");
    expect(result.right).toEqual([(2 + 1) * 2 - 3, ["a", "b", "c"]]);
  });
});
