[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / ReaderConstructor

# Interface: ReaderConstructor()

Defined in: [adt/reader.ts:30](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/reader.ts#L30)

> **ReaderConstructor**\<`R`, `A`\>(`run`): [`Reader`](Reader.md)\<`R`, `A`\>

Defined in: [adt/reader.ts:31](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/reader.ts#L31)

## Type Parameters

### R

`R`

### A

`A`

## Parameters

### run

(`r`) => `A`

## Returns

[`Reader`](Reader.md)\<`R`, `A`\>

## Properties

### ask()

> **ask**: \<`R`\>() => [`Reader`](Reader.md)\<`R`, `R`\>

Defined in: [adt/reader.ts:33](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/reader.ts#L33)

#### Type Parameters

##### R

`R`

#### Returns

[`Reader`](Reader.md)\<`R`, `R`\>

***

### asks()

> **asks**: \<`R`, `A`\>(`f`) => [`Reader`](Reader.md)\<`R`, `A`\>

Defined in: [adt/reader.ts:34](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/reader.ts#L34)

#### Type Parameters

##### R

`R`

##### A

`A`

#### Parameters

##### f

(`r`) => `A`

#### Returns

[`Reader`](Reader.md)\<`R`, `A`\>

***

### of()

> **of**: \<`R`, `A`\>(`a`) => [`Reader`](Reader.md)\<`R`, `A`\>

Defined in: [adt/reader.ts:32](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/reader.ts#L32)

#### Type Parameters

##### R

`R`

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Reader`](Reader.md)\<`R`, `A`\>
