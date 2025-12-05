[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Writer

# Variable: Writer

> **Writer**: \{\<`W`, `A`\>(`run`, `combine`): [`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>; `of`: [`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>; `sequence`: [`Writer`](../type-aliases/Writer.md)\<`W`, `A`[]\>; `tell`: [`Writer`](../type-aliases/Writer.md)\<`W`, `void`\>; `traverse`: (`arr`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`[]\>; \}

Defined in: [src/adt/writer.ts:12](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/writer.ts#L12)

Writer constructor.

## Type Declaration

## Type Parameters

### W

`W`

### A

`A`

## Parameters

### run

() => \[`A`, `W`\]

### combine

(`w1`, `w2`) => `W`

## Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

### of()

> **of**\<`W`, `A`\>(`a`, `empty`, `combine?`): [`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

Lift a value into Writer with empty log.

#### Type Parameters

##### W

`W`

##### A

`A`

#### Parameters

##### a

`A`

##### empty

`W`

##### combine?

(`w1`, `w2`) => `W`

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

### sequence()

> **sequence**\<`W`, `A`\>(`writers`, `combine`): [`Writer`](../type-aliases/Writer.md)\<`W`, `A`[]\>

Sequence an array of Writers, combining logs sequentially.

#### Type Parameters

##### W

`W`

##### A

`A`

#### Parameters

##### writers

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>[]

##### combine

(`w1`, `w2`) => `W`

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`[]\>

### tell()

> **tell**\<`W`\>(`w`, `combine?`): [`Writer`](../type-aliases/Writer.md)\<`W`, `void`\>

Write a log entry.

#### Type Parameters

##### W

`W`

#### Parameters

##### w

`W`

##### combine?

(`w1`, `w2`) => `W`

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `void`\>

### traverse()

> **traverse**\<`W`, `A`, `B`\>(`f`, `combine`): (`arr`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`[]\>

Traverse an array and collect results.

#### Type Parameters

##### W

`W`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

##### combine

(`w1`, `w2`) => `W`

#### Returns

> (`arr`): [`Writer`](../type-aliases/Writer.md)\<`W`, `B`[]\>

##### Parameters

###### arr

`A`[]

##### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `B`[]\>
