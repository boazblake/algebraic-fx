[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / throttle

# Function: throttle()

> **throttle**\<`A`\>(`ms`): (`s`) => [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [src/adt/stream.ts:439](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/stream.ts#L439)

Throttle a stream: emit at most one event every `ms` milliseconds.

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
