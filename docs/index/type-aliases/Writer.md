[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Writer

# Type Alias: Writer\<W, A\>

> **Writer**\<`W`, `A`\> = `object`

Defined in: [adt/writer.ts:11](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/writer.ts#L11)

Writer<W, A> accumulates a monoidal log W alongside a computed value A.

## Type Parameters

### W

`W`

Log type

### A

`A`

Result value type

## Properties

### \[WriterBrand\]

> `readonly` **\[WriterBrand\]**: `true`

Defined in: [adt/writer.ts:12](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/writer.ts#L12)

***

### ap()

> **ap**: \<`B`\>(`fb`) => `Writer`\<`W`, `B`\>

Defined in: [adt/writer.ts:24](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/writer.ts#L24)

Applicative ap: apply logged function to logged value.

#### Type Parameters

##### B

`B`

#### Parameters

##### fb

`Writer`\<`W`, (`a`) => `B`\>

#### Returns

`Writer`\<`W`, `B`\>

***

### chain()

> **chain**: \<`B`\>(`f`) => `Writer`\<`W`, `B`\>

Defined in: [adt/writer.ts:21](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/writer.ts#L21)

Monad chain: sequence computations, combining logs.

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `Writer`\<`W`, `B`\>

#### Returns

`Writer`\<`W`, `B`\>

***

### map()

> **map**: \<`B`\>(`f`) => `Writer`\<`W`, `B`\>

Defined in: [adt/writer.ts:18](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/writer.ts#L18)

Functor map: transform the result value only.

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`Writer`\<`W`, `B`\>

***

### run()

> **run**: () => \[`A`, `W`\]

Defined in: [adt/writer.ts:15](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/writer.ts#L15)

Execute computation: returns `[value, log]`.

#### Returns

\[`A`, `W`\]
