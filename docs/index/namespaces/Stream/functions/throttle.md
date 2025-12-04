[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / throttle

# Function: throttle()

> **throttle**\<`A`\>(`ms`): (`s`) => [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [src/adt/stream.ts:439](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L439)

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
