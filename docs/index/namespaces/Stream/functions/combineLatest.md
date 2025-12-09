[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / combineLatest

# Function: combineLatest()

> **combineLatest**\<`A`, `B`\>(`sa`, `sb`): [`Stream`](../../../type-aliases/Stream.md)\<\[`A`, `B`\]\>

Defined in: [adt/stream.ts:337](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L337)

Combine latest values from two streams.
Emits whenever either stream updates, but only after both have emitted at least once.

## Type Parameters

### A

`A`

### B

`B`

## Parameters

### sa

[`Stream`](../../../type-aliases/Stream.md)\<`A`\>

### sb

[`Stream`](../../../type-aliases/Stream.md)\<`B`\>

## Returns

[`Stream`](../../../type-aliases/Stream.md)\<\[`A`, `B`\]\>
