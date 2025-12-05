[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Validation

# Type Alias: Validation\<E, A\>

> **Validation**\<`E`, `A`\> = `object` & `object` \| `object` & `object`

Defined in: [src/adt/validation.ts:20](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/validation.ts#L20)

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
