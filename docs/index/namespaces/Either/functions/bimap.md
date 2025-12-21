[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / bimap

# Function: bimap()

> **bimap**\<`E`, `A`, `F`, `B`\>(`fa`, `f`, `g`): [`Either`](../type-aliases/Either.md)\<`F`, `B`\>

Defined in: [adt/either.ts:64](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/either.ts#L64)

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
