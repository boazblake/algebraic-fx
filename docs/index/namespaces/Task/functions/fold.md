[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / fold

# Function: fold()

> **fold**\<`E`, `A`, `B`\>(`onError`, `onSuccess`): (`t`) => `Promise`\<`B`\>

Defined in: [adt/task.ts:205](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/task.ts#L205)

Consume a Task by converting its Either result into the final pure value.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### onError

(`e`) => `B`

### onSuccess

(`a`) => `B`

## Returns

> (`t`): `Promise`\<`B`\>

### Parameters

#### t

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

### Returns

`Promise`\<`B`\>
