[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / chain

# Function: chain()

> **chain**\<`E`, `A`, `B`\>(`fa`, `f`): [`Either`](../type-aliases/Either.md)\<`E`, `B`\>

Defined in: [adt/either.ts:88](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/either.ts#L88)

Monad chain.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

### f

(`a`) => [`Either`](../type-aliases/Either.md)\<`E`, `B`\>

## Returns

[`Either`](../type-aliases/Either.md)\<`E`, `B`\>
