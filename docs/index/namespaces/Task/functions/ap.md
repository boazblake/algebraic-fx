[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / ap

# Function: ap()

> **ap**\<`E`, `A`, `B`\>(`fb`): (`fa`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>

Defined in: [src/adt/task.ts:185](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/task.ts#L185)

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
