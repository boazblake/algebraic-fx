[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / sequence

# Function: sequence()

> **sequence**\<`A`\>(`ios`): [`IO`](../../../type-aliases/IO.md)\<`A`[]\>

Defined in: [adt/io.ts:100](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/io.ts#L100)

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
