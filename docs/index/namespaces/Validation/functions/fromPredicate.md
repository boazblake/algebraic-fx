[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Validation](../README.md) / fromPredicate

# Function: fromPredicate()

> **fromPredicate**\<`A`, `E`\>(`pred`, `onFalse`): (`a`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

Defined in: [adt/validation.ts:82](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/adt/validation.ts#L82)

## Type Parameters

### A

`A`

### E

`E`

## Parameters

### pred

(`a`) => `boolean`

### onFalse

(`a`) => `E`

## Returns

> (`a`): [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

### Parameters

#### a

`A`

### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>
