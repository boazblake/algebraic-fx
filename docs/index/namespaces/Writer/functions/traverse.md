[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / traverse

# Function: traverse()

> **traverse**\<`W`, `A`, `B`\>(`f`, `combine`): (`arr`) => [`Writer`](../../../type-aliases/Writer.md)\<`W`, `B`[]\>

Defined in: [src/adt/writer.ts:124](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/writer.ts#L124)

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
