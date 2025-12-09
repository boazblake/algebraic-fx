[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / throttle

# Function: throttle()

> **throttle**\<`A`\>(`ms`): (`s`) => [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [adt/stream.ts:438](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L438)

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
