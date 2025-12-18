[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / ioModule

# Variable: ioModule

> `const` **ioModule**: `object`

Defined in: [adt/io.ts:67](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/io.ts#L67)

## Type Declaration

## Index Signature

\[`key`: `number`\]: \<`A`\>(`a`) => [`IO`](../interfaces/IO.md)\<`A`\>

### ap()

> `readonly` **ap**: \<`A`, `B`\>(`fab`, `fa`) => [`IO`](../interfaces/IO.md)\<`B`\>

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### fab

[`IO`](../interfaces/IO.md)\<(`a`) => `B`\>

##### fa

[`IO`](../interfaces/IO.md)\<`A`\>

#### Returns

[`IO`](../interfaces/IO.md)\<`B`\>

### chain()

> `readonly` **chain**: \<`A`, `B`\>(`fa`, `f`) => [`IO`](../interfaces/IO.md)\<`B`\>

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### fa

[`IO`](../interfaces/IO.md)\<`A`\>

##### f

(`a`) => [`IO`](../interfaces/IO.md)\<`B`\>

#### Returns

[`IO`](../interfaces/IO.md)\<`B`\>

### map()

> `readonly` **map**: \<`A`, `B`\>(`fa`, `f`) => [`IO`](../interfaces/IO.md)\<`B`\>

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### fa

[`IO`](../interfaces/IO.md)\<`A`\>

##### f

(`a`) => `B`

#### Returns

[`IO`](../interfaces/IO.md)\<`B`\>

### of()

> **of**: \<`A`\>(`a`) => [`IO`](../interfaces/IO.md)\<`A`\>

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`IO`](../interfaces/IO.md)\<`A`\>

### URI

> `readonly` **URI**: `"IO"` = `IO_URI`
