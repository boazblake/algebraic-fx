[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / tryCatch

# Function: tryCatch()

> **tryCatch**\<`A`\>(`f`, `onError`): [`IO`](../../../type-aliases/IO.md)\<`A`\>

Defined in: [src/adt/io.ts:118](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/io.ts#L118)

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
