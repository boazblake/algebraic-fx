[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / fromNullable

# Function: fromNullable()

> **fromNullable**\<`E`\>(`onNull`): \<`A`\>(`a`) => [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

Defined in: [adt/either.ts:132](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/either.ts#L132)

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
