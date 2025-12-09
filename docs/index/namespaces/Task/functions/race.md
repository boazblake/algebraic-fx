[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / race

# Function: race()

> **race**\<`E`, `A`\>(`tasks`): [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

Defined in: [adt/task.ts:345](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L345)

Race multiple Tasks, resolving with the first to finish.

## Type Parameters

### E

`E`

### A

`A`

## Parameters

### tasks

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>[]

## Returns

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>
