[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / fromPromise

# Variable: fromPromise()

> `const` **fromPromise**: \<`E`, `A`\>(`thunk`, `onError`) => [`Task`](../interfaces/Task.md)\<`E`, `A`\> = `TaskModule.fromPromise`

Defined in: [adt/task.ts:182](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/task.ts#L182)

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
