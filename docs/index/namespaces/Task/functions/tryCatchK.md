[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / tryCatchK

# Function: tryCatchK()

> **tryCatchK**\<`E`, `A`\>(`f`, `onError`): [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

Defined in: [src/adt/task.ts:162](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/task.ts#L162)

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
