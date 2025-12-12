[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / bimap

# Function: bimap()

> **bimap**\<`E`, `E2`, `A`, `B`\>(`onError`, `onSuccess`): (`t`) => [`Task`](../../../type-aliases/Task.md)\<`E2`, `B`\>

Defined in: [adt/task.ts:207](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/task.ts#L207)

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
