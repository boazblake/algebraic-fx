[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / fx

# Function: fx()

> **fx**\<`Env`, `Msg`\>(`impl`): [`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:88](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/effects.ts#L88)

Construct a branded Effect.

Hides the internal brand and provides a safe constructor
for long-lived effects.

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Parameters

### impl

(`env`, `dispatch`) => `void` \| () => `void`

## Returns

[`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\>

## Example

```ts
fx((env, dispatch) => {
  const id = setInterval(() => dispatch({ type: "Tick" }), 1000)
  return () => clearInterval(id)
})
```
