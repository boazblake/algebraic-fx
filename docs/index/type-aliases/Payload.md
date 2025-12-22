[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Payload

# Type Alias: Payload\<T, M\>

> **Payload**\<`T`, `M`\> = `object`

Defined in: [core/types.ts:81](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/core/types.ts#L81)

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

Defined in: [core/types.ts:83](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/core/types.ts#L83)

***

### type

> **type**: `T`

Defined in: [core/types.ts:82](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/core/types.ts#L82)
