[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Id](../README.md) / chain

# Function: chain()

> **chain**\<`A`, `B`\>(`f`): (`id`) => [`Id`](../../../type-aliases/Id.md)\<`B`\>

Defined in: [adt/id.ts:75](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/id.ts#L75)

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
