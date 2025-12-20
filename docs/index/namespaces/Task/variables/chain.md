[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / chain

# Variable: chain()

> `const` **chain**: \<`E`, `A`, `B`\>(`f`) => (`fa`) => [`Task`](../interfaces/Task.md)\<`E`, `B`\> = `TaskModule.chain`

Defined in: [adt/task.ts:178](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/adt/task.ts#L178)

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
