[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / chain

# Function: chain()

> **chain**\<`W`, `A`, `B`\>(`wa`, `f`): [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

Defined in: [adt/writer.ts:68](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/adt/writer.ts#L68)

chain: sequence computations and combine logs via the monoid.

## Type Parameters

### W

`W`

### A

`A`

### B

`B`

## Parameters

### wa

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

### f

(`a`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

## Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>
