[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Either

# Type Alias: Either\<L, R\>

> **Either**\<`L`, `R`\> = `Left`\<`L`\> \| `Right`\<`R`\> & `object`

Defined in: [src/adt/either.ts:36](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/either.ts#L36)

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
