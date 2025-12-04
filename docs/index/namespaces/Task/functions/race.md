[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / race

# Function: race()

> **race**\<`E`, `A`\>(`tasks`): [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

Defined in: [src/adt/task.ts:322](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/task.ts#L322)

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
