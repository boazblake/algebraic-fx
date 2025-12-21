[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / map

# Variable: map()

> `const` **map**: \<`E`, `A`, `B`\>(`f`) => (`fa`) => [`Task`](../interfaces/Task.md)\<`E`, `B`\> = `TaskModule.map`

Defined in: [adt/task.ts:177](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/adt/task.ts#L177)

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

> (`fa`): [`Task`](../interfaces/Task.md)\<`E`, `B`\>

### Parameters

#### fa

[`Task`](../interfaces/Task.md)\<`E`, `A`\>

### Returns

[`Task`](../interfaces/Task.md)\<`E`, `B`\>
