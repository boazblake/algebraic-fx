[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / timeout

# Function: timeout()

> **timeout**\<`E`\>(`ms`, `onTimeout`): \<`A`\>(`t`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

Defined in: [adt/task.ts:269](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L269)

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
