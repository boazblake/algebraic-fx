[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Validation

# Type Alias: Validation\<E, A\>

> **Validation**\<`E`, `A`\> = `object` & `object` \| `object` & `object`

Defined in: [src/adt/validation.ts:20](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/validation.ts#L20)

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
