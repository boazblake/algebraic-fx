[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / traverse

# Function: traverse()

> **traverse**\<`E`, `A`, `B`\>(`f`): (`arr`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `B`[]\>

Defined in: [src/adt/task.ts:296](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/task.ts#L296)

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
