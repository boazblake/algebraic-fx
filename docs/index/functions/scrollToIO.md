[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / scrollToIO

# Function: scrollToIO()

> **scrollToIO**(`x`, `y`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`void`\>\>

Defined in: [src/helpers/dom-helpers.ts:111](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/helpers/dom-helpers.ts#L111)

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
