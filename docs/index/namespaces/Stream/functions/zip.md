[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / zip

# Function: zip()

> **zip**\<`A`, `B`\>(`sa`, `sb`): [`Stream`](../../../type-aliases/Stream.md)\<\[`A`, `B`\]\>

Defined in: [src/adt/stream.ts:379](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L379)

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
