[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / local

# Function: local()

> **local**\<`E1`, `E2`, `A`\>(`f`): (`r`) => [`Reader`](../../../type-aliases/Reader.md)\<`E1`, `A`\>

Defined in: [adt/reader.ts:134](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/reader.ts#L134)

Modify the environment for the duration of a Reader computation.

Transforms environment from E1 to E2, allowing the Reader to work with
a transformed environment.

Equivalent to:
   local : (e1 -> e2) -> Reader e2 a -> Reader e1 a

This is the CORRECTED version that allows transforming between different
environment types.

## Type Parameters

### E1

`E1`

### E2

`E2`

### A

`A`

## Parameters

### f

(`env`) => `E2`

## Returns

> (`r`): [`Reader`](../../../type-aliases/Reader.md)\<`E1`, `A`\>

### Parameters

#### r

[`Reader`](../../../type-aliases/Reader.md)\<`E2`, `A`\>

### Returns

[`Reader`](../../../type-aliases/Reader.md)\<`E1`, `A`\>

## Example

```ts
type Config = { dbUrl: string };
type ExtendedConfig = Config & { debug: boolean };

const readDb = Reader<Config, string>(env => env.dbUrl);
const withDebug = Reader.local<ExtendedConfig, Config, string>(
  env => ({ dbUrl: env.dbUrl })
)(readDb);

withDebug.run({ dbUrl: "localhost", debug: true }); // "localhost"
```
