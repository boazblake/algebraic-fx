[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / fromPromise

# Variable: fromPromise()

> `const` **fromPromise**: \<`E`, `A`\>(`thunk`, `onError`) => [`Task`](../interfaces/Task.md)\<`E`, `A`\> = `TaskModule.fromPromise`

Defined in: [adt/task.ts:182](https://github.com/boazblake/algebraic-fx/blob/d0bbbb937347c32e45bf55a848f87f5b870532c7/src/adt/task.ts#L182)

## Type Parameters

### E

`E` = `unknown`

### A

`A` = `unknown`

## Parameters

### thunk

() => `Promise`\<`A`\>

### onError

(`e`) => `E`

## Returns

[`Task`](../interfaces/Task.md)\<`E`, `A`\>
