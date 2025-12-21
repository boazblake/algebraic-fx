[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / sub

# Function: sub()

> **sub**\<`Env`, `Msg`\>(`key`, `impl`): [`Subscription`](../type-aliases/Subscription.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:133](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/effects.ts#L133)

Construct a Subscription.

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Parameters

### key

`string`

Stable identity for the subscription

### impl

(`env`, `dispatch`) => `void` \| () => `void`

Effect body (may return cleanup)

## Returns

[`Subscription`](../type-aliases/Subscription.md)\<`Env`, `Msg`\>

## Example

```ts
sub("clock", (env, dispatch) => {
  const id = setInterval(() => dispatch({ type: "Tick" }), 1000)
  return () => clearInterval(id)
})
```
