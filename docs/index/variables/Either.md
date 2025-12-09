[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Either

# Variable: Either

> **Either**: `object`

Defined in: [adt/either.ts:40](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/either.ts#L40)

Unified namespace export.

## Type Declaration

### alt()

> **alt**: \<`L`, `A`\>(`e1`, `e2`) => [`Either`](../type-aliases/Either.md)\<`L`, `A`\>

Alternative: return the first Right encountered.

#### Type Parameters

##### L

`L`

##### A

`A`

#### Parameters

##### e1

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

##### e2

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

### ap()

> **ap**: \<`L`, `A`, `B`\>(`ef`, `ea`) => [`Either`](../type-aliases/Either.md)\<`L`, `B`\>

Applicative apply: apply a Right-wrapped function to a Right-wrapped value.

#### Type Parameters

##### L

`L`

##### A

`A`

##### B

`B`

#### Parameters

##### ef

[`Either`](../type-aliases/Either.md)\<`L`, (`a`) => `B`\>

##### ea

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`L`, `B`\>

### bimap()

> **bimap**: \<`L`, `A`, `L2`, `B`\>(`onLeft`, `onRight`, `e`) => [`Either`](../type-aliases/Either.md)\<`L2`, `B`\>

Bifunctor map over Left OR Right.

#### Type Parameters

##### L

`L`

##### A

`A`

##### L2

`L2`

##### B

`B`

#### Parameters

##### onLeft

(`l`) => `L2`

##### onRight

(`a`) => `B`

##### e

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`L2`, `B`\>

### chain()

> **chain**: \<`L`, `A`, `B`\>(`f`, `e`) => [`Either`](../type-aliases/Either.md)\<`L`, `B`\>

Monad chain: bind the Right value to the next computation, short-circuiting on Left.

#### Type Parameters

##### L

`L`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Either`](../type-aliases/Either.md)\<`L`, `B`\>

##### e

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`L`, `B`\>

### filterOrElse()

> **filterOrElse**: \<`L`, `A`\>(`predicate`, `onFalse`, `e`) => [`Either`](../type-aliases/Either.md)\<`L`, `A`\>

Keep Right only if predicate succeeds; otherwise convert to Left.

#### Type Parameters

##### L

`L`

##### A

`A`

#### Parameters

##### predicate

(`a`) => `boolean`

##### onFalse

(`a`) => `L`

##### e

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

### fold()

> **fold**: \<`L`, `A`, `B`\>(`onLeft`, `onRight`, `e`) => `B`

Pattern match for Either.

#### Type Parameters

##### L

`L`

##### A

`A`

##### B

`B`

#### Parameters

##### onLeft

(`l`) => `B`

##### onRight

(`a`) => `B`

##### e

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

#### Returns

`B`

### fromNullable()

> **fromNullable**: \<`L`\>(`onNull`) => \<`A`\>(`a`) => [`Either`](../type-aliases/Either.md)\<`L`, `NonNullable`\<`A`\>\>

Convert nullable to Either.

#### Type Parameters

##### L

`L`

#### Parameters

##### onNull

`L`

#### Returns

> \<`A`\>(`a`): [`Either`](../type-aliases/Either.md)\<`L`, `NonNullable`\<`A`\>\>

##### Type Parameters

###### A

`A`

##### Parameters

###### a

`A` | `null` | `undefined`

##### Returns

[`Either`](../type-aliases/Either.md)\<`L`, `NonNullable`\<`A`\>\>

#### Example

```ts
fromNullable("missing")(null)    // Left("missing")
fromNullable("missing")(42)      // Right(42)
```

### getOrElse()

> **getOrElse**: \<`L`, `A`\>(`defaultValue`, `e`) => `A`

Extract the Right or fallback to a default.

#### Type Parameters

##### L

`L`

##### A

`A`

#### Parameters

##### defaultValue

`A`

##### e

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

#### Returns

`A`

### getOrElseW()

> **getOrElseW**: \<`L`, `A`, `B`\>(`onLeft`, `e`) => `A` \| `B`

Extract Right or compute fallback.

#### Type Parameters

##### L

`L`

##### A

`A`

##### B

`B`

#### Parameters

##### onLeft

(`l`) => `B`

##### e

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

#### Returns

`A` \| `B`

### isLeft()

> **isLeft**: \<`L`, `A`\>(`e`) => `e is Left<L>`

Type guard: check if e is Left.

#### Type Parameters

##### L

`L`

##### A

`A`

#### Parameters

##### e

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

#### Returns

`e is Left<L>`

### isRight()

> **isRight**: \<`L`, `A`\>(`e`) => `e is Right<A>`

Type guard: check if e is Right.

#### Type Parameters

##### L

`L`

##### A

`A`

#### Parameters

##### e

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

#### Returns

`e is Right<A>`

### Left()

> **Left**: \<`L`\>(`l`) => [`Either`](../type-aliases/Either.md)\<`L`, `never`\>

Construct a Left value (failure).

#### Type Parameters

##### L

`L`

#### Parameters

##### l

`L`

#### Returns

[`Either`](../type-aliases/Either.md)\<`L`, `never`\>

### map()

> **map**: \<`L`, `A`, `B`\>(`f`, `e`) => [`Either`](../type-aliases/Either.md)\<`L`, `B`\>

Functor map: transform the Right value, preserve Left as-is.

#### Type Parameters

##### L

`L`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

##### e

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`L`, `B`\>

### mapLeft()

> **mapLeft**: \<`L`, `A`, `L2`\>(`f`, `e`) => [`Either`](../type-aliases/Either.md)\<`L2`, `A`\>

Map only the Left (error) side.

#### Type Parameters

##### L

`L`

##### A

`A`

##### L2

`L2`

#### Parameters

##### f

(`l`) => `L2`

##### e

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`L2`, `A`\>

### of()

> **of**: \<`A`\>(`a`) => [`Either`](../type-aliases/Either.md)\<`never`, `A`\>

Lift a value into Right (pure).

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Either`](../type-aliases/Either.md)\<`never`, `A`\>

### Right()

> **Right**: \<`R`\>(`r`) => [`Either`](../type-aliases/Either.md)\<`never`, `R`\>

Construct a Right value (success).

#### Type Parameters

##### R

`R`

#### Parameters

##### r

`R`

#### Returns

[`Either`](../type-aliases/Either.md)\<`never`, `R`\>

### sequence()

> **sequence**: \<`L`, `A`\>(`arr`) => [`Either`](../type-aliases/Either.md)\<`L`, `A`[]\>

Sequence an array of Eithers into Either of array.

#### Type Parameters

##### L

`L`

##### A

`A`

#### Parameters

##### arr

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>[]

#### Returns

[`Either`](../type-aliases/Either.md)\<`L`, `A`[]\>

### swap()

> **swap**: \<`L`, `A`\>(`e`) => [`Either`](../type-aliases/Either.md)\<`A`, `L`\>

Swap Left and Right positions.

#### Type Parameters

##### L

`L`

##### A

`A`

#### Parameters

##### e

[`Either`](../type-aliases/Either.md)\<`L`, `A`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`A`, `L`\>

### traverse()

> **traverse**: \<`L`, `A`, `B`\>(`f`, `arr`) => [`Either`](../type-aliases/Either.md)\<`L`, `B`[]\>

Traverse an array, short-circuiting on Left.

#### Type Parameters

##### L

`L`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Either`](../type-aliases/Either.md)\<`L`, `B`\>

##### arr

`A`[]

#### Returns

[`Either`](../type-aliases/Either.md)\<`L`, `B`[]\>

### tryCatch()

> **tryCatch**: \<`A`\>(`f`) => [`Either`](../type-aliases/Either.md)\<`unknown`, `A`\>

Try/catch wrapper for synchronous code.

#### Type Parameters

##### A

`A`

#### Parameters

##### f

() => `A`

#### Returns

[`Either`](../type-aliases/Either.md)\<`unknown`, `A`\>

### tryCatchK()

> **tryCatchK**: \<`E`, `A`\>(`f`, `onError`) => [`Either`](../type-aliases/Either.md)\<`E`, `A`\>

Try/catch wrapper with custom error mapping.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### f

() => `A`

##### onError

(`e`) => `E`

#### Returns

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>
