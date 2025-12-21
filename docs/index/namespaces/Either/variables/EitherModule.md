[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / EitherModule

# Variable: EitherModule

> `const` **EitherModule**: `object`

Defined in: [adt/either.ts:205](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/either.ts#L205)

fp ts style module dictionary.

## Type Declaration

### \[fl\_of\]()

> **\[fl\_of\]**: \<`A`\>(`a`) => [`Either`](../type-aliases/Either.md)\<`never`, `A`\> = `of`

Applicative "of" injects a value in the Right side.

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Either`](../type-aliases/Either.md)\<`never`, `A`\>

### ap()

> **ap**: \<`E`, `A`, `B`\>(`fab`, `fa`) => [`Either`](../type-aliases/Either.md)\<`E`, `B`\>

Apply. If either side is Left, it short circuits.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### fab

[`Either`](../type-aliases/Either.md)\<`E`, (`a`) => `B`\>

##### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`E`, `B`\>

### bimap()

> **bimap**: \<`E`, `A`, `F`, `B`\>(`fa`, `f`, `g`) => [`Either`](../type-aliases/Either.md)\<`F`, `B`\>

Bimap over both sides.

#### Type Parameters

##### E

`E`

##### A

`A`

##### F

`F`

##### B

`B`

#### Parameters

##### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

##### f

(`e`) => `F`

##### g

(`a`) => `B`

#### Returns

[`Either`](../type-aliases/Either.md)\<`F`, `B`\>

### chain()

> **chain**: \<`E`, `A`, `B`\>(`fa`, `f`) => [`Either`](../type-aliases/Either.md)\<`E`, `B`\>

Monad chain.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

##### f

(`a`) => [`Either`](../type-aliases/Either.md)\<`E`, `B`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`E`, `B`\>

### either()

> **either**: \<`E`, `A`, `B`\>(`onLeft`, `onRight`) => (`fa`) => `B`

Same as match but flipped argument order, aligns with maybe().

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### onLeft

(`e`) => `B`

##### onRight

(`a`) => `B`

#### Returns

> (`fa`): `B`

##### Parameters

###### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

##### Returns

`B`

### fromNullable()

> **fromNullable**: \<`E`\>(`onNull`) => \<`A`\>(`a`) => [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

Build Either from nullable value.

#### Type Parameters

##### E

`E`

#### Parameters

##### onNull

() => `E`

#### Returns

> \<`A`\>(`a`): [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

##### Type Parameters

###### A

`A`

##### Parameters

###### a

`A` | `null` | `undefined`

##### Returns

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

### fromPredicate()

> **fromPredicate**: \<`E`, `A`\>(`predicate`, `onFalse`) => (`a`) => [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

Build Either from predicate.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### predicate

(`a`) => `boolean`

##### onFalse

(`a`) => `E`

#### Returns

> (`a`): [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

##### Parameters

###### a

`A`

##### Returns

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

### getOrElse()

> **getOrElse**: \<`E`, `A`\>(`onLeft`) => (`fa`) => `A`

Extract with default for Left.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### onLeft

(`e`) => `A`

#### Returns

> (`fa`): `A`

##### Parameters

###### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

##### Returns

`A`

### isEither()

> **isEither**: (`u`) => `u is Either<unknown, unknown>`

Narrow type guard for Either values.

#### Parameters

##### u

`unknown`

#### Returns

`u is Either<unknown, unknown>`

### isLeft()

> **isLeft**: \<`E`, `A`\>(`fa`) => `fa is Left<E>`

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

#### Returns

`fa is Left<E>`

### isRight()

> **isRight**: \<`E`, `A`\>(`fa`) => `fa is Right<A>`

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

#### Returns

`fa is Right<A>`

### left()

> **left**: \<`E`, `A`\>(`e`) => [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

#### Type Parameters

##### E

`E` = `never`

##### A

`A` = `never`

#### Parameters

##### e

`E`

#### Returns

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

### map()

> **map**: \<`E`, `A`, `B`\>(`fa`, `f`) => [`Either`](../type-aliases/Either.md)\<`E`, `B`\>

Functor map.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

##### f

(`a`) => `B`

#### Returns

[`Either`](../type-aliases/Either.md)\<`E`, `B`\>

### mapLeft()

> **mapLeft**: \<`E`, `A`, `F`\>(`fa`, `f`) => [`Either`](../type-aliases/Either.md)\<`F`, `A`\>

Map over the Left side.

#### Type Parameters

##### E

`E`

##### A

`A`

##### F

`F`

#### Parameters

##### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

##### f

(`e`) => `F`

#### Returns

[`Either`](../type-aliases/Either.md)\<`F`, `A`\>

### match()

> **match**: \<`E`, `A`, `B`\>(`onLeft`, `onRight`) => (`fa`) => `B`

Pattern match.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### onLeft

(`e`) => `B`

##### onRight

(`a`) => `B`

#### Returns

> (`fa`): `B`

##### Parameters

###### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

##### Returns

`B`

### of()

> **of**: \<`A`\>(`a`) => [`Either`](../type-aliases/Either.md)\<`never`, `A`\>

Applicative "of" injects a value in the Right side.

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Either`](../type-aliases/Either.md)\<`never`, `A`\>

### right()

> **right**: \<`E`, `A`\>(`a`) => [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

#### Type Parameters

##### E

`E` = `never`

##### A

`A` = `never`

#### Parameters

##### a

`A`

#### Returns

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

### swap()

> **swap**: \<`E`, `A`\>(`fa`) => [`Either`](../type-aliases/Either.md)\<`A`, `E`\>

Swap Left and Right.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`A`, `E`\>

### tryCatch()

> **tryCatch**: \<`E`, `A`\>(`thunk`, `onThrow`) => [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

Effectful construction with error capture.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### thunk

() => `A`

##### onThrow

(`u`) => `E`

#### Returns

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

### URI

> **URI**: `string` = `"Either"`
