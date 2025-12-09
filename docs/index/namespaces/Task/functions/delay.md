[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / delay

# Function: delay()

> **delay**(`ms`): \<`E`, `A`\>(`t`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

Defined in: [adt/task.ts:235](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L235)

Delay a Task's execution by N milliseconds (abort-aware).

## Parameters

### ms

`number`

## Returns

> \<`E`, `A`\>(`t`): [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

### Type Parameters

#### E

`E`

#### A

`A`

### Parameters

#### t

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

### Returns

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>
