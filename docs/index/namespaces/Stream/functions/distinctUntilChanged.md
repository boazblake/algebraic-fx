[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / distinctUntilChanged

# Function: distinctUntilChanged()

> **distinctUntilChanged**\<`A`\>(`equals?`): (`s`) => [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [src/adt/stream.ts:462](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/stream.ts#L462)

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
