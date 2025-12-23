[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / either

# Function: either()

> **either**\<`E`, `A`, `B`\>(`onLeft`, `onRight`): (`fa`) => `B`

Defined in: [adt/either.ts:116](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/either.ts#L116)

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
