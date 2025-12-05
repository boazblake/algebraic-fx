[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Either

# Type Alias: Either\<L, R\>

> **Either**\<`L`, `R`\> = `Left`\<`L`\> \| `Right`\<`R`\> & `object`

Defined in: [src/adt/either.ts:36](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/either.ts#L36)

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
