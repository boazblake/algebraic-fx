[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / all

# Function: all()

> **all**\<`E`, `A`\>(`tasks`): [`Task`](../../../type-aliases/Task.md)\<`E`, `A`[]\>

Defined in: [src/adt/task.ts:305](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/task.ts#L305)

Run all Tasks in parallel.
Fails fast if any task fails.

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
