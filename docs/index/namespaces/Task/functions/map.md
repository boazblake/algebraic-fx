[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / map

# Function: map()

> **map**\<`E`, `A`, `B`\>(`f`): (`t`) => [`Task`](../../../type-aliases/Task.md)\<`E`, `B`\>

Defined in: [src/adt/task.ts:173](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/task.ts#L173)

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
