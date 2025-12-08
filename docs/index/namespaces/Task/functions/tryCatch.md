[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / tryCatch

# Function: tryCatch()

> **tryCatch**\<`A`\>(`f`): [`Task`](../../../type-aliases/Task.md)\<`unknown`, `A`\>

Defined in: [adt/task.ts:156](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/task.ts#L156)

Wrap a Promise-returning function into a Task that catches errors.

## Type Parameters

### A

`A`

## Parameters

### f

() => `Promise`\<`A`\>

## Returns

[`Task`](../../../type-aliases/Task.md)\<`unknown`, `A`\>
