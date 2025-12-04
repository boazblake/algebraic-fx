[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / State

# Type Alias: State\<S, A\>

> **State**\<`S`, `A`\> = `object`

Defined in: [src/adt/state.ts:25](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/state.ts#L25)

The State monad represents a pure state transition:

    State<S, A>  ≅  S → [A, S]

It is:
- Lazy: nothing runs until `.run(initialState)` is called
- Pure: no effects, only deterministic state threading
- Composable: supports map, chain, ap, sequence, traverse

Common uses:
- Pure parsers
- Reducer-style transformations
- Simulating local mutable state in a purely functional way

## Type Parameters

### S

`S`

State type

### A

`A`

Result value type

## Properties

### \[StateBrand\]

> `readonly` **\[StateBrand\]**: `true`

Defined in: [src/adt/state.ts:26](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/state.ts#L26)

***

### ap()

> **ap**: \<`B`\>(`fb`) => `State`\<`S`, `B`\>

Defined in: [src/adt/state.ts:44](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/state.ts#L44)

Applicative apply:
Apply a stateful function to a stateful value.

#### Type Parameters

##### B

`B`

#### Parameters

##### fb

`State`\<`S`, (`a`) => `B`\>

#### Returns

`State`\<`S`, `B`\>

***

### chain()

> **chain**: \<`B`\>(`f`) => `State`\<`S`, `B`\>

Defined in: [src/adt/state.ts:38](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/state.ts#L38)

Monad chain / flatMap:
Feed the result of this state transition into the next stateful computation.

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `State`\<`S`, `B`\>

#### Returns

`State`\<`S`, `B`\>

***

### map()

> **map**: \<`B`\>(`f`) => `State`\<`S`, `B`\>

Defined in: [src/adt/state.ts:32](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/state.ts#L32)

Functor map: transform the result value, leaving state threading untouched.

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

> **run**: (`s`) => \[`A`, `S`\]

Defined in: [src/adt/state.ts:29](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/state.ts#L29)

Execute the stateful computation starting from initial state `s`.

#### Parameters

##### s

`S`

#### Returns

\[`A`, `S`\]
