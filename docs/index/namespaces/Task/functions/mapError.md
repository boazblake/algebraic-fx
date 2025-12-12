[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / mapError

# Function: mapError()

> **mapError**\<`E`, `E2`\>(`f`): \<`A`\>(`t`) => [`Task`](../../../type-aliases/Task.md)\<`E2`, `A`\>

Defined in: [adt/task.ts:201](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/task.ts#L201)

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
