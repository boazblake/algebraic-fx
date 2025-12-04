[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / sequence

# Function: sequence()

> **sequence**\<`E`, `A`\>(`readers`): [`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`[]\>

Defined in: [src/adt/reader.ts:130](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/reader.ts#L130)

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
