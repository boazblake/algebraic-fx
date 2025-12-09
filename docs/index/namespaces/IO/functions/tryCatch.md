[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / tryCatch

# Function: tryCatch()

> **tryCatch**\<`A`\>(`f`, `onError`): [`IO`](../../../type-aliases/IO.md)\<`A`\>

Defined in: [adt/io.ts:118](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/io.ts#L118)

Try-catch wrapper:
Safely execute a synchronous effect, mapping thrown errors.

## Type Parameters

### A

`A`

## Parameters

### f

() => `A`

Function that may throw

### onError

(`e`) => `A`

Recovery handler mapping unknown errors into A

## Returns

[`IO`](../../../type-aliases/IO.md)\<`A`\>
