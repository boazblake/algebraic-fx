[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / tryCatch

# Function: tryCatch()

> **tryCatch**\<`E`, `A`\>(`thunk`, `onThrow`): [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

Defined in: [adt/either.ts:147](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/either.ts#L147)

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
