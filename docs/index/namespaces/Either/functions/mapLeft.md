[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / mapLeft

# Function: mapLeft()

> **mapLeft**\<`E`, `A`, `F`\>(`fa`, `f`): [`Either`](../type-aliases/Either.md)\<`F`, `A`\>

Defined in: [adt/either.ts:53](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/adt/either.ts#L53)

Map over the Left side.

## Type Parameters

### E

`E`

### A

`A`

### F

`F`

## Parameters

### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

### f

(`e`) => `F`

## Returns

[`Either`](../type-aliases/Either.md)\<`F`, `A`\>
