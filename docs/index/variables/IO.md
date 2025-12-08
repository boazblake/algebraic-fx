[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / IO

# Variable: IO

> **IO**: \{\<`A`\>(`run`): [`IO`](../type-aliases/IO.md)\<`A`\>; `ap`: (`fa`) => [`IO`](../type-aliases/IO.md)\<`B`\>; `chain`: (`io`) => [`IO`](../type-aliases/IO.md)\<`B`\>; `map`: (`io`) => [`IO`](../type-aliases/IO.md)\<`B`\>; `of`: [`IO`](../type-aliases/IO.md)\<`A`\>; `run`: `A`; `sequence`: [`IO`](../type-aliases/IO.md)\<`A`[]\>; `traverse`: (`arr`) => [`IO`](../type-aliases/IO.md)\<`B`[]\>; `tryCatch`: [`IO`](../type-aliases/IO.md)\<`A`\>; \}

Defined in: [adt/io.ts:22](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/io.ts#L22)

Construct a new lazy IO effect.

## Type Declaration

## Type Parameters

### A

`A`

## Parameters

### run

() => `A`

A function describing the effect

## Returns

[`IO`](../type-aliases/IO.md)\<`A`\>

### ap()

> **ap**\<`A`, `B`\>(`fb`): (`fa`) => [`IO`](../type-aliases/IO.md)\<`B`\>

Point-free applicative apply.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### fb

[`IO`](../type-aliases/IO.md)\<(`a`) => `B`\>

#### Returns

> (`fa`): [`IO`](../type-aliases/IO.md)\<`B`\>

##### Parameters

###### fa

[`IO`](../type-aliases/IO.md)\<`A`\>

##### Returns

[`IO`](../type-aliases/IO.md)\<`B`\>

### chain()

> **chain**\<`A`, `B`\>(`f`): (`io`) => [`IO`](../type-aliases/IO.md)\<`B`\>

Point-free monadic chain.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`IO`](../type-aliases/IO.md)\<`B`\>

#### Returns

> (`io`): [`IO`](../type-aliases/IO.md)\<`B`\>

##### Parameters

###### io

[`IO`](../type-aliases/IO.md)\<`A`\>

##### Returns

[`IO`](../type-aliases/IO.md)\<`B`\>

### map()

> **map**\<`A`, `B`\>(`f`): (`io`) => [`IO`](../type-aliases/IO.md)\<`B`\>

Point-free functor map.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

> (`io`): [`IO`](../type-aliases/IO.md)\<`B`\>

##### Parameters

###### io

[`IO`](../type-aliases/IO.md)\<`A`\>

##### Returns

[`IO`](../type-aliases/IO.md)\<`B`\>

### of()

> **of**\<`A`\>(`a`): [`IO`](../type-aliases/IO.md)\<`A`\>

Lift a pure value into an IO, producing it when run().

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`IO`](../type-aliases/IO.md)\<`A`\>

### run()

> **run**\<`A`\>(`io`): `A`

Execute an IO and extract its value.

#### Type Parameters

##### A

`A`

#### Parameters

##### io

[`IO`](../type-aliases/IO.md)\<`A`\>

#### Returns

`A`

### sequence()

> **sequence**\<`A`\>(`ios`): [`IO`](../type-aliases/IO.md)\<`A`[]\>

Sequence an array of IO computations into a single IO that,
when run, returns an array of all results.

#### Type Parameters

##### A

`A`

#### Parameters

##### ios

[`IO`](../type-aliases/IO.md)\<`A`\>[]

#### Returns

[`IO`](../type-aliases/IO.md)\<`A`[]\>

### traverse()

> **traverse**\<`A`, `B`\>(`f`): (`arr`) => [`IO`](../type-aliases/IO.md)\<`B`[]\>

Traverse an array using a function returning IO.
Equivalent to: IO.sequence(arr.map(f))

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`IO`](../type-aliases/IO.md)\<`B`\>

#### Returns

> (`arr`): [`IO`](../type-aliases/IO.md)\<`B`[]\>

##### Parameters

###### arr

`A`[]

##### Returns

[`IO`](../type-aliases/IO.md)\<`B`[]\>

### tryCatch()

> **tryCatch**\<`A`\>(`f`, `onError`): [`IO`](../type-aliases/IO.md)\<`A`\>

Try-catch wrapper:
Safely execute a synchronous effect, mapping thrown errors.

#### Type Parameters

##### A

`A`

#### Parameters

##### f

() => `A`

Function that may throw

##### onError

(`e`) => `A`

Recovery handler mapping unknown errors into A

#### Returns

[`IO`](../type-aliases/IO.md)\<`A`\>
