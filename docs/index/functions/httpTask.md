[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / httpTask

# Function: httpTask()

Create an HTTP request Task inside a Reader<HttpEnv,_>.

## Param

URL path (resolved against baseUrl)

## Param

Fetch options (optional)

## Param

Optional mapper to convert default errors to user-defined errors

## Example

```ts
const getUser = httpTask<User>("/users/1");
getUser.run(httpEnv).runWith(signal);
```

## Call Signature

> **httpTask**\<`A`\>(`path`, `options?`): [`Reader`](../type-aliases/Reader.md)\<[`HttpEnv`](../type-aliases/HttpEnv.md), [`Task`](../type-aliases/Task.md)\<[`DefaultHttpError`](../type-aliases/DefaultHttpError.md), `A`\>\>

Defined in: [src/helpers/http-task.ts:39](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/helpers/http-task.ts#L39)

### Type Parameters

#### A

`A` = `unknown`

### Parameters

#### path

`string`

#### options?

`RequestInit`

### Returns

[`Reader`](../type-aliases/Reader.md)\<[`HttpEnv`](../type-aliases/HttpEnv.md), [`Task`](../type-aliases/Task.md)\<[`DefaultHttpError`](../type-aliases/DefaultHttpError.md), `A`\>\>

## Call Signature

> **httpTask**\<`E`, `A`\>(`path`, `options`, `handleError`): [`Reader`](../type-aliases/Reader.md)\<[`HttpEnv`](../type-aliases/HttpEnv.md), [`Task`](../type-aliases/Task.md)\<`E`, `A`\>\>

Defined in: [src/helpers/http-task.ts:44](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/helpers/http-task.ts#L44)

### Type Parameters

#### E

`E`

#### A

`A`

### Parameters

#### path

`string`

#### options

`RequestInit` | `undefined`

#### handleError

(`e`) => `E`

### Returns

[`Reader`](../type-aliases/Reader.md)\<[`HttpEnv`](../type-aliases/HttpEnv.md), [`Task`](../type-aliases/Task.md)\<`E`, `A`\>\>
