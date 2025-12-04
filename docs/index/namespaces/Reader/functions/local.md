[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / local

# Function: local()

> **local**\<`E`, `A`\>(`f`): (`r`) => [`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`\>

Defined in: [src/adt/reader.ts:120](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/reader.ts#L120)

Modify the environment for the duration of a Reader computation.

Equivalent to:
   local : (env -> env) -> Reader env a -> Reader env a

## Type Parameters

### E

`E`

### A

`A`

## Parameters

### f

(`env`) => `E`

## Returns

> (`r`): [`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`\>

### Parameters

#### r

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`\>

### Returns

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`\>

## Example

```ts
const withTestConfig = Reader.local(cfg => ({ ...cfg, test: true }));
```
