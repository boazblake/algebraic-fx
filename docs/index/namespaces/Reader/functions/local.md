[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / local

# Function: local()

> **local**\<`E`, `A`\>(`f`): (`r`) => [`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`\>

Defined in: [src/adt/reader.ts:120](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/reader.ts#L120)

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
