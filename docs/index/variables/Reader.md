[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Reader

# Variable: Reader

> **Reader**: \{\<`E`, `A`\>(`run`): [`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>; `ap`: (`fa`) => [`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>; `ask`: [`Reader`](../type-aliases/Reader.md)\<`E`, `E`\>; `asks`: [`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>; `chain`: (`r`) => [`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>; `local`: (`r`) => [`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>; `map`: (`r`) => [`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>; `of`: [`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>; `run`: (`r`) => `A`; `sequence`: [`Reader`](../type-aliases/Reader.md)\<`E`, `A`[]\>; `traverse`: (`arr`) => [`Reader`](../type-aliases/Reader.md)\<`E`, `B`[]\>; \}

Defined in: [src/adt/reader.ts:24](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/reader.ts#L24)

Construct a Reader from a function `(env: E) => A`.

## Type Declaration

## Type Parameters

### E

`E`

### A

`A`

## Parameters

### run

(`env`) => `A`

Environment-dependent computation

## Returns

[`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>

### ap()

> **ap**\<`E`, `A`, `B`\>(`fb`): (`fa`) => [`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>

Point-free applicative apply.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### fb

[`Reader`](../type-aliases/Reader.md)\<`E`, (`a`) => `B`\>

#### Returns

> (`fa`): [`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>

##### Parameters

###### fa

[`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>

##### Returns

[`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>

### ask()

> **ask**\<`E`\>(): [`Reader`](../type-aliases/Reader.md)\<`E`, `E`\>

Retrieve the entire environment.

Equivalent to `(env) => env`.

#### Type Parameters

##### E

`E`

#### Returns

[`Reader`](../type-aliases/Reader.md)\<`E`, `E`\>

### asks()

> **asks**\<`E`, `A`\>(`f`): [`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>

Extract a value from the environment using a projection function.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### f

(`env`) => `A`

#### Returns

[`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>

### chain()

> **chain**\<`E`, `A`, `B`\>(`f`): (`r`) => [`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>

Point-free chain.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>

#### Returns

> (`r`): [`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>

##### Parameters

###### r

[`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>

##### Returns

[`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>

### local()

> **local**\<`E`, `A`\>(`f`): (`r`) => [`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>

Modify the environment for the duration of a Reader computation.

Equivalent to:
   local : (env -> env) -> Reader env a -> Reader env a

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### f

(`env`) => `E`

#### Returns

> (`r`): [`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>

##### Parameters

###### r

[`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>

##### Returns

[`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>

#### Example

```ts
const withTestConfig = Reader.local(cfg => ({ ...cfg, test: true }));
```

### map()

> **map**\<`E`, `A`, `B`\>(`f`): (`r`) => [`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>

Point-free functor map.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

> (`r`): [`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>

##### Parameters

###### r

[`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>

##### Returns

[`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>

### of()

> **of**\<`E`, `A`\>(`a`): [`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>

Lift a pure value into a Reader that ignores the environment.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>

### run()

> **run**\<`E`, `A`\>(`env`): (`r`) => `A`

Run a Reader using a supplied environment.

Useful for point-free or curried styles.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### env

`E`

#### Returns

> (`r`): `A`

##### Parameters

###### r

[`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>

##### Returns

`A`

### sequence()

> **sequence**\<`E`, `A`\>(`readers`): [`Reader`](../type-aliases/Reader.md)\<`E`, `A`[]\>

Execute multiple Readers under the same environment.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### readers

[`Reader`](../type-aliases/Reader.md)\<`E`, `A`\>[]

#### Returns

[`Reader`](../type-aliases/Reader.md)\<`E`, `A`[]\>

A Reader that returns an array of results.

### traverse()

> **traverse**\<`E`, `A`, `B`\>(`f`): (`arr`) => [`Reader`](../type-aliases/Reader.md)\<`E`, `B`[]\>

Traverse an array using a Reader-producing function.

Equivalent to: `Reader.sequence(arr.map(f))`.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Reader`](../type-aliases/Reader.md)\<`E`, `B`\>

#### Returns

> (`arr`): [`Reader`](../type-aliases/Reader.md)\<`E`, `B`[]\>

##### Parameters

###### arr

`A`[]

##### Returns

[`Reader`](../type-aliases/Reader.md)\<`E`, `B`[]\>
