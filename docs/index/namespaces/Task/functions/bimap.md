[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / bimap

# Function: bimap()

> **bimap**\<`E`, `E2`, `A`, `B`\>(`onError`, `onSuccess`): (`t`) => [`Task`](../../../type-aliases/Task.md)\<`E2`, `B`\>

Defined in: [src/adt/task.ts:197](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/task.ts#L197)

Point-free bimap.

## Type Parameters

### E

`E`

### E2

`E2`

### A

`A`

### B

`B`

## Parameters

### onError

(`e`) => `E2`

### onSuccess

(`a`) => `B`

## Returns

> (`t`): [`Task`](../../../type-aliases/Task.md)\<`E2`, `B`\>

### Parameters

#### t

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

### Returns

[`Task`](../../../type-aliases/Task.md)\<`E2`, `B`\>
