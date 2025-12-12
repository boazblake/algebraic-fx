[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / ap

# Function: ap()

> **ap**\<`E`, `A`, `B`\>(`fb`): (`fa`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>

Defined in: [adt/task.ts:195](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/task.ts#L195)

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
