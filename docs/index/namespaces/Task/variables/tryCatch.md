[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / tryCatch

# Variable: tryCatch()

> `const` **tryCatch**: \<`E`, `A`\>(`thunk`, `onError`) => [`Task`](../interfaces/Task.md)\<`E`, `A`\> = `TaskModule.tryCatch`

Defined in: [adt/task.ts:183](https://github.com/boazblake/algebraic-fx/blob/d0bbbb937347c32e45bf55a848f87f5b870532c7/src/adt/task.ts#L183)

## Type Parameters

### E

`E` = `unknown`

### A

`A` = `unknown`

## Parameters

### thunk

() => `A`

### onError

(`e`) => `E`

## Returns

[`Task`](../interfaces/Task.md)\<`E`, `A`\>
