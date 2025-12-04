[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / sequence

# Function: sequence()

> **sequence**\<`W`, `A`\>(`writers`, `combine`): [`Writer`](../../../type-aliases/Writer.md)\<`W`, `A`[]\>

Defined in: [src/adt/writer.ts:106](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/writer.ts#L106)

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
