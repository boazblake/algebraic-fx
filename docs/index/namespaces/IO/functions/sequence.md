[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / sequence

# Function: sequence()

> **sequence**\<`A`\>(`ios`): [`IO`](../../../type-aliases/IO.md)\<`A`[]\>

Defined in: [src/adt/io.ts:100](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/io.ts#L100)

Sequence an array of IO computations into a single IO that,
when run, returns an array of all results.

## Type Parameters

### A

`A`

## Parameters

### ios

[`IO`](../../../type-aliases/IO.md)\<`A`\>[]

## Returns

[`IO`](../../../type-aliases/IO.md)\<`A`[]\>
