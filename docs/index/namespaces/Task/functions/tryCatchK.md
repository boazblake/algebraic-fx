[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / tryCatchK

# Function: tryCatchK()

> **tryCatchK**\<`E`, `A`\>(`f`, `onError`): [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

Defined in: [src/adt/task.ts:162](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/task.ts#L162)

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
