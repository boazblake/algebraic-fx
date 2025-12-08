[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / traverse

# Function: traverse()

> **traverse**\<`W`, `A`, `B`\>(`f`, `combine`): (`arr`) => [`Writer`](../../../type-aliases/Writer.md)\<`W`, `B`[]\>

Defined in: [adt/writer.ts:123](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/writer.ts#L123)

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
