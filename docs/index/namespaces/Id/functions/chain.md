[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Id](../README.md) / chain

# Function: chain()

> **chain**\<`A`, `B`\>(`f`): (`id`) => [`Id`](../../../type-aliases/Id.md)\<`B`\>

Defined in: [src/adt/id.ts:75](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/id.ts#L75)

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
