[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Validation

# Variable: Validation

> **Validation**: `object`

Defined in: [src/adt/validation.ts:20](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/validation.ts#L20)

Namespace-style export object for ergonomic importing.

## Type Declaration

### alt()

> **alt**: \<`E`, `A`\>(`v1`, `v2`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

Alternative operator:
- returns the first Success
- if both are Failure, errors accumulate

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### v1

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

##### v2

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

### ap()

> **ap**: \<`E`, `A`, `B`\>(`vf`, `va`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

Applicative apply for Validation.

- If both function and value are failures, errors accumulate.
- If any side is Failure, that Failure is returned.
- If both are Success, applies the function to the value.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### vf

[`Validation`](../type-aliases/Validation.md)\<`E`, (`a`) => `B`\>

##### va

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

#### Example

```ts
ap(Success(x => x + 1), Success(2))     // Success(3)
ap(Failure(["e1"]), Failure(["e2"]))    // Failure(["e1", "e2"])
```

### bimap()

> **bimap**: \<`E`, `A`, `E2`, `B`\>(`onFailure`, `onSuccess`, `v`) => [`Validation`](../type-aliases/Validation.md)\<`E2`, `B`\>

Map over both Failure and Success branches.

#### Type Parameters

##### E

`E`

##### A

`A`

##### E2

`E2`

##### B

`B`

#### Parameters

##### onFailure

(`errs`) => `E2`[]

##### onSuccess

(`a`) => `B`

##### v

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E2`, `B`\>

### chain()

> **chain**: \<`E`, `A`, `B`\>(`f`, `v`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

Monad chain for Validation.

Important:
- `chain` *short-circuits* like Either, NOT accumulating errors.
  Use here only for sequential validation that should stop on the first error.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

##### v

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

### combine()

> **combine**: \<`E`, `A`\>(`validations`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`[]\>

Combine a list of Validations, accumulating ALL errors.

- If any failures exist → return `Failure(all errors)`
- Otherwise → return `Success(array of all values)`

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### validations

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>[]

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`[]\>

### fail()

> **fail**: \<`E`\>(`error`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `never`\>

Create a failure from a single error.

#### Type Parameters

##### E

`E`

#### Parameters

##### error

`E`

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `never`\>

### Failure()

> **Failure**: \<`E`\>(`errors`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `never`\>

Construct a failing Validation from an array of errors.

#### Type Parameters

##### E

`E`

#### Parameters

##### errors

`E`[]

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `never`\>

#### Example

```ts
Failure(["invalid email"])
```

### fold()

> **fold**: \<`E`, `A`, `B`\>(`onFail`, `onSucc`, `v`) => `B`

Pattern match on Validation.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### onFail

(`errs`) => `B`

Called with accumulated errors

##### onSucc

(`a`) => `B`

Called with the success value

##### v

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Returns

`B`

### fromPredicate()

> **fromPredicate**: \<`E`, `A`\>(`predicate`, `onFalse`) => (`a`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

Lift a predicate into Validation.

- If predicate holds → Success(a)
- If predicate fails → Failure([onFalse(a)])

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### predicate

(`a`) => `boolean`

##### onFalse

(`a`) => `E`

#### Returns

> (`a`): [`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

##### Parameters

###### a

`A`

##### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

### getOrElse()

> **getOrElse**: \<`E`, `A`\>(`defaultValue`, `v`) => `A`

Extract the success value or fall back to a default.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### defaultValue

`A`

##### v

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Returns

`A`

### getOrElseW()

> **getOrElseW**: \<`E`, `A`, `B`\>(`onFailure`, `v`) => `A` \| `B`

Extract the success value or compute a fallback based on the errors.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### onFailure

(`errs`) => `B`

##### v

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Returns

`A` \| `B`

### isFailure()

> **isFailure**: \<`E`, `A`\>(`v`) => `v is Validation<E, never>`

Type guard: check if Validation is Failure.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### v

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Returns

`v is Validation<E, never>`

### isSuccess()

> **isSuccess**: \<`E`, `A`\>(`v`) => `v is Validation<never, A>`

Type guard: check if Validation is Success.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### v

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Returns

`v is Validation<never, A>`

### map()

> **map**: \<`E`, `A`, `B`\>(`f`, `v`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

Functor map over a successful Validation.
If the value is `Success(a)`, returns `Success(f(a))`.
If `Failure`, returns unchanged.

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

##### v

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

### mapErrors()

> **mapErrors**: \<`E`, `A`, `E2`\>(`f`, `v`) => [`Validation`](../type-aliases/Validation.md)\<`E2`, `A`\>

Map only the error list.

#### Type Parameters

##### E

`E`

##### A

`A`

##### E2

`E2`

#### Parameters

##### f

(`errs`) => `E2`[]

##### v

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E2`, `A`\>

### of()

> **of**: \<`A`\>(`a`) => [`Validation`](../type-aliases/Validation.md)\<`never`, `A`\>

Lift a value into a successful Validation.

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`never`, `A`\>

### sequence()

> **sequence**: \<`E`, `A`\>(`arr`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `A`[]\>

Sequence an array of Validations.

Equivalent to: `traverse(x => x)`

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### arr

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`\>[]

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `A`[]\>

### Success()

> **Success**: \<`A`\>(`value`) => [`Validation`](../type-aliases/Validation.md)\<`never`, `A`\>

Construct a successful Validation containing a value.

#### Type Parameters

##### A

`A`

#### Parameters

##### value

`A`

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`never`, `A`\>

#### Example

```ts
Success(42)
```

### traverse()

> **traverse**: \<`E`, `A`, `B`\>(`f`, `arr`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `B`[]\>

Traverse an array, applying a Validation-producing function `f`.

- Accumulates ALL errors across the entire array.
- Equivalent to `Applicative` traversal.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Validation`](../type-aliases/Validation.md)\<`E`, `B`\>

##### arr

`A`[]

#### Returns

[`Validation`](../type-aliases/Validation.md)\<`E`, `B`[]\>

## Example

```ts
import { Validation } from "algebraic-fx/adt/validation";
```
