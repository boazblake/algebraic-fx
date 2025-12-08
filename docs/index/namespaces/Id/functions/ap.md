[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Id](../README.md) / ap

# Function: ap()

> **ap**\<`A`, `B`\>(`fb`): (`fa`) => [`Id`](../../../type-aliases/Id.md)\<`B`\>

Defined in: [adt/id.ts:59](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/id.ts#L59)

Point-free applicative apply.

## Type Parameters

### A

`A`

### B

`B`

## Parameters

### fb

[`Id`](../../../type-aliases/Id.md)\<(`a`) => `B`\>

## Returns

> (`fa`): [`Id`](../../../type-aliases/Id.md)\<`B`\>

### Parameters

#### fa

[`Id`](../../../type-aliases/Id.md)\<`A`\>

### Returns

[`Id`](../../../type-aliases/Id.md)\<`B`\>
