[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Id](../README.md) / ap

# Function: ap()

> **ap**\<`A`, `B`\>(`fb`): (`fa`) => [`Id`](../../../type-aliases/Id.md)\<`B`\>

Defined in: [src/adt/id.ts:59](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/id.ts#L59)

Point-free applicative apply.

## Type Parameters

### A

`A`

### B

`B`

## Parameters

### fb

[`Id`](../../../type-aliases/Id.md)\<(`a`) => `B`\>

## Returns

> (`fa`): [`Id`](../../../type-aliases/Id.md)\<`B`\>

### Parameters

#### fa

[`Id`](../../../type-aliases/Id.md)\<`A`\>

### Returns

[`Id`](../../../type-aliases/Id.md)\<`B`\>
