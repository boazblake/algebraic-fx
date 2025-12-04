[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / distinctUntilChanged

# Function: distinctUntilChanged()

> **distinctUntilChanged**\<`A`\>(`equals?`): (`s`) => [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [src/adt/stream.ts:462](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L462)

Emit only when the value differs from the previous emission.

## Type Parameters

### A

`A`

## Parameters

### equals?

(`a`, `b`) => `boolean`

Optional custom equality check

## Returns

> (`s`): [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

### Parameters

#### s

[`Stream`](../../../type-aliases/Stream.md)\<`A`\>

### Returns

[`Stream`](../../../type-aliases/Stream.md)\<`A`\>
