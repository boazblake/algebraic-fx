[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Either

# Type Alias: Either\<L, R\>

> **Either**\<`L`, `R`\> = `Left`\<`L`\> \| `Right`\<`R`\> & `object`

Defined in: [adt/either.ts:40](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/either.ts#L40)

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
