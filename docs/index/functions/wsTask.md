[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / wsTask

# Function: wsTask()

> **wsTask**\<`E`\>(`url`, `protocols?`, `onError?`): [`Task`](../type-aliases/Task.md)\<`E`, `WebSocket`\>

Defined in: [src/helpers/ws-task.ts:36](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/helpers/ws-task.ts#L36)

Create a Task that opens a WebSocket connection.

## Type Parameters

### E

`E` = [`WSDefaultError`](../type-aliases/WSDefaultError.md)

## Parameters

### url

`string`

WebSocket URL

### protocols?

Optional subprotocols

`string` | `string`[]

### onError?

(`err`) => `E`

Optional error mapper

## Returns

[`Task`](../type-aliases/Task.md)\<`E`, `WebSocket`\>

Task<E, WebSocket>

## Example

```ts
const connect = wsTask("wss://example.com/ws");
connect.run().then(ea => ea.fold(console.error, ws => ws.send("hello")));
```
