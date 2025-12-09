[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / sequence

# Function: sequence()

> **sequence**\<`E`, `A`\>(`readers`): [`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`[]\>

Defined in: [adt/reader.ts:144](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/reader.ts#L144)

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
