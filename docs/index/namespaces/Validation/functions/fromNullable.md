[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Validation](../README.md) / fromNullable

# Function: fromNullable()

> **fromNullable**\<`A`, `E`\>(`onNull`): (`a`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

Defined in: [adt/validation.ts:87](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/adt/validation.ts#L87)

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
