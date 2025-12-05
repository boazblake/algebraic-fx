[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Writer

# Type Alias: Writer\<W, A\>

> **Writer**\<`W`, `A`\> = `object`

Defined in: [src/adt/writer.ts:12](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/writer.ts#L12)

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

Defined in: [src/adt/writer.ts:13](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/writer.ts#L13)

***

### ap()

> **ap**: \<`B`\>(`fb`) => `Writer`\<`W`, `B`\>

Defined in: [src/adt/writer.ts:25](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/writer.ts#L25)

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

Defined in: [src/adt/writer.ts:22](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/writer.ts#L22)

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

Defined in: [src/adt/writer.ts:19](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/writer.ts#L19)

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

Defined in: [src/adt/writer.ts:16](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/writer.ts#L16)

Execute computation: returns `[value, log]`.

#### Returns

\[`A`, `W`\]
