[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / fx

# Function: fx()

> **fx**\<`Env`, `Msg`\>(`impl`): [`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:78](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/core/effects.ts#L78)

Construct a branded Effect.

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
const eff = fx((env, dispatch) => {
  const id = env.window.setInterval(() => dispatch({ type: "tick" }), 1000);
  return () => env.window.clearInterval(id);
});
```
