[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / Reader

# Interface: Reader\<R, A\>

Defined in: [adt/reader.ts:8](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/reader.ts#L8)

## Type Parameters

### R

`R`

### A

`A`

## Properties

### \_tag

> `readonly` **\_tag**: `"Reader"`

Defined in: [adt/reader.ts:9](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/reader.ts#L9)

***

### \[fl\_ap\]()

> `readonly` **\[fl\_ap\]**: \<`B`\>(`this`, `fa`) => `Reader`\<`R`, `B`\>

Defined in: [adt/reader.ts:23](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/reader.ts#L23)

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

### \[fl\_chain\]()

> `readonly` **\[fl\_chain\]**: \<`B`\>(`f`) => `Reader`\<`R`, `B`\>

Defined in: [adt/reader.ts:22](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/reader.ts#L22)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `Reader`\<`R`, `B`\>

#### Returns

`Reader`\<`R`, `B`\>

***

### \[fl\_map\]()

> `readonly` **\[fl\_map\]**: \<`B`\>(`f`) => `Reader`\<`R`, `B`\>

Defined in: [adt/reader.ts:21](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/reader.ts#L21)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`Reader`\<`R`, `B`\>

***

### ap()

> `readonly` **ap**: \<`B`\>(`this`, `fa`) => `Reader`\<`R`, `B`\>

Defined in: [adt/reader.ts:15](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/reader.ts#L15)

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

Defined in: [adt/reader.ts:14](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/reader.ts#L14)

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

Defined in: [adt/reader.ts:13](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/reader.ts#L13)

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

Defined in: [adt/reader.ts:10](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/reader.ts#L10)

#### Parameters

##### r

`R`

#### Returns

`A`
