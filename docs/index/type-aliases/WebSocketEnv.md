[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / WebSocketEnv

# Type Alias: WebSocketEnv

> **WebSocketEnv** = `object`

Defined in: [helpers/ws-task.ts:17](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/helpers/ws-task.ts#L17)

Environment required to construct WebSocket connections.

This is intentionally abstract to allow:
- browser WebSocket
- mocked WebSocket in tests
- custom implementations

## Properties

### makeWebSocket()

> **makeWebSocket**: (`url`) => `WebSocket`

Defined in: [helpers/ws-task.ts:19](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/helpers/ws-task.ts#L19)

Factory for creating a WebSocket instance.

#### Parameters

##### url

`string`

#### Returns

`WebSocket`
