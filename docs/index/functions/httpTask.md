[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / httpTask

# Function: httpTask()

Construct a Reader<HttpEnv, Task<E,A>> that performs a JSON HTTP request.

## Param

URL path (resolved against HttpEnv.baseUrl if present)

## Param

fetch options

## Param

optional mapper from DefaultHttpError | unknown to user E

## Call Signature

> **httpTask**\<`A`\>(`path`, `options?`): [`Reader`](../type-aliases/Reader.md)\<[`HttpEnv`](../type-aliases/HttpEnv.md), [`Task`](../type-aliases/Task.md)\<[`DefaultHttpError`](../type-aliases/DefaultHttpError.md), `A`\>\>

Defined in: [helpers/http-task.ts:34](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/helpers/http-task.ts#L34)

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

Defined in: [helpers/http-task.ts:39](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/helpers/http-task.ts#L39)

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
