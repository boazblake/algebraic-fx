[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Payload

# Type Alias: Payload\<T, M\>

> **Payload**\<`T`, `M`\> = `object`

Defined in: [core/types.ts:79](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/core/types.ts#L79)

Optional helper shape for tagged messages.

This type is not required by the runtime, but can be used
by applications that prefer structured message envelopes.

## Type Parameters

### T

`T` *extends* `string`

### M

`M` *extends* `object` = \{ \}

## Properties

### msg

> **msg**: `M`

Defined in: [core/types.ts:81](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/core/types.ts#L81)

***

### type

> **type**: `T`

Defined in: [core/types.ts:80](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/core/types.ts#L80)
