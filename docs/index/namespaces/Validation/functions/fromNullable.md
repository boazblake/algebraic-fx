[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Validation](../README.md) / fromNullable

# Function: fromNullable()

> **fromNullable**\<`A`, `E`\>(`onNull`): (`a`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

Defined in: [adt/validation.ts:87](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/validation.ts#L87)

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
