[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Id

# Variable: Id

> **Id**: \{\<`A`\>(`a`): [`Id`](../type-aliases/Id.md)\<`A`\>; `ap`: (`fa`) => [`Id`](../type-aliases/Id.md)\<`B`\>; `chain`: (`id`) => [`Id`](../type-aliases/Id.md)\<`B`\>; `extract`: `A`; `map`: (`id`) => [`Id`](../type-aliases/Id.md)\<`B`\>; `of`: [`Id`](../type-aliases/Id.md)\<`A`\>; `run`: `A`; \}

Defined in: [src/adt/id.ts:22](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/id.ts#L22)

Identity constructor.

## Type Declaration

## Type Parameters

### A

`A`

## Parameters

### a

`A`

Wrapped value

## Returns

[`Id`](../type-aliases/Id.md)\<`A`\>

### ap()

> **ap**\<`A`, `B`\>(`fb`): (`fa`) => [`Id`](../type-aliases/Id.md)\<`B`\>

Point-free applicative apply.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### fb

[`Id`](../type-aliases/Id.md)\<(`a`) => `B`\>

#### Returns

> (`fa`): [`Id`](../type-aliases/Id.md)\<`B`\>

##### Parameters

###### fa

[`Id`](../type-aliases/Id.md)\<`A`\>

##### Returns

[`Id`](../type-aliases/Id.md)\<`B`\>

### chain()

> **chain**\<`A`, `B`\>(`f`): (`id`) => [`Id`](../type-aliases/Id.md)\<`B`\>

Point-free monadic chain.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Id`](../type-aliases/Id.md)\<`B`\>

#### Returns

> (`id`): [`Id`](../type-aliases/Id.md)\<`B`\>

##### Parameters

###### id

[`Id`](../type-aliases/Id.md)\<`A`\>

##### Returns

[`Id`](../type-aliases/Id.md)\<`B`\>

### extract()

> **extract**\<`A`\>(`id`): `A`

Alias for `run`.

#### Type Parameters

##### A

`A`

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)\<`A`\>

#### Returns

`A`

### map()

> **map**\<`A`, `B`\>(`f`): (`id`) => [`Id`](../type-aliases/Id.md)\<`B`\>

Point-free functor map.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

> (`id`): [`Id`](../type-aliases/Id.md)\<`B`\>

##### Parameters

###### id

[`Id`](../type-aliases/Id.md)\<`A`\>

##### Returns

[`Id`](../type-aliases/Id.md)\<`B`\>

### of()

> **of**\<`A`\>(`a`): [`Id`](../type-aliases/Id.md)\<`A`\>

Lift a pure value into the Identity monad.

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Id`](../type-aliases/Id.md)\<`A`\>

### run()

> **run**\<`A`\>(`id`): `A`

Execute and retrieve the wrapped value.

#### Type Parameters

##### A

`A`

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)\<`A`\>

#### Returns

`A`
