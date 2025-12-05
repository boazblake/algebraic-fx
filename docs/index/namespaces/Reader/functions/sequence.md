[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / sequence

# Function: sequence()

> **sequence**\<`E`, `A`\>(`readers`): [`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`[]\>

Defined in: [src/adt/reader.ts:130](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/reader.ts#L130)

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
