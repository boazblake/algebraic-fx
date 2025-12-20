[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / httpTask

# Function: httpTask()

> **httpTask**\<`E`, `A`\>(`path`, `decode?`, `mapError?`): [`Reader`](../namespaces/Reader/interfaces/Reader.md)\<[`HttpEnv`](../type-aliases/HttpEnv.md), [`Task`](../namespaces/Task/interfaces/Task.md)\<[`DefaultHttpError`](../type-aliases/DefaultHttpError.md) \| `E`, `A`\>\>

Defined in: [helpers/http-task.ts:79](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/helpers/http-task.ts#L79)

Construct an HTTP Task wrapped in a Reader.

IMPORTANT:
- httpTask DOES NOT dispatch messages.
- It returns Reader<Env, Task<E, A>>.
- The caller MUST map the Task result into Msg.

## Type Parameters

### E

`E` = `never`

Domain-specific decode error type

### A

`A` = `never`

Decoded success value

## Parameters

### path

`string`

Relative request path (appended to env.baseUrl)

### decode?

(`data`) => [`Either`](../namespaces/Either/type-aliases/Either.md)\<`E`, `A`\>

Optional decoder transforming JSON into Either<E, A>

### mapError?

(`err`) => [`DefaultHttpError`](../type-aliases/DefaultHttpError.md) \| `E`

Optional error mapper for DefaultHttpError or decode errors

## Returns

[`Reader`](../namespaces/Reader/interfaces/Reader.md)\<[`HttpEnv`](../type-aliases/HttpEnv.md), [`Task`](../namespaces/Task/interfaces/Task.md)\<[`DefaultHttpError`](../type-aliases/DefaultHttpError.md) \| `E`, `A`\>\>

Reader that produces a Task when run with HttpEnv

## Example

```ts
const fetchUsers =
  httpTask("/users", decodeUsers)
    .map(task =>
      task.map(users => ({ type: "UsersFetched", users }))
    );
```
