[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / sequence

# Function: sequence()

> **sequence**\<`W`, `A`\>(`writers`, `combine`): [`Writer`](../../../type-aliases/Writer.md)\<`W`, `A`[]\>

Defined in: [adt/writer.ts:105](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/writer.ts#L105)

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
