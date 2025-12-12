[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / sequence

# Function: sequence()

> **sequence**\<`E`, `A`\>(`readers`): [`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`[]\>

Defined in: [adt/reader.ts:144](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/reader.ts#L144)

## Type Parameters

### E

`E`

### A

`A`

## Parameters

### readers

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`\>[]

## Returns

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`[]\>

A Reader that returns an array of results.
