[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / tryCatch

# Function: tryCatch()

> **tryCatch**\<`A`\>(`f`): [`Task`](../../../type-aliases/Task.md)\<`unknown`, `A`\>

Defined in: [src/adt/task.ts:156](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/task.ts#L156)

Wrap a Promise-returning function into a Task that catches errors.

## Type Parameters

### A

`A`

## Parameters

### f

() => `Promise`\<`A`\>

## Returns

[`Task`](../../../type-aliases/Task.md)\<`unknown`, `A`\>
