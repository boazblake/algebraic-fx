[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Either

# Type Alias: Either\<L, R\>

> **Either**\<`L`, `R`\> = `Left`\<`L`\> \| `Right`\<`R`\> & `object`

Defined in: [adt/either.ts:36](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/either.ts#L36)

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
