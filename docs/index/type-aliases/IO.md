[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / IO

# Type Alias: IO\<A\>

> **IO**\<`A`\> = `object`

Defined in: [src/adt/io.ts:22](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/io.ts#L22)

IO<A> represents a *lazy*, *purely described* effect that produces a value of type A.

IO does not execute until `.run()` is called.

Characteristics:
- Lazy by default (no side effects until explicitly run)
- Referentially transparent (IO(() => x) always describes the same effect)
- Composable with map, chain, and ap

Equivalent to:
    IO<A> ≅ () => A

## Type Parameters

### A

`A`

The produced value type

## Properties

### \[IOBrand\]

> `readonly` **\[IOBrand\]**: `true`

Defined in: [src/adt/io.ts:23](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/io.ts#L23)

***

### ap()

> **ap**: \<`B`\>(`fb`) => `IO`\<`B`\>

Defined in: [src/adt/io.ts:43](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/io.ts#L43)

Applicative apply:
Apply an IO that produces a function to an IO that produces a value.

#### Type Parameters

##### B

`B`

#### Parameters

##### fb

`IO`\<(`a`) => `B`\>

#### Returns

`IO`\<`B`\>

***

### chain()

> **chain**: \<`B`\>(`f`) => `IO`\<`B`\>

Defined in: [src/adt/io.ts:37](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/io.ts#L37)

Monad chain / flatMap:
Feed the result into another IO-producing function.

IO(() => a).chain(x => IO(() => f(x)))

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `IO`\<`B`\>

#### Returns

`IO`\<`B`\>

***

### map()

> **map**: \<`B`\>(`f`) => `IO`\<`B`\>

Defined in: [src/adt/io.ts:29](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/io.ts#L29)

Functor map: transform the result of running the IO.

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`IO`\<`B`\>

***

### run()

> **run**: () => `A`

Defined in: [src/adt/io.ts:26](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/io.ts#L26)

Execute the effect and return the value.

#### Returns

`A`
