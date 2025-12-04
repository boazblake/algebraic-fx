[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / browserEnv

# Function: browserEnv()

> **browserEnv**(): [`DomEnv`](../type-aliases/DomEnv.md)

Defined in: [src/core/dom-env.ts:47](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/dom-env.ts#L47)

Construct a DomEnv from global browser objects.

Throws if called in a non-browser (SSR/Node) environment.

## Returns

[`DomEnv`](../type-aliases/DomEnv.md)
