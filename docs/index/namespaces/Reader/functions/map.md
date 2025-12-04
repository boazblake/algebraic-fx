[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / map

# Function: map()

> **map**\<`E`, `A`, `B`\>(`f`): (`r`) => [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

Defined in: [src/adt/reader.ts:80](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/reader.ts#L80)

Point-free functor map.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => `B`

## Returns

> (`r`): [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

### Parameters

#### r

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`\>

### Returns

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>
