[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / scrollToIO

# Function: scrollToIO()

> **scrollToIO**(`x`, `y`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`void`\>\>

Defined in: [src/helpers/dom-helpers.ts:111](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/helpers/dom-helpers.ts#L111)

Scroll the window to a given (x, y) offset.

Returned effect calls `window.scrollTo(x, y)` when executed.

## Parameters

### x

`number`

Horizontal scroll offset.

### y

`number`

Vertical scroll offset.

## Returns

[`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`void`\>\>

## Example

```ts
runDomIO(scrollToIO(0, 0), env);
```
