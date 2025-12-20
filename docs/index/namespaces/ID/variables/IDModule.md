[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [ID](../README.md) / IDModule

# Variable: IDModule

> `const` **IDModule**: `object`

Defined in: [adt/id.ts:73](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/adt/id.ts#L73)

## Type Declaration

### \[fl\_ap\]()

> **\[fl\_ap\]**: (`fab`) => (`fa`) => [`Identity`](../interfaces/Identity.md)\<`any`\>

#### Parameters

##### fab

[`Identity`](../interfaces/Identity.md)\<(`a`) => `any`\>

#### Returns

> (`fa`): [`Identity`](../interfaces/Identity.md)\<`any`\>

##### Parameters

###### fa

[`Identity`](../interfaces/Identity.md)\<`any`\>

##### Returns

[`Identity`](../interfaces/Identity.md)\<`any`\>

### \[fl\_chain\]()

> **\[fl\_chain\]**: (`f`) => (`fa`) => [`Identity`](../interfaces/Identity.md)\<`any`\>

#### Parameters

##### f

`any`

#### Returns

> (`fa`): [`Identity`](../interfaces/Identity.md)\<`any`\>

##### Parameters

###### fa

[`Identity`](../interfaces/Identity.md)\<`any`\>

##### Returns

[`Identity`](../interfaces/Identity.md)\<`any`\>

### \[fl\_map\]()

> **\[fl\_map\]**: (`f`) => (`fa`) => [`Identity`](../interfaces/Identity.md)\<`any`\>

#### Parameters

##### f

`any`

#### Returns

> (`fa`): [`Identity`](../interfaces/Identity.md)\<`any`\>

##### Parameters

###### fa

[`Identity`](../interfaces/Identity.md)\<`any`\>

##### Returns

[`Identity`](../interfaces/Identity.md)\<`any`\>

### \[fl\_of\]()

> **\[fl\_of\]**: (`a`) => [`Identity`](../interfaces/Identity.md)\<`any`\>

#### Parameters

##### a

`any`

#### Returns

[`Identity`](../interfaces/Identity.md)\<`any`\>

### ap()

> **ap**: \<`A`, `B`\>(`fab`, `fa`) => [`Identity`](../interfaces/Identity.md)\<`B`\>

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### fab

[`Identity`](../interfaces/Identity.md)\<(`a`) => `B`\>

##### fa

[`Identity`](../interfaces/Identity.md)\<`A`\>

#### Returns

[`Identity`](../interfaces/Identity.md)\<`B`\>

### chain()

> **chain**: \<`A`, `B`\>(`fa`, `f`) => [`Identity`](../interfaces/Identity.md)\<`B`\>

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### fa

[`Identity`](../interfaces/Identity.md)\<`A`\>

##### f

(`a`) => [`Identity`](../interfaces/Identity.md)\<`B`\>

#### Returns

[`Identity`](../interfaces/Identity.md)\<`B`\>

### isID()

> **isID**: (`u`) => `u is Identity<unknown>`

#### Parameters

##### u

`unknown`

#### Returns

`u is Identity<unknown>`

### map()

> **map**: \<`A`, `B`\>(`fa`, `f`) => [`Identity`](../interfaces/Identity.md)\<`B`\>

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### fa

[`Identity`](../interfaces/Identity.md)\<`A`\>

##### f

(`a`) => `B`

#### Returns

[`Identity`](../interfaces/Identity.md)\<`B`\>

### of()

> **of**: \<`A`\>(`a`) => [`Identity`](../interfaces/Identity.md)\<`A`\>

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Identity`](../interfaces/Identity.md)\<`A`\>

### URI

> **URI**: `string` = `"ID"`
