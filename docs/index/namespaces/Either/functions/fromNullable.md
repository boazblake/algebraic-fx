[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / fromNullable

# Function: fromNullable()

> **fromNullable**\<`E`\>(`onNull`): \<`A`\>(`a`) => [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

Defined in: [adt/either.ts:132](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/either.ts#L132)

Build Either from nullable value.

## Type Parameters

### E

`E`

## Parameters

### onNull

() => `E`

## Returns

> \<`A`\>(`a`): [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

### Type Parameters

#### A

`A`

### Parameters

#### a

`A` | `null` | `undefined`

### Returns

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>
