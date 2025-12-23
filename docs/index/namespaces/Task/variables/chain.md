[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / chain

# Variable: chain()

> `const` **chain**: \<`E`, `A`, `B`\>(`f`) => (`fa`) => [`Task`](../interfaces/Task.md)\<`E`, `B`\> = `TaskModule.chain`

Defined in: [adt/task.ts:178](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/task.ts#L178)

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => [`Task`](../interfaces/Task.md)\<`E`, `B`\>

## Returns

> (`fa`): [`Task`](../interfaces/Task.md)\<`E`, `B`\>

### Parameters

#### fa

[`Task`](../interfaces/Task.md)\<`E`, `A`\>

### Returns

[`Task`](../interfaces/Task.md)\<`E`, `B`\>
