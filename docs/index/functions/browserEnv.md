[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / browserEnv

# Function: browserEnv()

> **browserEnv**(): [`DomEnv`](../type-aliases/DomEnv.md)

Defined in: [src/core/dom-env.ts:47](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/core/dom-env.ts#L47)

Construct a DomEnv from global browser objects.

Throws if called in a non-browser (SSR/Node) environment.

## Returns

[`DomEnv`](../type-aliases/DomEnv.md)
