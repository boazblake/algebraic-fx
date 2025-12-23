[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / State

# Interface: State\<S, A\>

Defined in: [adt/state.ts:3](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/state.ts#L3)

## Type Parameters

### S

`S`

### A

`A`

## Properties

### \_tag

> `readonly` **\_tag**: `"State"`

Defined in: [adt/state.ts:4](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/state.ts#L4)

***

### \[fl\_ap\]()

> `readonly` **\[fl\_ap\]**: \<`B`\>(`sf`) => `State`\<`S`, `B`\>

Defined in: [adt/state.ts:9](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/state.ts#L9)

#### Type Parameters

##### B

`B`

#### Parameters

##### sf

`State`\<`S`, (`a`) => `B`\>

#### Returns

`State`\<`S`, `B`\>

***

### \[fl\_chain\]()

> `readonly` **\[fl\_chain\]**: \<`B`\>(`f`) => `State`\<`S`, `B`\>

Defined in: [adt/state.ts:8](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/state.ts#L8)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `State`\<`S`, `B`\>

#### Returns

`State`\<`S`, `B`\>

***

### \[fl\_map\]()

> `readonly` **\[fl\_map\]**: \<`B`\>(`f`) => `State`\<`S`, `B`\>

Defined in: [adt/state.ts:7](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/state.ts#L7)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`State`\<`S`, `B`\>

***

### run()

> `readonly` **run**: (`s`) => \[`A`, `S`\]

Defined in: [adt/state.ts:5](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/state.ts#L5)

#### Parameters

##### s

`S`

#### Returns

\[`A`, `S`\]
