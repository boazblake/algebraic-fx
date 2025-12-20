[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / httpTask

# Function: httpTask()

> **httpTask**\<`E`, `A`\>(`path`, `decode?`, `mapError?`): [`Reader`](../namespaces/Reader/interfaces/Reader.md)\<[`HttpEnv`](../type-aliases/HttpEnv.md), [`Task`](../namespaces/Task/interfaces/Task.md)\<[`DefaultHttpError`](../type-aliases/DefaultHttpError.md) \| `E`, `A`\>\>

Defined in: [helpers/http-task.ts:37](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/helpers/http-task.ts#L37)

## Type Parameters

### E

`E` = `never`

### A

`A` = `never`

## Parameters

### path

`string`

### decode?

(`data`) => [`Either`](../namespaces/Either/type-aliases/Either.md)\<`E`, `A`\>

### mapError?

(`err`) => [`DefaultHttpError`](../type-aliases/DefaultHttpError.md) \| `E`

## Returns

[`Reader`](../namespaces/Reader/interfaces/Reader.md)\<[`HttpEnv`](../type-aliases/HttpEnv.md), [`Task`](../namespaces/Task/interfaces/Task.md)\<[`DefaultHttpError`](../type-aliases/DefaultHttpError.md) \| `E`, `A`\>\>
