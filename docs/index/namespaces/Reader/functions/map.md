[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / map

# Function: map()

> **map**\<`A`, `B`\>(`f`): \<`R`\>(`fa`) => [`Reader`](../interfaces/Reader.md)\<`R`, `B`\>

Defined in: [adt/reader.ts:116](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/adt/reader.ts#L116)

## Type Parameters

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => `B`

## Returns

> \<`R`\>(`fa`): [`Reader`](../interfaces/Reader.md)\<`R`, `B`\>

### Type Parameters

#### R

`R`

### Parameters

#### fa

[`Reader`](../interfaces/Reader.md)\<`R`, `A`\>

### Returns

[`Reader`](../interfaces/Reader.md)\<`R`, `B`\>
