[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / DefaultHttpError

# Type Alias: DefaultHttpError

> **DefaultHttpError** = `object`

Defined in: [helpers/http-task.ts:18](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/helpers/http-task.ts#L18)

Default structured HTTP error produced by httpTask.

All errors are normalized into this shape so callers do not
need to handle heterogeneous error types.

## Properties

### \_tag

> **\_tag**: `"DefaultHttpError"`

Defined in: [helpers/http-task.ts:19](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/helpers/http-task.ts#L19)

***

### cause?

> `optional` **cause**: `unknown`

Defined in: [helpers/http-task.ts:27](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/helpers/http-task.ts#L27)

Optional underlying error (for debugging).

***

### message

> **message**: `string`

Defined in: [helpers/http-task.ts:23](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/helpers/http-task.ts#L23)

Human-readable error message.

***

### status

> **status**: `number` \| `null`

Defined in: [helpers/http-task.ts:21](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/helpers/http-task.ts#L21)

HTTP status code, or null if unavailable (network / decode error).

***

### url

> **url**: `string`

Defined in: [helpers/http-task.ts:25](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/helpers/http-task.ts#L25)

Fully resolved request URL.
