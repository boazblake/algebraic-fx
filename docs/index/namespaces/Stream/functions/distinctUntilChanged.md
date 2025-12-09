[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / distinctUntilChanged

# Function: distinctUntilChanged()

> **distinctUntilChanged**\<`A`\>(`equals?`): (`s`) => [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [adt/stream.ts:461](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L461)

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
