[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / merge

# Function: merge()

> **merge**\<`A`\>(`s1`, `s2`): [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [src/adt/stream.ts:303](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/stream.ts#L303)

Merge two streams, interleaving events as they arrive.

## Type Parameters

### A

`A`

## Parameters

### s1

[`Stream`](../../../type-aliases/Stream.md)\<`A`\>

### s2

[`Stream`](../../../type-aliases/Stream.md)\<`A`\>

## Returns

[`Stream`](../../../type-aliases/Stream.md)\<`A`\>
