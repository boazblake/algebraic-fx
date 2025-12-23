[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / fromPromise

# Variable: fromPromise()

> `const` **fromPromise**: \<`E`, `A`\>(`thunk`, `onError`) => [`Task`](../interfaces/Task.md)\<`E`, `A`\> = `TaskModule.fromPromise`

Defined in: [adt/task.ts:182](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/task.ts#L182)

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
