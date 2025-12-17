import { describe, it, expect } from "vitest";
import { Stream, createStream } from "@/adt/stream";

describe("Stream", () => {
  it("emit values and complete", () => {
    const src = Stream.new<number>();

    const received: number[] = [];

    src.subscribe((v) => received.push(v));

    // need the emitter from createStream
    const [, emit] = createStream<number>();
    // re-create: new() does NOT give emit
    // correct approach: use createStream directly
    const [stream, fire] = createStream<number>();

    const rec: number[] = [];
    stream.subscribe((v) => rec.push(v));

    fire(1);
    fire(2);
    fire(3);

    expect(rec).toEqual([1, 2, 3]);
  });

  it("filter operator", () => {
    const [src, emit] = createStream<number>();
    const values: number[] = [];

    src.filter((x) => x % 2 === 1).subscribe((x) => values.push(x));

    emit(1);
    emit(2);
    emit(3);
    emit(4);
    emit(5);

    expect(values).toEqual([1, 3, 5]);
  });

  it("scan accumulates state", () => {
    const [src, emit] = createStream<number>();
    const values: number[] = [];

    src.scan((acc, v) => acc + v, 0).subscribe((v) => values.push(v));

    emit(1); // acc=1
    emit(2); // acc=3
    emit(3); // acc=6

    expect(values).toEqual([0, 1, 3, 6]);
  });

  it("debounce delays and emits last value", async () => {
    const [src, emit] = createStream<number>();
    const debounced = Stream.debounce<number>(20)(src);

    const values: number[] = [];
    debounced.subscribe((v) => values.push(v));

    emit(1);
    emit(2);
    emit(3);

    await new Promise((r) => setTimeout(r, 30));

    expect(values).toEqual([3]);
  });
});
