[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / map

# Function: map()

> **map**\<`A`, `B`\>(`f`): \<`R`\>(`fa`) => [`Reader`](../interfaces/Reader.md)\<`R`, `B`\>

Defined in: [adt/reader.ts:116](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/adt/reader.ts#L116)

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
