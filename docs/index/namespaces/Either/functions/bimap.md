[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / bimap

# Function: bimap()

> **bimap**\<`E`, `A`, `F`, `B`\>(`fa`, `f`, `g`): [`Either`](../type-aliases/Either.md)\<`F`, `B`\>

Defined in: [adt/either.ts:64](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/adt/either.ts#L64)

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
