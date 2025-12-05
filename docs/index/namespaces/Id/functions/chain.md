[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Id](../README.md) / chain

# Function: chain()

> **chain**\<`A`, `B`\>(`f`): (`id`) => [`Id`](../../../type-aliases/Id.md)\<`B`\>

Defined in: [src/adt/id.ts:75](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/id.ts#L75)

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
