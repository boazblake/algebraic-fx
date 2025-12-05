[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / mapError

# Function: mapError()

> **mapError**\<`E`, `E2`\>(`f`): \<`A`\>(`t`) => [`Task`](../../../type-aliases/Task.md)\<`E2`, `A`\>

Defined in: [src/adt/task.ts:191](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/task.ts#L191)

Point-free mapError.

## Type Parameters

### E

`E`

### E2

`E2`

## Parameters

### f

(`e`) => `E2`

## Returns

> \<`A`\>(`t`): [`Task`](../../../type-aliases/Task.md)\<`E2`, `A`\>

### Type Parameters

#### A

`A`

### Parameters

#### t

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

### Returns

[`Task`](../../../type-aliases/Task.md)\<`E2`, `A`\>
