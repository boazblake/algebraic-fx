[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Validation](../README.md) / fromNullable

# Function: fromNullable()

> **fromNullable**\<`A`, `E`\>(`onNull`): (`a`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

Defined in: [adt/validation.ts:87](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/adt/validation.ts#L87)

## Type Parameters

### A

`A`

### E

`E`

## Parameters

### onNull

() => `E`

## Returns

> (`a`): [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

### Parameters

#### a

`A` | `null` | `undefined`

### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>
