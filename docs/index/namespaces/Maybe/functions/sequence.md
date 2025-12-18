[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Maybe](../README.md) / sequence

# Function: sequence()

> **sequence**\<`F`, `A`\>(`ofF`, `mapF`, `apF`): (`mma`) => `F`

Defined in: [adt/maybe.ts:116](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/maybe.ts#L116)

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
