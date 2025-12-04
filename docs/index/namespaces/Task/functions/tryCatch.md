[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / tryCatch

# Function: tryCatch()

> **tryCatch**\<`A`\>(`f`): [`Task`](../../../type-aliases/Task.md)\<`unknown`, `A`\>

Defined in: [src/adt/task.ts:156](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/task.ts#L156)

Wrap a Promise-returning function into a Task that catches errors.

## Type Parameters

### A

`A`

## Parameters

### f

() => `Promise`\<`A`\>

## Returns

[`Task`](../../../type-aliases/Task.md)\<`unknown`, `A`\>
