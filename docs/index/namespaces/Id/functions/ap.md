[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Id](../README.md) / ap

# Function: ap()

> **ap**\<`A`, `B`\>(`fb`): (`fa`) => [`Id`](../../../type-aliases/Id.md)\<`B`\>

Defined in: [src/adt/id.ts:59](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/id.ts#L59)

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
