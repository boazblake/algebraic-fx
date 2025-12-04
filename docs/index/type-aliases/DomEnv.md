[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / DomEnv

# Type Alias: DomEnv

> **DomEnv** = `object`

Defined in: [src/core/dom-env.ts:19](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/dom-env.ts#L19)

Environment contract for DOM-based applications.

All fields are provided by `browserEnv()`, which throws in SSR.

## Properties

### document

> **document**: `Document`

Defined in: [src/core/dom-env.ts:20](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/dom-env.ts#L20)

***

### fetch

> **fetch**: *typeof* `fetch`

Defined in: [src/core/dom-env.ts:24](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/dom-env.ts#L24)

***

### localStorage

> **localStorage**: `Storage`

Defined in: [src/core/dom-env.ts:22](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/dom-env.ts#L22)

***

### sessionStorage

> **sessionStorage**: `Storage`

Defined in: [src/core/dom-env.ts:23](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/dom-env.ts#L23)

***

### window

> **window**: `Window`

Defined in: [src/core/dom-env.ts:21](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/dom-env.ts#L21)
