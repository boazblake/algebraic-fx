[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Id](../README.md) / chain

# Function: chain()

> **chain**\<`A`, `B`\>(`f`): (`id`) => [`Id`](../../../type-aliases/Id.md)\<`B`\>

Defined in: [src/adt/id.ts:75](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/id.ts#L75)

Point-free monadic chain.

## Type Parameters

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => [`Id`](../../../type-aliases/Id.md)\<`B`\>

## Returns

> (`id`): [`Id`](../../../type-aliases/Id.md)\<`B`\>

### Parameters

#### id

[`Id`](../../../type-aliases/Id.md)\<`A`\>

### Returns

[`Id`](../../../type-aliases/Id.md)\<`B`\>
