[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / of

# Function: of()

> **of**\<`W`, `A`\>(`a`, `empty`, `combine?`): [`Writer`](../../../type-aliases/Writer.md)\<`W`, `A`\>

Defined in: [src/adt/writer.ts:91](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/writer.ts#L91)

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
