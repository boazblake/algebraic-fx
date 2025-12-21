[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / StateModule

# Variable: StateModule

> `const` **StateModule**: `object`

Defined in: [adt/state.ts:84](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/state.ts#L84)

## Type Declaration

### \[fl\_ap\]()

> **\[fl\_ap\]**: (`sf`) => (`sa`) => [`State`](../interfaces/State.md)\<`any`, `any`\>

#### Parameters

##### sf

[`State`](../interfaces/State.md)\<`any`, (`a`) => `any`\>

#### Returns

> (`sa`): [`State`](../interfaces/State.md)\<`any`, `any`\>

##### Parameters

###### sa

[`State`](../interfaces/State.md)\<`any`, `any`\>

##### Returns

[`State`](../interfaces/State.md)\<`any`, `any`\>

### \[fl\_chain\]()

> **\[fl\_chain\]**: (`f`) => (`sa`) => [`State`](../interfaces/State.md)\<`any`, `any`\>

#### Parameters

##### f

(`a`) => [`State`](../interfaces/State.md)\<`any`, `any`\>

#### Returns

> (`sa`): [`State`](../interfaces/State.md)\<`any`, `any`\>

##### Parameters

###### sa

[`State`](../interfaces/State.md)\<`any`, `any`\>

##### Returns

[`State`](../interfaces/State.md)\<`any`, `any`\>

### \[fl\_map\]()

> **\[fl\_map\]**: (`f`) => (`sa`) => [`State`](../interfaces/State.md)\<`unknown`, `any`\>

#### Parameters

##### f

(`a`) => `any`

#### Returns

> (`sa`): [`State`](../interfaces/State.md)\<`unknown`, `any`\>

##### Parameters

###### sa

[`State`](../interfaces/State.md)\<`any`, `any`\>

##### Returns

[`State`](../interfaces/State.md)\<`unknown`, `any`\>

### \[fl\_of\]()

> **\[fl\_of\]**: \<`S`, `A`\>(`a`) => [`State`](../interfaces/State.md)\<`S`, `A`\> = `of`

#### Type Parameters

##### S

`S`

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`State`](../interfaces/State.md)\<`S`, `A`\>

### ap()

> **ap**: \<`S`, `A`, `B`\>(`sf`) => (`sa`) => [`State`](../interfaces/State.md)\<`S`, `B`\>

#### Type Parameters

##### S

`S`

##### A

`A`

##### B

`B`

#### Parameters

##### sf

[`State`](../interfaces/State.md)\<`S`, (`a`) => `B`\>

#### Returns

> (`sa`): [`State`](../interfaces/State.md)\<`S`, `B`\>

##### Parameters

###### sa

[`State`](../interfaces/State.md)\<`S`, `A`\>

##### Returns

[`State`](../interfaces/State.md)\<`S`, `B`\>

### chain()

> **chain**: \<`S`, `A`, `B`\>(`f`) => (`sa`) => [`State`](../interfaces/State.md)\<`S`, `B`\>

#### Type Parameters

##### S

`S`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`State`](../interfaces/State.md)\<`S`, `B`\>

#### Returns

> (`sa`): [`State`](../interfaces/State.md)\<`S`, `B`\>

##### Parameters

###### sa

[`State`](../interfaces/State.md)\<`S`, `A`\>

##### Returns

[`State`](../interfaces/State.md)\<`S`, `B`\>

### evalState()

> **evalState**: \<`S`, `A`\>(`sa`, `s`) => `A`

#### Type Parameters

##### S

`S`

##### A

`A`

#### Parameters

##### sa

[`State`](../interfaces/State.md)\<`S`, `A`\>

##### s

`S`

#### Returns

`A`

### execState()

> **execState**: \<`S`, `A`\>(`sa`, `s`) => `S`

#### Type Parameters

##### S

`S`

##### A

`A`

#### Parameters

##### sa

[`State`](../interfaces/State.md)\<`S`, `A`\>

##### s

`S`

#### Returns

`S`

### get()

> **get**: \<`S`\>() => [`State`](../interfaces/State.md)\<`S`, `S`\>

#### Type Parameters

##### S

`S`

#### Returns

[`State`](../interfaces/State.md)\<`S`, `S`\>

### isState()

> **isState**: (`u`) => `u is State<any, any>`

#### Parameters

##### u

`unknown`

#### Returns

`u is State<any, any>`

### map()

> **map**: \<`S`, `A`, `B`\>(`f`) => (`sa`) => [`State`](../interfaces/State.md)\<`S`, `B`\>

#### Type Parameters

##### S

`S`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

> (`sa`): [`State`](../interfaces/State.md)\<`S`, `B`\>

##### Parameters

###### sa

[`State`](../interfaces/State.md)\<`S`, `A`\>

##### Returns

[`State`](../interfaces/State.md)\<`S`, `B`\>

### modify()

> **modify**: \<`S`\>(`f`) => [`State`](../interfaces/State.md)\<`S`, `void`\>

#### Type Parameters

##### S

`S`

#### Parameters

##### f

(`s`) => `S`

#### Returns

[`State`](../interfaces/State.md)\<`S`, `void`\>

### of()

> **of**: \<`S`, `A`\>(`a`) => [`State`](../interfaces/State.md)\<`S`, `A`\>

#### Type Parameters

##### S

`S`

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`State`](../interfaces/State.md)\<`S`, `A`\>

### put()

> **put**: \<`S`\>(`s`) => [`State`](../interfaces/State.md)\<`S`, `void`\>

#### Type Parameters

##### S

`S`

#### Parameters

##### s

`S`

#### Returns

[`State`](../interfaces/State.md)\<`S`, `void`\>

### URI

> **URI**: `string` = `"State"`
