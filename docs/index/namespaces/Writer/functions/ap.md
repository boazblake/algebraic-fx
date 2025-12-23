[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / ap

# Function: ap()

> **ap**\<`W`, `A`, `B`\>(`wf`, `wa`): [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

Defined in: [adt/writer.ts:82](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/writer.ts#L82)

ap: apply a Writer<W, (a -> b)> to a Writer<W, a>, combining logs.

## Type Parameters

### W

`W`

### A

`A`

### B

`B`

## Parameters

### wf

[`Writer`](../type-aliases/Writer.md)\<`W`, (`a`) => `B`\>

### wa

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

## Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>
