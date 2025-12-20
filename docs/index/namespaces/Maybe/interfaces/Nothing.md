[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Maybe](../README.md) / Nothing

# Interface: Nothing

Defined in: [adt/maybe.ts:18](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/adt/maybe.ts#L18)

## Extends

- `FLMethods`\<`never`\>

## Properties

### \_tag

> `readonly` **\_tag**: `"Nothing"`

Defined in: [adt/maybe.ts:19](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/adt/maybe.ts#L19)

***

### \[fl\_ap\]()

> `readonly` **\[fl\_ap\]**: \<`B`\>(`mf`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

Defined in: [adt/maybe.ts:9](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/adt/maybe.ts#L9)

#### Type Parameters

##### B

`B`

#### Parameters

##### mf

[`Maybe`](../type-aliases/Maybe.md)\<(`a`) => `B`\>

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`B`\>

#### Inherited from

`FLMethods.[fl_ap]`

***

### \[fl\_chain\]()

> `readonly` **\[fl\_chain\]**: \<`B`\>(`f`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

Defined in: [adt/maybe.ts:8](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/adt/maybe.ts#L8)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`B`\>

#### Inherited from

`FLMethods.[fl_chain]`

***

### \[fl\_map\]()

> `readonly` **\[fl\_map\]**: \<`B`\>(`f`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

Defined in: [adt/maybe.ts:7](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/adt/maybe.ts#L7)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`B`\>

#### Inherited from

`FLMethods.[fl_map]`

***

### \[fl\_of\]()

> `readonly` **\[fl\_of\]**: \<`B`\>(`b`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

Defined in: [adt/maybe.ts:10](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/adt/maybe.ts#L10)

#### Type Parameters

##### B

`B`

#### Parameters

##### b

`B`

#### Returns

[`Maybe`](../type-aliases/Maybe.md)\<`B`\>

#### Inherited from

`FLMethods.[fl_of]`
