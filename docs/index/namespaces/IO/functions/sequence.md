[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / sequence

# Function: sequence()

> **sequence**\<`A`\>(`ios`): [`IO`](../../../type-aliases/IO.md)\<`A`[]\>

Defined in: [src/adt/io.ts:100](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/io.ts#L100)

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
