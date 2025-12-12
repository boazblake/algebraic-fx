[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / State

# Variable: State

> **State**: \{\<`S`, `A`\>(`run`): [`State`](../type-aliases/State.md)\<`S`, `A`\>; `ap`: (`fa`) => [`State`](../type-aliases/State.md)\<`S`, `B`\>; `chain`: (`st`) => [`State`](../type-aliases/State.md)\<`S`, `B`\>; `evalState`: (`st`) => `A`; `execState`: (`st`) => `S`; `get`: [`State`](../type-aliases/State.md)\<`S`, `S`\>; `gets`: [`State`](../type-aliases/State.md)\<`S`, `A`\>; `map`: (`st`) => [`State`](../type-aliases/State.md)\<`S`, `B`\>; `modify`: [`State`](../type-aliases/State.md)\<`S`, `void`\>; `of`: [`State`](../type-aliases/State.md)\<`S`, `A`\>; `put`: [`State`](../type-aliases/State.md)\<`S`, `void`\>; `run`: (`st`) => \[`A`, `S`\]; `sequence`: [`State`](../type-aliases/State.md)\<`S`, `A`[]\>; `traverse`: (`arr`) => [`State`](../type-aliases/State.md)\<`S`, `B`[]\>; \}

Defined in: [adt/state.ts:25](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/state.ts#L25)

Construct a new State computation.

## Type Declaration

## Type Parameters

### S

`S`

### A

`A`

## Parameters

### run

(`s`) => \[`A`, `S`\]

A pure function `(state: S) => [result, newState]`

## Returns

[`State`](../type-aliases/State.md)\<`S`, `A`\>

### ap()

> **ap**\<`S`, `A`, `B`\>(`fb`): (`fa`) => [`State`](../type-aliases/State.md)\<`S`, `B`\>

Point-free applicative apply.

#### Type Parameters

##### S

`S`

##### A

`A`

##### B

`B`

#### Parameters

##### fb

[`State`](../type-aliases/State.md)\<`S`, (`a`) => `B`\>

#### Returns

> (`fa`): [`State`](../type-aliases/State.md)\<`S`, `B`\>

##### Parameters

###### fa

[`State`](../type-aliases/State.md)\<`S`, `A`\>

##### Returns

[`State`](../type-aliases/State.md)\<`S`, `B`\>

### chain()

> **chain**\<`S`, `A`, `B`\>(`f`): (`st`) => [`State`](../type-aliases/State.md)\<`S`, `B`\>

Point-free monadic chain.

#### Type Parameters

##### S

`S`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`State`](../type-aliases/State.md)\<`S`, `B`\>

#### Returns

> (`st`): [`State`](../type-aliases/State.md)\<`S`, `B`\>

##### Parameters

###### st

[`State`](../type-aliases/State.md)\<`S`, `A`\>

##### Returns

[`State`](../type-aliases/State.md)\<`S`, `B`\>

### evalState()

> **evalState**\<`S`, `A`\>(`s`): (`st`) => `A`

Evaluate: run state and return only the result value.

#### Type Parameters

##### S

`S`

##### A

`A`

#### Parameters

##### s

`S`

#### Returns

> (`st`): `A`

##### Parameters

###### st

[`State`](../type-aliases/State.md)\<`S`, `A`\>

##### Returns

`A`

### execState()

> **execState**\<`S`, `A`\>(`s`): (`st`) => `S`

Execute: run state and return only the final state.

#### Type Parameters

##### S

`S`

##### A

`A`

#### Parameters

##### s

`S`

#### Returns

> (`st`): `S`

##### Parameters

###### st

[`State`](../type-aliases/State.md)\<`S`, `A`\>

##### Returns

`S`

### get()

> **get**\<`S`\>(): [`State`](../type-aliases/State.md)\<`S`, `S`\>

Retrieve the current state as the result value.

#### Type Parameters

##### S

`S`

#### Returns

[`State`](../type-aliases/State.md)\<`S`, `S`\>

### gets()

> **gets**\<`S`, `A`\>(`f`): [`State`](../type-aliases/State.md)\<`S`, `A`\>

Extract a value from the state using `f(state)`, without modifying it.

#### Type Parameters

##### S

`S`

##### A

`A`

#### Parameters

##### f

(`s`) => `A`

#### Returns

[`State`](../type-aliases/State.md)\<`S`, `A`\>

### map()

> **map**\<`S`, `A`, `B`\>(`f`): (`st`) => [`State`](../type-aliases/State.md)\<`S`, `B`\>

Point-free functor map.

#### Type Parameters

##### S

`S`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

> (`st`): [`State`](../type-aliases/State.md)\<`S`, `B`\>

##### Parameters

###### st

[`State`](../type-aliases/State.md)\<`S`, `A`\>

##### Returns

[`State`](../type-aliases/State.md)\<`S`, `B`\>

### modify()

> **modify**\<`S`\>(`f`): [`State`](../type-aliases/State.md)\<`S`, `void`\>

Modify the state using a pure function.

#### Type Parameters

##### S

`S`

#### Parameters

##### f

(`s`) => `S`

#### Returns

[`State`](../type-aliases/State.md)\<`S`, `void`\>

### of()

> **of**\<`S`, `A`\>(`a`): [`State`](../type-aliases/State.md)\<`S`, `A`\>

Lift a pure value into State, leaving the state unchanged.

#### Type Parameters

##### S

`S`

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`State`](../type-aliases/State.md)\<`S`, `A`\>

### put()

> **put**\<`S`\>(`s`): [`State`](../type-aliases/State.md)\<`S`, `void`\>

Replace the current state with `s`, returning no result value.

#### Type Parameters

##### S

`S`

#### Parameters

##### s

`S`

#### Returns

[`State`](../type-aliases/State.md)\<`S`, `void`\>

### run()

> **run**\<`S`, `A`\>(`s`): (`st`) => \[`A`, `S`\]

Run a State computation with initial state `s`.

#### Type Parameters

##### S

`S`

##### A

`A`

#### Parameters

##### s

`S`

#### Returns

> (`st`): \[`A`, `S`\]

##### Parameters

###### st

[`State`](../type-aliases/State.md)\<`S`, `A`\>

##### Returns

\[`A`, `S`\]

### sequence()

> **sequence**\<`S`, `A`\>(`states`): [`State`](../type-aliases/State.md)\<`S`, `A`[]\>

Sequence an array of State computations sequentially.

#### Type Parameters

##### S

`S`

##### A

`A`

#### Parameters

##### states

[`State`](../type-aliases/State.md)\<`S`, `A`\>[]

#### Returns

[`State`](../type-aliases/State.md)\<`S`, `A`[]\>

A State that returns array of results while threading state forward.

### traverse()

> **traverse**\<`S`, `A`, `B`\>(`f`): (`arr`) => [`State`](../type-aliases/State.md)\<`S`, `B`[]\>

Traverse an array using a function that returns a State.
Equivalent to: `State.sequence(arr.map(f))`.

#### Type Parameters

##### S

`S`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`State`](../type-aliases/State.md)\<`S`, `B`\>

#### Returns

> (`arr`): [`State`](../type-aliases/State.md)\<`S`, `B`[]\>

##### Parameters

###### arr

`A`[]

##### Returns

[`State`](../type-aliases/State.md)\<`S`, `B`[]\>
