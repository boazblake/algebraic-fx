[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / ap

# Function: ap()

> **ap**\<`E`, `A`, `B`\>(`fb`): (`fa`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>

Defined in: [src/adt/task.ts:185](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/task.ts#L185)

Point-free ap.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### fb

[`Task`](../../../type-aliases/Task.md)\<`E`, (`a`) => `B`\>

## Returns

> (`fa`): [`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>

### Parameters

#### fa

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

### Returns

[`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>
