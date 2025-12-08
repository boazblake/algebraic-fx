[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / tryCatchK

# Function: tryCatchK()

> **tryCatchK**\<`E`, `A`\>(`f`, `onError`): [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

Defined in: [adt/task.ts:162](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/task.ts#L162)

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
