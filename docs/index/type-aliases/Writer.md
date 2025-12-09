[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Writer

# Type Alias: Writer\<W, A\>

> **Writer**\<`W`, `A`\> = `object`

Defined in: [adt/writer.ts:14](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/writer.ts#L14)

Writer<W, A> accumulates a monoidal log W alongside a computed value A.

## Type Parameters

### W

`W`

Log type (must form a monoid with empty and combine)

### A

`A`

Result value type

## Properties

### \_combine()

> **\_combine**: (`w1`, `w2`) => `W`

Defined in: [adt/writer.ts:30](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/writer.ts#L30)

Access the combine function for this Writer instance.

#### Parameters

##### w1

`W`

##### w2

`W`

#### Returns

`W`

***

### \_empty

> **\_empty**: `W`

Defined in: [adt/writer.ts:33](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/writer.ts#L33)

Access the empty value for this Writer instance.

***

### \[WriterBrand\]

> `readonly` **\[WriterBrand\]**: `true`

Defined in: [adt/writer.ts:15](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/writer.ts#L15)

***

### ap()

> **ap**: \<`B`\>(`wf`) => `Writer`\<`W`, `B`\>

Defined in: [adt/writer.ts:27](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/writer.ts#L27)

Applicative ap: apply logged function to logged value.

#### Type Parameters

##### B

`B`

#### Parameters

##### wf

`Writer`\<`W`, (`a`) => `B`\>

#### Returns

`Writer`\<`W`, `B`\>

***

### chain()

> **chain**: \<`B`\>(`f`) => `Writer`\<`W`, `B`\>

Defined in: [adt/writer.ts:24](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/writer.ts#L24)

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

Defined in: [adt/writer.ts:21](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/writer.ts#L21)

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

Defined in: [adt/writer.ts:18](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/writer.ts#L18)

Execute computation: returns `[value, log]`.

#### Returns

\[`A`, `W`\]
