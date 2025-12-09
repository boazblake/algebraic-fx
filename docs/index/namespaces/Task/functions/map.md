[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / map

# Function: map()

> **map**\<`E`, `A`, `B`\>(`f`): (`t`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>

Defined in: [adt/task.ts:183](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L183)

Point-free map.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => `B`

## Returns

> (`t`): [`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>

### Parameters

#### t

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

### Returns

[`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>
