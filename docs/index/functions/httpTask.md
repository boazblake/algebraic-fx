[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / httpTask

# Function: httpTask()

> **httpTask**\<`Msg`\>(`path`, `onSuccess`, `onError`): [`Reader`](../namespaces/Reader/interfaces/Reader.md)\<[`HttpEnv`](../type-aliases/HttpEnv.md), [`Task`](../namespaces/Task/interfaces/Task.md)\<`never`, `Msg`\>\>

Defined in: [helpers/http-task.ts:37](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/helpers/http-task.ts#L37)

HTTP effect that ALWAYS resolves to a Msg.

- Reader injects HttpEnv
- Task NEVER fails (E = never)
- All failures are mapped into Msg in the Promise itself

## Type Parameters

### Msg

`Msg`

## Parameters

### path

`string`

### onSuccess

(`data`) => `Msg`

### onError

(`err`) => `Msg`

## Returns

[`Reader`](../namespaces/Reader/interfaces/Reader.md)\<[`HttpEnv`](../type-aliases/HttpEnv.md), [`Task`](../namespaces/Task/interfaces/Task.md)\<`never`, `Msg`\>\>
