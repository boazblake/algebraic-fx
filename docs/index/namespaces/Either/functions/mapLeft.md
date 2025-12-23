[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / mapLeft

# Function: mapLeft()

> **mapLeft**\<`E`, `A`, `F`\>(`fa`, `f`): [`Either`](../type-aliases/Either.md)\<`F`, `A`\>

Defined in: [adt/either.ts:53](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/either.ts#L53)

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
