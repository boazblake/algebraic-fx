[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / ReaderModule

# Variable: ReaderModule

> `const` **ReaderModule**: `object`

Defined in: [adt/reader.ts:134](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/reader.ts#L134)

## Type Declaration

### \[fl\_of\]()

> `readonly` **\[fl\_of\]**: \<`R`, `A`\>(`a`) => [`Reader`](../interfaces/Reader.md)\<`R`, `A`\> = `of`

#### Type Parameters

##### R

`R`

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Reader`](../interfaces/Reader.md)\<`R`, `A`\>

### ap()

> `readonly` **ap**: \<`R`, `A`, `B`\>(`fab`, `fa`) => [`Reader`](../interfaces/Reader.md)\<`R`, `B`\>

#### Type Parameters

##### R

`R`

##### A

`A`

##### B

`B`

#### Parameters

##### fab

[`Reader`](../interfaces/Reader.md)\<`R`, (`a`) => `B`\>

##### fa

[`Reader`](../interfaces/Reader.md)\<`R`, `A`\>

#### Returns

[`Reader`](../interfaces/Reader.md)\<`R`, `B`\>

### chain()

> `readonly` **chain**: \<`R`, `A`, `B`\>(`fa`, `f`) => [`Reader`](../interfaces/Reader.md)\<`R`, `B`\>

#### Type Parameters

##### R

`R`

##### A

`A`

##### B

`B`

#### Parameters

##### fa

[`Reader`](../interfaces/Reader.md)\<`R`, `A`\>

##### f

(`a`) => [`Reader`](../interfaces/Reader.md)\<`R`, `B`\>

#### Returns

[`Reader`](../interfaces/Reader.md)\<`R`, `B`\>

### map()

> `readonly` **map**: \<`R`, `A`, `B`\>(`fa`, `f`) => [`Reader`](../interfaces/Reader.md)\<`R`, `B`\>

#### Type Parameters

##### R

`R`

##### A

`A`

##### B

`B`

#### Parameters

##### fa

[`Reader`](../interfaces/Reader.md)\<`R`, `A`\>

##### f

(`a`) => `B`

#### Returns

[`Reader`](../interfaces/Reader.md)\<`R`, `B`\>

### of()

> **of**: \<`R`, `A`\>(`a`) => [`Reader`](../interfaces/Reader.md)\<`R`, `A`\>

#### Type Parameters

##### R

`R`

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Reader`](../interfaces/Reader.md)\<`R`, `A`\>

### URI

> `readonly` **URI**: `"Reader"` = `"Reader"`
