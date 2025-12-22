[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / Stream

# Variable: Stream

> **Stream**: \<`A`\>(`subscribe`) => [`Stream`](../interfaces/Stream.md)\<`A`\> & `object`

Defined in: [adt/stream.ts:7](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/adt/stream.ts#L7)

## Type Declaration

### create()

> **create**\<`A`\>(): \[[`Stream`](../interfaces/Stream.md)\<`A`\>, (`value`) => `void`\]

#### Type Parameters

##### A

`A`

#### Returns

\[[`Stream`](../interfaces/Stream.md)\<`A`\>, (`value`) => `void`\]

### debounce()

> **debounce**\<`A`\>(`ms`): (`stream`) => [`Stream`](../interfaces/Stream.md)\<`A`\>

#### Type Parameters

##### A

`A`

#### Parameters

##### ms

`number`

#### Returns

> (`stream`): [`Stream`](../interfaces/Stream.md)\<`A`\>

##### Parameters

###### stream

[`Stream`](../interfaces/Stream.md)\<`A`\>

##### Returns

[`Stream`](../interfaces/Stream.md)\<`A`\>

### fromArray()

> **fromArray**\<`A`\>(`arr`): [`Stream`](../interfaces/Stream.md)\<`A`\>

#### Type Parameters

##### A

`A`

#### Parameters

##### arr

readonly `A`[]

#### Returns

[`Stream`](../interfaces/Stream.md)\<`A`\>

### new()

> **new**\<`A`\>(): [`Stream`](../interfaces/Stream.md)\<`A`\>

#### Type Parameters

##### A

`A`

#### Returns

[`Stream`](../interfaces/Stream.md)\<`A`\>
