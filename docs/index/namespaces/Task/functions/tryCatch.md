[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / tryCatch

# Function: tryCatch()

> **tryCatch**\<`A`\>(`f`): [`Task`](../../../type-aliases/Task.md)\<`unknown`, `A`\>

Defined in: [src/adt/task.ts:156](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/task.ts#L156)

Wrap a Promise-returning function into a Task that catches errors.

## Type Parameters

### A

`A`

## Parameters

### f

() => `Promise`\<`A`\>

## Returns

[`Task`](../../../type-aliases/Task.md)\<`unknown`, `A`\>
