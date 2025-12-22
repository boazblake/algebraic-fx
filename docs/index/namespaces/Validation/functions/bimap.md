[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Validation](../README.md) / bimap

# Function: bimap()

> **bimap**\<`E`, `F`, `A`, `B`\>(`f`, `g`): (`fa`) => [`Validation`](../type-aliases/Validation.md)\<`F`, `B`\>

Defined in: [adt/validation.ts:61](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/adt/validation.ts#L61)

## Type Parameters

### E

`E`

### F

`F`

### A

`A`

### B

`B`

## Parameters

### f

(`e`) => `F`

### g

(`a`) => `B`

## Returns

> (`fa`): [`Validation`](../type-aliases/Validation.md)\<`F`, `B`\>

### Parameters

#### fa

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

### Returns

[`Validation`](../type-aliases/Validation.md)\<`F`, `B`\>
