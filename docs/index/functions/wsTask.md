[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / wsTask

# Function: wsTask()

> **wsTask**\<`E`\>(`url`, `onError?`): [`Reader`](../namespaces/Reader/interfaces/Reader.md)\<[`WebSocketEnv`](../type-aliases/WebSocketEnv.md), [`Task`](../namespaces/Task/interfaces/Task.md)\<`E`, `WebSocket`\>\>

Defined in: [helpers/ws-task.ts:44](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/helpers/ws-task.ts#L44)

Construct a Task that opens a WebSocket connection.

IMPORTANT:
- wsTask DOES NOT dispatch messages.
- It returns Reader<Env, Task<E, WebSocket>>.
- The caller MUST map the result into Msg if used as an effect.

## Type Parameters

### E

`E` = `unknown`

Error type produced on connection failure

## Parameters

### url

`string`

WebSocket URL

### onError?

(`err`) => `E`

Optional mapper for connection errors

## Returns

[`Reader`](../namespaces/Reader/interfaces/Reader.md)\<[`WebSocketEnv`](../type-aliases/WebSocketEnv.md), [`Task`](../namespaces/Task/interfaces/Task.md)\<`E`, `WebSocket`\>\>

Reader that produces a Task when run with WebSocketEnv

## Example

```ts
const connect =
  wsTask("/socket")
    .map(task =>
      task.map(ws => ({ type: "SocketOpened", ws }))
    );
```
