[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / fromAbortable

# Function: fromAbortable()

> **fromAbortable**\<`E`, `A`\>(`register`, `onError`): [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

Defined in: [adt/task.ts:150](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/task.ts#L150)

Wrap an abort-aware async registration function into a Task.

## Type Parameters

### E

`E`

### A

`A`

## Parameters

### register

(`signal`) => `Promise`\<`A`\>

Function that takes an AbortSignal and returns a Promise<A>

### onError

(`e`) => `E`

Map unknown errors into E

## Returns

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>
