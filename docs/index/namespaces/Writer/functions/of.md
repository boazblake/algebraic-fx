[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / of

# Function: of()

> **of**\<`W`, `A`\>(`a`, `empty`, `combine?`): [`Writer`](../../../type-aliases/Writer.md)\<`W`, `A`\>

Defined in: [adt/writer.ts:90](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/writer.ts#L90)

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
