[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / Stream

# Interface: Stream\<A\>

Defined in: [adt/stream.ts:7](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/stream.ts#L7)

## Type Parameters

### A

`A`

## Properties

### \_tag

> `readonly` **\_tag**: `"Stream"`

Defined in: [adt/stream.ts:8](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/stream.ts#L8)

## Methods

### \[fl\_map\]()

> **\[fl\_map\]**\<`B`\>(`f`): `Stream`\<`B`\>

Defined in: [adt/stream.ts:15](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/stream.ts#L15)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`Stream`\<`B`\>

***

### filter()

> **filter**(`pred`): `Stream`\<`A`\>

Defined in: [adt/stream.ts:12](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/stream.ts#L12)

#### Parameters

##### pred

(`a`) => `boolean`

#### Returns

`Stream`\<`A`\>

***

### map()

> **map**\<`B`\>(`f`): `Stream`\<`B`\>

Defined in: [adt/stream.ts:11](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/stream.ts#L11)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`Stream`\<`B`\>

***

### scan()

> **scan**\<`B`\>(`f`, `initial`): `Stream`\<`B`\>

Defined in: [adt/stream.ts:13](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/stream.ts#L13)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`acc`, `a`) => `B`

##### initial

`B`

#### Returns

`Stream`\<`B`\>

***

### subscribe()

> **subscribe**(`listener`): [`Unsubscribe`](../type-aliases/Unsubscribe.md)

Defined in: [adt/stream.ts:9](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/stream.ts#L9)

#### Parameters

##### listener

[`Listener`](../type-aliases/Listener.md)\<`A`\>

#### Returns

[`Unsubscribe`](../type-aliases/Unsubscribe.md)
