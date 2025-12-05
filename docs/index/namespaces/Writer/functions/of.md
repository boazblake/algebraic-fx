[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / of

# Function: of()

> **of**\<`W`, `A`\>(`a`, `empty`, `combine?`): [`Writer`](../../../type-aliases/Writer.md)\<`W`, `A`\>

Defined in: [src/adt/writer.ts:91](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/writer.ts#L91)

Lift a value into Writer with empty log.

## Type Parameters

### W

`W`

### A

`A`

## Parameters

### a

`A`

### empty

`W`

### combine?

(`w1`, `w2`) => `W`

## Returns

[`Writer`](../../../type-aliases/Writer.md)\<`W`, `A`\>
