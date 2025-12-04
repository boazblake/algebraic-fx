[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / ap

# Function: ap()

> **ap**\<`E`, `A`, `B`\>(`fb`): (`fa`) => [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

Defined in: [src/adt/reader.ts:96](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/reader.ts#L96)

Point-free applicative apply.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### fb

[`Reader`](../../../type-aliases/Reader.md)\<`E`, (`a`) => `B`\>

## Returns

> (`fa`): [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

### Parameters

#### fa

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`\>

### Returns

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>
