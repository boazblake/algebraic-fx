[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Writer](../README.md) / WriterModule

# Function: WriterModule()

> **WriterModule**\<`W`\>(`m`): `object`

Defined in: [adt/writer.ts:115](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/adt/writer.ts#L115)

fp-ts style module dictionary for a fixed monoid W.

## Type Parameters

### W

`W`

## Parameters

### m

[`Monoid`](../../Monoid/type-aliases/Monoid.md)\<`W`\>

## Returns

### \[fl\_of\]()

> **\[fl\_of\]**: \<`A`\>(`a`, `w?`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `A`\> = `ofM`

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

##### w?

`W`

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

### ap()

> **ap**: \<`A`, `B`\>(`wf`, `wa`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\> = `apM`

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### wf

[`Writer`](../type-aliases/Writer.md)\<`W`, (`a`) => `B`\>

##### wa

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

### chain()

> **chain**: \<`A`, `B`\>(`wa`, `f`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\> = `chainM`

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### wa

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

##### f

(`a`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

### isWriter()

> **isWriter**: (`u`) => `u is Writer<unknown, unknown>`

Narrow type guard.

#### Parameters

##### u

`unknown`

#### Returns

`u is Writer<unknown, unknown>`

### listen()

> **listen**: \<`A`\>(`wa`) => [`Writer`](../type-aliases/Writer.md)\<`W`, \[`A`, `W`\]\> = `listenM`

#### Type Parameters

##### A

`A`

#### Parameters

##### wa

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, \[`A`, `W`\]\>

### map()

> **map**: \<`A`, `B`\>(`wa`, `f`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\> = `mapM`

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### wa

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

##### f

(`a`) => `B`

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

### of()

> **of**: \<`A`\>(`a`, `w?`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `A`\> = `ofM`

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

##### w?

`W`

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

### tell()

> **tell**: (`w`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `void`\> = `tellM`

#### Parameters

##### w

`W`

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `void`\>
