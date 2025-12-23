[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Payload

# Type Alias: Payload\<T, M\>

> **Payload**\<`T`, `M`\> = `object`

Defined in: [core/types.ts:81](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/core/types.ts#L81)

Optional helper shape for tagged messages.

This type is not required by the runtime, but can be used by applications
that prefer structured message envelopes.

## Type Parameters

### T

`T` *extends* `string`

### M

`M` *extends* `object` = \{ \}

## Properties

### msg

> **msg**: `M`

Defined in: [core/types.ts:83](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/core/types.ts#L83)

***

### type

> **type**: `T`

Defined in: [core/types.ts:82](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/core/types.ts#L82)
