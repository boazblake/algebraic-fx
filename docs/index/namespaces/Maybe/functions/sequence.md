[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Maybe](../README.md) / sequence

# Function: sequence()

> **sequence**\<`F`, `A`\>(`ofF`, `mapF`, `apF`): (`mma`) => `F`

Defined in: [adt/maybe.ts:116](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/adt/maybe.ts#L116)

## Type Parameters

### F

`F`

### A

`A`

## Parameters

### ofF

\<`X`\>(`x`) => `F`

### mapF

\<`X`, `Y`\>(`f`) => (`fx`) => `F`

### apF

\<`X`, `Y`\>(`ff`) => (`fx`) => `F`

## Returns

> (`mma`): `F`

### Parameters

#### mma

[`Maybe`](../type-aliases/Maybe.md)\<`F`\>

### Returns

`F`
