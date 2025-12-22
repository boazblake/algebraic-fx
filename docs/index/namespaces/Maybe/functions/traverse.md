[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Maybe](../README.md) / traverse

# Function: traverse()

> **traverse**\<`F`, `A`, `B`\>(`ofF`, `mapF`, `apF`, `f`): (`ma`) => `F`

Defined in: [adt/maybe.ts:104](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/adt/maybe.ts#L104)

## Type Parameters

### F

`F`

### A

`A`

### B

`B`

## Parameters

### ofF

\<`X`\>(`x`) => `F`

### mapF

\<`X`, `Y`\>(`f`) => (`fx`) => `F`

### apF

\<`X`, `Y`\>(`ff`) => (`fx`) => `F`

### f

(`a`) => `F`

## Returns

> (`ma`): `F`

### Parameters

#### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

### Returns

`F`
