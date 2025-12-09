[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Reader

# Type Alias: Reader\<E, A\>

> **Reader**\<`E`, `A`\> = `object`

Defined in: [adt/reader.ts:24](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/reader.ts#L24)

The Reader monad (also known as the environment monad).

`Reader<E, A>` represents a computation that depends on an environment `E`
and produces a value `A`.

It provides:
- Dependency injection
- Pure environment access
- Composition without manually threading env everywhere

Conceptually:
   Reader<E, A>  ≅  (env: E) => A

## Type Parameters

### E

`E`

The environment type

### A

`A`

The produced value

## Properties

### \[ReaderBrand\]

> `readonly` **\[ReaderBrand\]**: `true`

Defined in: [adt/reader.ts:25](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/reader.ts#L25)

***

### ap()

> **ap**: \<`B`\>(`fb`) => `Reader`\<`E`, `B`\>

Defined in: [adt/reader.ts:44](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/reader.ts#L44)

Applicative apply:
Apply an environment-dependent function to an environment-dependent value.

#### Type Parameters

##### B

`B`

#### Parameters

##### fb

`Reader`\<`E`, (`a`) => `B`\>

#### Returns

`Reader`\<`E`, `B`\>

***

### chain()

> **chain**: \<`B`\>(`f`) => `Reader`\<`E`, `B`\>

Defined in: [adt/reader.ts:38](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/reader.ts#L38)

Monad chain / flatMap:
Feed the result of this Reader into another Reader-producing function,
using the same environment.

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `Reader`\<`E`, `B`\>

#### Returns

`Reader`\<`E`, `B`\>

***

### map()

> **map**: \<`B`\>(`f`) => `Reader`\<`E`, `B`\>

Defined in: [adt/reader.ts:31](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/reader.ts#L31)

Functor map: transform the output value while leaving environment access untouched.

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`Reader`\<`E`, `B`\>

***

### run()

> **run**: (`env`) => `A`

Defined in: [adt/reader.ts:28](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/reader.ts#L28)

Execute the computation using the provided environment.

#### Parameters

##### env

`E`

#### Returns

`A`
