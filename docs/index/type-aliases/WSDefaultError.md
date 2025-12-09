[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / WSDefaultError

# Type Alias: WSDefaultError

> **WSDefaultError** = `object`

Defined in: [helpers/ws-task.ts:13](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/helpers/ws-task.ts#L13)

WebSocket connection as a Task.

- Runs a WebSocket handshake
- Resolves with Right<WebSocket> on success
- Resolves with Left<WSDefaultError> on failure/close
- Can be combined with Task.timeout() or Task.race()

## Properties

### code?

> `optional` **code**: `number`

Defined in: [helpers/ws-task.ts:15](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/helpers/ws-task.ts#L15)

***

### message

> **message**: `string`

Defined in: [helpers/ws-task.ts:14](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/helpers/ws-task.ts#L14)
