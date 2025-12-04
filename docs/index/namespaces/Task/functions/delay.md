[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / delay

# Function: delay()

> **delay**(`ms`): \<`E`, `A`\>(`t`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

Defined in: [src/adt/task.ts:225](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/task.ts#L225)

Delay a Task’s execution by N milliseconds (abort-aware).

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
