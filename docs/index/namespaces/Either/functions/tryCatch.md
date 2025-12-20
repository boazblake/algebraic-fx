[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / tryCatch

# Function: tryCatch()

> **tryCatch**\<`E`, `A`\>(`thunk`, `onThrow`): [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

Defined in: [adt/either.ts:147](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/adt/either.ts#L147)

Effectful construction with error capture.

## Type Parameters

### E

`E`

### A

`A`

## Parameters

### thunk

() => `A`

### onThrow

(`u`) => `E`

## Returns

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>
