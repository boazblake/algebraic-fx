[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / zip

# Function: zip()

> **zip**\<`A`, `B`\>(`sa`, `sb`): [`Stream`](../../../type-aliases/Stream.md)\<\[`A`, `B`\]\>

Defined in: [adt/stream.ts:378](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/stream.ts#L378)

Zip two streams pairwise.
Emits only when both queues have available events.

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
