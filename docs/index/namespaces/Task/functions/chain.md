[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / chain

# Function: chain()

> **chain**\<`E`, `A`, `B`\>(`f`): (`t`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>

Defined in: [src/adt/task.ts:179](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/task.ts#L179)

Point-free chain.

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

> (`t`): [`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>

### Parameters

#### t

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

### Returns

[`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>
