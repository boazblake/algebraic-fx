[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / sequence

# Function: sequence()

> **sequence**\<`A`\>(`ios`): [`IO`](../../../type-aliases/IO.md)\<`A`[]\>

Defined in: [src/adt/io.ts:100](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/io.ts#L100)

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
