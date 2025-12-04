[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / timeout

# Function: timeout()

> **timeout**\<`E`\>(`ms`, `onTimeout`): \<`A`\>(`t`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

Defined in: [src/adt/task.ts:254](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/task.ts#L254)

Timeout a Task after N ms, returning a Left(onTimeout).

## Type Parameters

### E

`E`

## Parameters

### ms

`number`

### onTimeout

`E`

## Returns

> \<`A`\>(`t`): [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

### Type Parameters

#### A

`A`

### Parameters

#### t

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

### Returns

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>
