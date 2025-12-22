[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Validation](../README.md) / map

# Function: map()

> **map**\<`A`, `B`\>(`f`): \<`E`\>(`fa`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

Defined in: [adt/validation.ts:51](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/adt/validation.ts#L51)

## Type Parameters

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => `B`

## Returns

> \<`E`\>(`fa`): [`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

### Type Parameters

#### E

`E`

### Parameters

#### fa

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>
