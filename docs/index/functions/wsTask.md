[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / wsTask

# Function: wsTask()

> **wsTask**\<`E`\>(`url`, `protocols?`, `onError?`): [`Task`](../type-aliases/Task.md)\<`E`, `WebSocket`\>

Defined in: [helpers/ws-task.ts:36](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/helpers/ws-task.ts#L36)

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
