[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / traverse

# Function: traverse()

> **traverse**\<`W`, `A`, `B`\>(`f`, `combine`): (`arr`) => [`Writer`](../../../type-aliases/Writer.md)\<`W`, `B`[]\>

Defined in: [src/adt/writer.ts:124](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/writer.ts#L124)

Traverse an array and collect results.

## Type Parameters

### W

`W`

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => [`Writer`](../../../type-aliases/Writer.md)\<`W`, `B`\>

### combine

(`w1`, `w2`) => `W`

## Returns

> (`arr`): [`Writer`](../../../type-aliases/Writer.md)\<`W`, `B`[]\>

### Parameters

#### arr

`A`[]

### Returns

[`Writer`](../../../type-aliases/Writer.md)\<`W`, `B`[]\>
