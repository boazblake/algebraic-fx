[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Maybe](../README.md) / MaybeModule

# Variable: MaybeModule

> `const` **MaybeModule**: `object`

Defined in: [adt/maybe.ts:131](https://github.com/boazblake/algebraic-fx/blob/d0bbbb937347c32e45bf55a848f87f5b870532c7/src/adt/maybe.ts#L131)

## Type Declaration

### ap()

> **ap**: \<`A`, `B`\>(`mf`) => (`ma`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### mf

[`Maybe`](../type-aliases/Maybe.md)\<(`a`) => `B`\>

#### Returns

> (`ma`): [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

##### Parameters

###### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

##### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`B`\>

### chain()

> **chain**: \<`A`, `B`\>(`f`) => (`ma`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

#### Returns

> (`ma`): [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

##### Parameters

###### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

##### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`B`\>

### fromNullable()

> **fromNullable**: \<`A`\>(`a`) => [`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A` | `null` | `undefined`

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

### fromPredicate()

> **fromPredicate**: \<`A`\>(`pred`) => (`a`) => [`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Type Parameters

##### A

`A`

#### Parameters

##### pred

(`a`) => `boolean`

#### Returns

> (`a`): [`Maybe`](../type-aliases/Maybe.md)\<`A`\>

##### Parameters

###### a

`A`

##### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

### map()

> **map**: \<`A`, `B`\>(`f`) => (`ma`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

> (`ma`): [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

##### Parameters

###### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

##### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`B`\>

### match()

> **match**: \<`A`, `B`\>(`onNothing`, `onJust`) => (`ma`) => `B`

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

#### Returns

> (`ma`): `B`

##### Parameters

###### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

##### Returns

`B`

### maybe()

> **maybe**: \<`A`, `B`\>(`onNothing`, `onJust`) => (`ma`) => `B`

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### onNothing

`B`

##### onJust

(`a`) => `B`

#### Returns

> (`ma`): `B`

##### Parameters

###### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

##### Returns

`B`

### of()

> **of**: \<`A`\>(`a`) => [`Maybe`](../type-aliases/Maybe.md)\<`A`\>

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

### URI

> **URI**: `"Maybe"` = `MAYBE_URI`

### withDefault()

> **withDefault**: \<`A`\>(`onNothing`) => (`ma`) => `A`

#### Type Parameters

##### A

`A`

#### Parameters

##### onNothing

`A`

#### Returns

> (`ma`): `A`

##### Parameters

###### ma

[`Maybe`](../type-aliases/Maybe.md)\<`A`\>

##### Returns

`A`
