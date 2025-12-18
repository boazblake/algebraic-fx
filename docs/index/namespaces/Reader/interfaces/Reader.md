[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / Reader

# Interface: Reader\<R, A\>

Defined in: [adt/reader.ts:8](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/reader.ts#L8)

## Type Parameters

### R

`R`

### A

`A`

## Indexable

\[`key`: `number`\]: \<`B`\>(`f`) => `Reader`\<`R`, `B`\> \| \<`B`\>(`f`) => `Reader`\<`R`, `B`\> \| \<`B`\>(`this`, `fa`) => `Reader`\<`R`, `B`\>

## Properties

### \_tag

> `readonly` **\_tag**: `"Reader"`

Defined in: [adt/reader.ts:9](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/reader.ts#L9)

***

### ap()

> `readonly` **ap**: \<`B`\>(`this`, `fa`) => `Reader`\<`R`, `B`\>

Defined in: [adt/reader.ts:15](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/reader.ts#L15)

#### Type Parameters

##### B

`B`

#### Parameters

##### this

`Reader`\<`R`, (`a`) => `B`\>

##### fa

`Reader`\<`R`, `any`\>

#### Returns

`Reader`\<`R`, `B`\>

***

### chain()

> `readonly` **chain**: \<`B`\>(`f`) => `Reader`\<`R`, `B`\>

Defined in: [adt/reader.ts:14](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/reader.ts#L14)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `Reader`\<`R`, `B`\>

#### Returns

`Reader`\<`R`, `B`\>

***

### map()

> `readonly` **map**: \<`B`\>(`f`) => `Reader`\<`R`, `B`\>

Defined in: [adt/reader.ts:13](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/reader.ts#L13)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`Reader`\<`R`, `B`\>

***

### run()

> `readonly` **run**: (`r`) => `A`

Defined in: [adt/reader.ts:10](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/reader.ts#L10)

#### Parameters

##### r

`R`

#### Returns

`A`
