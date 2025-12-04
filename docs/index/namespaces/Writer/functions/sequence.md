[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / sequence

# Function: sequence()

> **sequence**\<`W`, `A`\>(`writers`, `combine`): [`Writer`](../../../type-aliases/Writer.md)\<`W`, `A`[]\>

Defined in: [src/adt/writer.ts:106](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/writer.ts#L106)

Sequence an array of Writers, combining logs sequentially.

## Type Parameters

### W

`W`

### A

`A`

## Parameters

### writers

[`Writer`](../../../type-aliases/Writer.md)\<`W`, `A`\>[]

### combine

(`w1`, `w2`) => `W`

## Returns

[`Writer`](../../../type-aliases/Writer.md)\<`W`, `A`[]\>
