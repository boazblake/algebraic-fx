[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Validation](../README.md) / fromPredicate

# Function: fromPredicate()

> **fromPredicate**\<`A`, `E`\>(`pred`, `onFalse`): (`a`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

Defined in: [adt/validation.ts:82](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/validation.ts#L82)

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
