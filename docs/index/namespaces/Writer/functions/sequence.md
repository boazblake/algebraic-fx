[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / sequence

# Function: sequence()

> **sequence**\<`W`, `A`\>(`writers`, `combine`): [`Writer`](../../../type-aliases/Writer.md)\<`W`, `A`[]\>

Defined in: [src/adt/writer.ts:106](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/writer.ts#L106)

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
