[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [ID](../README.md) / Identity

# Interface: Identity\<A\>

Defined in: [adt/id.ts:4](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/id.ts#L4)

## Type Parameters

### A

`A`

## Properties

### \_tag

> `readonly` **\_tag**: `"ID"`

Defined in: [adt/id.ts:5](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/id.ts#L5)

***

### \[fl\_ap\]()

> `readonly` **\[fl\_ap\]**: \<`B`\>(`fab`) => `Identity`\<`B`\>

Defined in: [adt/id.ts:15](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/id.ts#L15)

#### Type Parameters

##### B

`B`

#### Parameters

##### fab

`Identity`\<(`a`) => `B`\>

#### Returns

`Identity`\<`B`\>

***

### \[fl\_chain\]()

> `readonly` **\[fl\_chain\]**: \<`B`\>(`f`) => `Identity`\<`B`\>

Defined in: [adt/id.ts:14](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/id.ts#L14)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `Identity`\<`B`\>

#### Returns

`Identity`\<`B`\>

***

### \[fl\_map\]()

> `readonly` **\[fl\_map\]**: \<`B`\>(`f`) => `Identity`\<`B`\>

Defined in: [adt/id.ts:13](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/id.ts#L13)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`Identity`\<`B`\>

***

### ap()

> **ap**: \<`B`\>(`fab`) => `Identity`\<`B`\>

Defined in: [adt/id.ts:11](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/id.ts#L11)

#### Type Parameters

##### B

`B`

#### Parameters

##### fab

`Identity`\<(`a`) => `B`\>

#### Returns

`Identity`\<`B`\>

***

### chain()

> **chain**: \<`B`\>(`f`) => `Identity`\<`B`\>

Defined in: [adt/id.ts:10](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/id.ts#L10)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `Identity`\<`B`\>

#### Returns

`Identity`\<`B`\>

***

### map()

> **map**: \<`B`\>(`f`) => `Identity`\<`B`\>

Defined in: [adt/id.ts:9](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/id.ts#L9)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`Identity`\<`B`\>

***

### run()

> `readonly` **run**: () => `A`

Defined in: [adt/id.ts:7](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/id.ts#L7)

#### Returns

`A`

***

### value

> `readonly` **value**: `A`

Defined in: [adt/id.ts:6](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/id.ts#L6)
