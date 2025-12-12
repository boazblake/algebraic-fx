[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Id

# Type Alias: Id\<A\>

> **Id**\<`A`\> = `object`

Defined in: [adt/id.ts:22](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/id.ts#L22)

Identity monad.

Represents a pure wrapped value `A` and supports:
- Functor map
- Monad chain
- Applicative apply

Conceptually:
  Id<A> ≅ A

It is primarily used to unify APIs that expect a monadic interface
even when effects are not needed.

## Type Parameters

### A

`A`

Wrapped value type

## Properties

### \[IdBrand\]

> `readonly` **\[IdBrand\]**: `true`

Defined in: [adt/id.ts:23](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/id.ts#L23)

***

### ap()

> **ap**: \<`B`\>(`fb`) => `Id`\<`B`\>

Defined in: [adt/id.ts:35](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/id.ts#L35)

Applicative apply.

#### Type Parameters

##### B

`B`

#### Parameters

##### fb

`Id`\<(`a`) => `B`\>

#### Returns

`Id`\<`B`\>

***

### chain()

> **chain**: \<`B`\>(`f`) => `Id`\<`B`\>

Defined in: [adt/id.ts:32](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/id.ts#L32)

Monad chain.

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `Id`\<`B`\>

#### Returns

`Id`\<`B`\>

***

### map()

> **map**: \<`B`\>(`f`) => `Id`\<`B`\>

Defined in: [adt/id.ts:29](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/id.ts#L29)

Functor map.

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`Id`\<`B`\>

***

### run()

> **run**: () => `A`

Defined in: [adt/id.ts:26](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/id.ts#L26)

Extract the wrapped value.

#### Returns

`A`
