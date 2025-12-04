[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / merge

# Function: merge()

> **merge**\<`A`\>(`s1`, `s2`): [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [src/adt/stream.ts:303](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L303)

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
