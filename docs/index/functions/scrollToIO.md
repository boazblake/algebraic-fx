[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / scrollToIO

# Function: scrollToIO()

> **scrollToIO**(`x`, `y`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`void`\>\>

Defined in: [src/helpers/dom-helpers.ts:111](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/helpers/dom-helpers.ts#L111)

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
