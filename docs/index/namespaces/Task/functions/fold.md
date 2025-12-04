[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / fold

# Function: fold()

> **fold**\<`E`, `A`, `B`\>(`onError`, `onSuccess`): (`t`) => `Promise`\<`B`\>

Defined in: [src/adt/task.ts:205](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/task.ts#L205)

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
