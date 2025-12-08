[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Maybe

# Variable: Maybe

> **Maybe**: `object`

Defined in: [adt/maybe.ts:28](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/maybe.ts#L28)

Unified module-style export containing all Maybe functions.

## Type Declaration

### alt()

> **alt**: \<`A`\>(`ma1`, `ma2`) => [`Maybe`](../type-aliases/Maybe.md)\<`A`\>

Alternative: return the first Just encountered.

#### Type Parameters

##### A

`A`

#### Parameters

##### ma1

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

##### ma2

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

### ap()

> **ap**: \<`A`, `B`\>(`mf`, `ma`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

Applicative apply: apply a Maybe-wrapped function to a Maybe-wrapped value.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### mf

[`Maybe`](../type-aliases/Maybe.md)\<(`a`) => `B`\>

##### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`B`\>

#### Example

```ts
ap(Just(x => x + 1), Just(2))   // Just(3)
ap(Just(x => x + 1), Nothing)   // Nothing
ap(Nothing, Just(2))            // Nothing
```

### chain()

> **chain**: \<`A`, `B`\>(`f`, `ma`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

Monad chain / flatMap:
Run a function returning another Maybe if value is present.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

##### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`B`\>

#### Example

```ts
chain(x => x > 0 ? Just(x) : Nothing, Just(1))   // Just(1)
chain(x => Nothing, Just(1))                     // Nothing
chain(f, Nothing)                                // Nothing
```

### filter()

> **filter**: \<`A`\>(`predicate`, `ma`) => [`Maybe`](../type-aliases/Maybe.md)\<`A`\>

Filter a Maybe by predicate.

Keeps Just(a) if predicate(a) is true, otherwise returns Nothing.

#### Type Parameters

##### A

`A`

#### Parameters

##### predicate

(`a`) => `boolean`

##### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

### fold()

> **fold**: \<`A`, `B`\>(`onNothing`, `onJust`, `ma`) => `B`

Pattern matching for Maybe.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### onNothing

() => `B`

##### onJust

(`a`) => `B`

##### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Returns

`B`

#### Example

```ts
fold(() => 0, x => x * 2, Just(3))    // 6
fold(() => 0, x => x * 2, Nothing)    // 0
```

### fromNullable()

> **fromNullable**: \<`A`\>(`a`) => [`Maybe`](../type-aliases/Maybe.md)\<`NonNullable`\<`A`\>\>

Convert `null | undefined | A` into Maybe.

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A` | `null` | `undefined`

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`NonNullable`\<`A`\>\>

#### Example

```ts
fromNullable(null)      // Nothing
fromNullable(undefined) // Nothing
fromNullable(5)         // Just(5)
```

### getOrElse()

> **getOrElse**: \<`A`\>(`defaultValue`, `ma`) => `A`

Extract the value or fall back to a default.

#### Type Parameters

##### A

`A`

#### Parameters

##### defaultValue

`A`

##### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Returns

`A`

### getOrElseW()

> **getOrElseW**: \<`A`, `B`\>(`onNothing`, `ma`) => `A` \| `B`

Extract the value or compute the default lazily.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### onNothing

() => `B`

##### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Returns

`A` \| `B`

### isJust()

> **isJust**: \<`A`\>(`ma`) => `ma is Maybe<A>`

Type guard: detect Just.

#### Type Parameters

##### A

`A`

#### Parameters

##### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Returns

`ma is Maybe<A>`

### isNothing()

> **isNothing**: \<`A`\>(`ma`) => `ma is Maybe<never>`

Type guard: detect Nothing.

#### Type Parameters

##### A

`A`

#### Parameters

##### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Returns

`ma is Maybe<never>`

### Just()

> **Just**: \<`A`\>(`value`) => [`Maybe`](../type-aliases/Maybe.md)\<`A`\>

Construct a `Just` value.

#### Type Parameters

##### A

`A`

#### Parameters

##### value

`A`

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

### map()

> **map**: \<`A`, `B`\>(`f`, `ma`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

Functor map: transform the inner value when present.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

##### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`B`\>

#### Example

```ts
map(x => x + 1, Just(2))    // Just(3)
map(x => x + 1, Nothing)    // Nothing
```

### Nothing

> **Nothing**: `Nothing` & `object`

The singleton Nothing value, representing absence.

#### Type Declaration

##### \[MaybeBrand\]

> `readonly` **\[MaybeBrand\]**: `true`

### of()

> **of**: \<`A`\>(`a`) => [`Maybe`](../type-aliases/Maybe.md)\<`A`\>

Lift a value into a `Just`.

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

### sequence()

> **sequence**: \<`A`\>(`arr`) => [`Maybe`](../type-aliases/Maybe.md)\<`A`[]\>

Sequence an array of Maybes:
- If any element is Nothing, result is Nothing
- Otherwise returns Just(array of values)

#### Type Parameters

##### A

`A`

#### Parameters

##### arr

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>[]

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`A`[]\>

### toNullable()

> **toNullable**: \<`A`\>(`ma`) => `A` \| `null`

Convert Maybe into nullable.

#### Type Parameters

##### A

`A`

#### Parameters

##### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Returns

`A` \| `null`

### toUndefined()

> **toUndefined**: \<`A`\>(`ma`) => `A` \| `undefined`

Convert Maybe into undefined.

#### Type Parameters

##### A

`A`

#### Parameters

##### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Returns

`A` \| `undefined`

### traverse()

> **traverse**: \<`A`, `B`\>(`f`, `arr`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`[]\>

Traverse an array with a function returning Maybe.
Stops at the first Nothing.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

##### arr

`A`[]

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`B`[]\>
