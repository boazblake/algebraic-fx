[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / timeout

# Function: timeout()

> **timeout**\<`E`\>(`ms`, `onTimeout`): \<`A`\>(`t`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

Defined in: [src/adt/task.ts:254](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/task.ts#L254)

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
