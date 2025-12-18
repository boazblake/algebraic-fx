[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / bimap

# Function: bimap()

> **bimap**\<`E`, `A`, `F`, `B`\>(`fa`, `f`, `g`): [`Either`](../type-aliases/Either.md)\<`F`, `B`\>

Defined in: [adt/either.ts:64](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/either.ts#L64)

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
