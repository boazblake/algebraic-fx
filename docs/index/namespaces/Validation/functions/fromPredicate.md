[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Validation](../README.md) / fromPredicate

# Function: fromPredicate()

> **fromPredicate**\<`A`, `E`\>(`pred`, `onFalse`): (`a`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

Defined in: [adt/validation.ts:82](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/validation.ts#L82)

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
