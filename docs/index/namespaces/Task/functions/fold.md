[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / fold

# Function: fold()

> **fold**\<`E`, `A`, `B`\>(`onError`, `onSuccess`): (`t`) => `Promise`\<`B`\>

Defined in: [adt/task.ts:215](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/task.ts#L215)

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
