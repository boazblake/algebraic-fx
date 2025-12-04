[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / browserEnv

# Function: browserEnv()

> **browserEnv**(): [`DomEnv`](../type-aliases/DomEnv.md)

Defined in: [src/core/dom-env.ts:47](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/core/dom-env.ts#L47)

Construct a DomEnv from global browser objects.

Throws if called in a non-browser (SSR/Node) environment.

## Returns

[`DomEnv`](../type-aliases/DomEnv.md)
