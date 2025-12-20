[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Validation](../README.md) / getValidationApplicative

# Function: getValidationApplicative()

> **getValidationApplicative**\<`E`\>(`S`): `object`

Defined in: [adt/validation.ts:111](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/adt/validation.ts#L111)

## Type Parameters

### E

`E`

## Parameters

### S

[`Semigroup`](../interfaces/Semigroup.md)\<`E`\>

## Returns

`object`

### ap()

> **ap**: \<`A`, `B`\>(`fab`, `fa`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### fab

[`Validation`](../type-aliases/Validation.md)\<`E`, (`a`) => `B`\>

##### fa

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

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
