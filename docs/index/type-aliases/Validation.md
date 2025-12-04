[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Validation

# Type Alias: Validation\<E, A\>

> **Validation**\<`E`, `A`\> = `object` & `object` \| `object` & `object`

Defined in: [src/adt/validation.ts:20](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/validation.ts#L20)

Validation<E, A> represents a computation that may succeed (`Success<A>`)
or fail (`Failure<E[]>`). Unlike Either:

- Validation supports *parallel* error accumulation via `ap`, `combine`,
  `traverse`, and `sequence`.
- `chain` behaves like Either and short-circuits.

Typical use cases:
- form validation
- configuration validation
- batch data validation

## Type Parameters

### E

`E`

### A

`A`
