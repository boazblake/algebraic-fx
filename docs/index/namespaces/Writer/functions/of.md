[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / of

# Function: of()

> **of**\<`W`, `A`\>(`m`, `a`, `w?`): [`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

Defined in: [adt/writer.ts:43](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/adt/writer.ts#L43)

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
