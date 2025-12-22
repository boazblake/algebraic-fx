[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Validation](../README.md) / ValidationModule

# Variable: ValidationModule

> `const` **ValidationModule**: `object`

Defined in: [adt/validation.ts:144](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/adt/validation.ts#L144)

## Type Declaration

### \[fl\_of\]()

> **\[fl\_of\]**: \<`A`\>(`a`) => [`Validation`](../type-aliases/Validation.md)\<`never`, `A`\> = `of`

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`never`, `A`\>

### bimap()

> **bimap**: \<`E`, `F`, `A`, `B`\>(`f`, `g`) => (`fa`) => [`Validation`](../type-aliases/Validation.md)\<`F`, `B`\>

#### Type Parameters

##### E

`E`

##### F

`F`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`e`) => `F`

##### g

(`a`) => `B`

#### Returns

> (`fa`): [`Validation`](../type-aliases/Validation.md)\<`F`, `B`\>

##### Parameters

###### fa

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

##### Returns

[`Validation`](../type-aliases/Validation.md)\<`F`, `B`\>

### failure()

> **failure**: \<`E`, `A`\>(`e`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Type Parameters

##### E

`E` = `unknown`

##### A

`A` = `never`

#### Parameters

##### e

`E`

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

### fromNullable()

> **fromNullable**: \<`A`, `E`\>(`onNull`) => (`a`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Type Parameters

##### A

`A`

##### E

`E`

#### Parameters

##### onNull

() => `E`

#### Returns

> (`a`): [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

##### Parameters

###### a

`A` | `null` | `undefined`

##### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

### fromPredicate()

> **fromPredicate**: \<`A`, `E`\>(`pred`, `onFalse`) => (`a`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Type Parameters

##### A

`A`

##### E

`E`

#### Parameters

##### pred

(`a`) => `boolean`

##### onFalse

(`a`) => `E`

#### Returns

> (`a`): [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

##### Parameters

###### a

`A`

##### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

### getOrElse()

> **getOrElse**: \<`A`\>(`onFailure`) => \<`E`\>(`fa`) => `A`

#### Type Parameters

##### A

`A`

#### Parameters

##### onFailure

() => `A`

#### Returns

> \<`E`\>(`fa`): `A`

##### Type Parameters

###### E

`E`

##### Parameters

###### fa

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

##### Returns

`A`

### getValidationApplicative()

> **getValidationApplicative**: \<`E`\>(`S`) => `object`

#### Type Parameters

##### E

`E`

#### Parameters

##### S

[`Semigroup`](../interfaces/Semigroup.md)\<`E`\>

#### Returns

`object`

##### ap()

> **ap**: \<`A`, `B`\>(`fab`, `fa`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

###### Type Parameters

###### A

`A`

###### B

`B`

###### Parameters

###### fab

[`Validation`](../type-aliases/Validation.md)\<`E`, (`a`) => `B`\>

###### fa

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

###### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

##### map()

> **map**: \<`A`, `B`\>(`f`) => \<`E`\>(`fa`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

###### Type Parameters

###### A

`A`

###### B

`B`

###### Parameters

###### f

(`a`) => `B`

###### Returns

> \<`E`\>(`fa`): [`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

###### Type Parameters

###### E

`E`

###### Parameters

###### fa

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

###### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

##### of()

> **of**: \<`A`\>(`a`) => [`Validation`](../type-aliases/Validation.md)\<`never`, `A`\>

###### Type Parameters

###### A

`A`

###### Parameters

###### a

`A`

###### Returns

[`Validation`](../type-aliases/Validation.md)\<`never`, `A`\>

### map()

> **map**: \<`A`, `B`\>(`f`) => \<`E`\>(`fa`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

> \<`E`\>(`fa`): [`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

##### Type Parameters

###### E

`E`

##### Parameters

###### fa

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

##### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

### mapFailure()

> **mapFailure**: \<`E`, `F`\>(`f`) => \<`A`\>(`fa`) => [`Validation`](../type-aliases/Validation.md)\<`F`, `A`\>

#### Type Parameters

##### E

`E`

##### F

`F`

#### Parameters

##### f

(`e`) => `F`

#### Returns

> \<`A`\>(`fa`): [`Validation`](../type-aliases/Validation.md)\<`F`, `A`\>

##### Type Parameters

###### A

`A`

##### Parameters

###### fa

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

##### Returns

[`Validation`](../type-aliases/Validation.md)\<`F`, `A`\>

### of()

> **of**: \<`A`\>(`a`) => [`Validation`](../type-aliases/Validation.md)\<`never`, `A`\>

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`never`, `A`\>

### semigroupArray()

> **semigroupArray**: \<`A`\>() => [`Semigroup`](../interfaces/Semigroup.md)\<`A`[]\>

#### Type Parameters

##### A

`A`

#### Returns

[`Semigroup`](../interfaces/Semigroup.md)\<`A`[]\>

### semigroupString

> **semigroupString**: [`Semigroup`](../interfaces/Semigroup.md)\<`string`\>

### success()

> **success**: \<`E`, `A`\>(`a`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Type Parameters

##### E

`E` = `never`

##### A

`A` = `unknown`

#### Parameters

##### a

`A`

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

### URI

> **URI**: `string` = `"Validation"`
