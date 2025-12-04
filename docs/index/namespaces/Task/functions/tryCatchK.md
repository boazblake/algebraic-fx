[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / tryCatchK

# Function: tryCatchK()

> **tryCatchK**\<`E`, `A`\>(`f`, `onError`): [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

Defined in: [src/adt/task.ts:162](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/task.ts#L162)

tryCatch with custom error mapping.

## Type Parameters

### E

`E`

### A

`A`

## Parameters

### f

() => `Promise`\<`A`\>

### onError

(`e`) => `E`

## Returns

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>
