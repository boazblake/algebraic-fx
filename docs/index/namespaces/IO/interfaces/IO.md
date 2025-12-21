[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / IO

# Interface: IO\<A\>

Defined in: [adt/io.ts:4](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/io.ts#L4)

## Type Parameters

### A

`A`

## Properties

### \_tag

> `readonly` **\_tag**: `"IO"`

Defined in: [adt/io.ts:5](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/io.ts#L5)

***

### \[fl\_ap\]()

> `readonly` **\[fl\_ap\]**: \<`B`\>(`fa`) => `IO`\<`B`\>

Defined in: [adt/io.ts:10](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/io.ts#L10)

#### Type Parameters

##### B

`B`

#### Parameters

##### fa

`IO`\<`A`\>

#### Returns

`IO`\<`B`\>

***

### \[fl\_chain\]()

> `readonly` **\[fl\_chain\]**: \<`B`\>(`f`) => `IO`\<`B`\>

Defined in: [adt/io.ts:9](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/io.ts#L9)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `IO`\<`B`\>

#### Returns

`IO`\<`B`\>

***

### \[fl\_map\]()

> `readonly` **\[fl\_map\]**: \<`B`\>(`f`) => `IO`\<`B`\>

Defined in: [adt/io.ts:8](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/io.ts#L8)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`IO`\<`B`\>

***

### run()

> `readonly` **run**: () => `A`

Defined in: [adt/io.ts:6](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/io.ts#L6)

#### Returns

`A`
