[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / WebSocketEnv

# Type Alias: WebSocketEnv

> **WebSocketEnv** = `object`

Defined in: [helpers/ws-task.ts:17](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/helpers/ws-task.ts#L17)

Environment required to construct WebSocket connections.

This is intentionally abstract to allow:
- browser WebSocket
- mocked WebSocket in tests
- custom implementations

## Properties

### makeWebSocket()

> **makeWebSocket**: (`url`) => `WebSocket`

Defined in: [helpers/ws-task.ts:19](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/helpers/ws-task.ts#L19)

Factory for creating a WebSocket instance.

#### Parameters

##### url

`string`

#### Returns

`WebSocket`
