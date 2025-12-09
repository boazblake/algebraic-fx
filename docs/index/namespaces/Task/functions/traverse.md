[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / traverse

# Function: traverse()

> **traverse**\<`E`, `A`, `B`\>(`f`): (`arr`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `B`[]\>

Defined in: [adt/task.ts:315](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L315)

Traverse an array by mapping each element to a Task and sequencing.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>

## Returns

> (`arr`): [`Task`](../../../type-aliases/Task.md)\<`E`, `B`[]\>

### Parameters

#### arr

`A`[]

### Returns

[`Task`](../../../type-aliases/Task.md)\<`E`, `B`[]\>
