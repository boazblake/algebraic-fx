[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / tryCatchK

# Function: tryCatchK()

> **tryCatchK**\<`E`, `A`\>(`f`, `onError`): [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

Defined in: [adt/task.ts:172](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/task.ts#L172)

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
