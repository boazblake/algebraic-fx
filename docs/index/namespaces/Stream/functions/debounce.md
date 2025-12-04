[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / debounce

# Function: debounce()

> **debounce**\<`A`\>(`ms`): (`s`) => [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [src/adt/stream.ts:417](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/stream.ts#L417)

Debounce a stream: wait `ms` milliseconds after each event before emitting.

## Type Parameters

### A

`A`

## Parameters

### ms

`number`

## Returns

> (`s`): [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

### Parameters

#### s

[`Stream`](../../../type-aliases/Stream.md)\<`A`\>

### Returns

[`Stream`](../../../type-aliases/Stream.md)\<`A`\>
