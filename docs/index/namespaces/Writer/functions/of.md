[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / of

# Function: of()

> **of**\<`W`, `A`\>(`m`, `a`, `w?`): [`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

Defined in: [adt/writer.ts:43](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/adt/writer.ts#L43)

of: construct a Writer with value and optional initial log.
If log is omitted, uses the monoid empty.

## Type Parameters

### W

`W`

### A

`A`

## Parameters

### m

[`Monoid`](../../Monoid/type-aliases/Monoid.md)\<`W`\>

### a

`A`

### w?

`W`

## Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>
