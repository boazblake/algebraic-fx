[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / WSDefaultError

# Type Alias: WSDefaultError

> **WSDefaultError** = `object`

Defined in: [src/helpers/ws-task.ts:13](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/helpers/ws-task.ts#L13)

WebSocket connection as a Task.

- Runs a WebSocket handshake
- Resolves with Right<WebSocket> on success
- Resolves with Left<WSDefaultError> on failure/close
- Can be combined with Task.timeout() or Task.race()

## Properties

### code?

> `optional` **code**: `number`

Defined in: [src/helpers/ws-task.ts:15](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/helpers/ws-task.ts#L15)

***

### message

> **message**: `string`

Defined in: [src/helpers/ws-task.ts:14](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/helpers/ws-task.ts#L14)
