[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / chain

# Function: chain()

> **chain**\<`E`, `A`, `B`\>(`f`): (`t`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>

Defined in: [src/adt/task.ts:179](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/task.ts#L179)

Point-free chain.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>

## Returns

> (`t`): [`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>

### Parameters

#### t

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

### Returns

[`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>
