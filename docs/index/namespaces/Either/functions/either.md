[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / either

# Function: either()

> **either**\<`E`, `A`, `B`\>(`onLeft`, `onRight`): (`fa`) => `B`

Defined in: [adt/either.ts:116](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/either.ts#L116)

Same as match but flipped argument order, aligns with maybe().

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### onLeft

(`e`) => `B`

### onRight

(`a`) => `B`

## Returns

> (`fa`): `B`

### Parameters

#### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

### Returns

`B`
