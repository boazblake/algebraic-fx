[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / HttpEnv

# Type Alias: HttpEnv

> **HttpEnv** = `object`

Defined in: [helpers/http-task.ts:35](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/helpers/http-task.ts#L35)

Environment required by httpTask.

This is intentionally minimal and must be supplied by the application.

## Properties

### baseUrl

> **baseUrl**: `string`

Defined in: [helpers/http-task.ts:37](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/helpers/http-task.ts#L37)

Base URL prepended to all request paths.

***

### fetch

> **fetch**: *typeof* `fetch`

Defined in: [helpers/http-task.ts:39](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/helpers/http-task.ts#L39)

Fetch implementation (usually window.fetch).
