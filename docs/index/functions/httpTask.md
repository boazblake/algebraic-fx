[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / httpTask

# Function: httpTask()

> **httpTask**\<`E`, `A`\>(`path`, `decode?`, `mapError?`): [`Reader`](../namespaces/Reader/interfaces/Reader.md)\<[`HttpEnv`](../type-aliases/HttpEnv.md), [`Task`](../namespaces/Task/interfaces/Task.md)\<[`DefaultHttpError`](../type-aliases/DefaultHttpError.md) \| `E`, `A`\>\>

Defined in: [helpers/http-task.ts:59](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/helpers/http-task.ts#L59)

HTTP helper producing Reader<HttpEnv, Task<E | DefaultHttpError, A>>

Semantics:
- Reader injects HttpEnv
- Task MAY fail
- Errors are DATA (not Msg)
- No dispatching here

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
