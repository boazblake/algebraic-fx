[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Either

# Type Alias: Either\<L, R\>

> **Either**\<`L`, `R`\> = `Left`\<`L`\> \| `Right`\<`R`\> & `object`

Defined in: [src/adt/either.ts:36](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/either.ts#L36)

Either<L, R> — Sum type representing success or failure.

Common use cases:
- Error handling without exceptions
- Parsing
- Validation pipelines

Semantics:
- Left = error / failure
- Right = success

## Type Declaration

### \[EitherBrand\]

> `readonly` **\[EitherBrand\]**: `true`

## Type Parameters

### L

`L`

### R

`R`
