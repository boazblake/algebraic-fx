[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / zip

# Function: zip()

> **zip**\<`A`, `B`\>(`sa`, `sb`): [`Stream`](../../../type-aliases/Stream.md)\<\[`A`, `B`\]\>

Defined in: [src/adt/stream.ts:379](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/stream.ts#L379)

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
