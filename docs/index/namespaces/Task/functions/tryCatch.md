[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / tryCatch

# Function: tryCatch()

> **tryCatch**\<`A`\>(`f`): [`Task`](../../../type-aliases/Task.md)\<`unknown`, `A`\>

Defined in: [adt/task.ts:166](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L166)

Wrap a Promise-returning function into a Task that catches errors.

## Type Parameters

### A

`A`

## Parameters

### f

() => `Promise`\<`A`\>

## Returns

[`Task`](../../../type-aliases/Task.md)\<`unknown`, `A`\>
