[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / map

# Function: map()

> **map**\<`W`, `A`, `B`\>(`wa`, `f`): [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

Defined in: [adt/writer.ts:55](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/writer.ts#L55)

map: transform the value, keep the same log.

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

(`a`) => `B`

## Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>
