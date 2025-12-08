[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / local

# Function: local()

> **local**\<`E`, `A`\>(`f`): (`r`) => [`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`\>

Defined in: [adt/reader.ts:120](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/reader.ts#L120)

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
