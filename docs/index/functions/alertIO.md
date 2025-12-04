[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / alertIO

# Function: alertIO()

> **alertIO**(`msg`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`void`\>\>

Defined in: [src/helpers/dom-helpers.ts:97](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/helpers/dom-helpers.ts#L97)

Display a browser alert dialog.

Returned effect runs `window.alert(message)` when executed.

## Parameters

### msg

`string`

Message to display.

## Returns

[`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`void`\>\>

## Example

```ts
runDomIO(alertIO("Hello!"), env);
```
