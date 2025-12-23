[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / fromPredicate

# Function: fromPredicate()

> **fromPredicate**\<`E`, `A`\>(`predicate`, `onFalse`): (`a`) => [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

Defined in: [adt/either.ts:140](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/either.ts#L140)

Build Either from predicate.

## Type Parameters

### E

`E`

### A

`A`

## Parameters

### predicate

(`a`) => `boolean`

### onFalse

(`a`) => `E`

## Returns

> (`a`): [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

### Parameters

#### a

`A`

### Returns

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>
