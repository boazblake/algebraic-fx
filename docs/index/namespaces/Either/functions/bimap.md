[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / bimap

# Function: bimap()

> **bimap**\<`E`, `A`, `F`, `B`\>(`fa`, `f`, `g`): [`Either`](../type-aliases/Either.md)\<`F`, `B`\>

Defined in: [adt/either.ts:64](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/either.ts#L64)

Bimap over both sides.

## Type Parameters

### E

`E`

### A

`A`

### F

`F`

### B

`B`

## Parameters

### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

### f

(`e`) => `F`

### g

(`a`) => `B`

## Returns

[`Either`](../type-aliases/Either.md)\<`F`, `B`\>
