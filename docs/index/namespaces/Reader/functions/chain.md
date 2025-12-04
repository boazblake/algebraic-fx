[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / chain

# Function: chain()

> **chain**\<`E`, `A`, `B`\>(`f`): (`r`) => [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

Defined in: [src/adt/reader.ts:88](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/reader.ts#L88)

Point-free chain.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

## Returns

> (`r`): [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

### Parameters

#### r

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`\>

### Returns

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>
