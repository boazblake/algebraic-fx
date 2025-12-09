[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / sequence

# Function: sequence()

> **sequence**\<`E`, `A`\>(`tasks`): [`Task`](../../../type-aliases/Task.md)\<`E`, `A`[]\>

Defined in: [adt/task.ts:297](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L297)

Execute Tasks sequentially, short-circuiting on Failure.

## Type Parameters

### E

`E`

### A

`A`

## Parameters

### tasks

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>[]

## Returns

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`[]\>
