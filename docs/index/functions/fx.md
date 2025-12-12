[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / fx

# Function: fx()

> **fx**\<`Env`, `Msg`, `Ret`\>(`run`): [`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\>

Defined in: [core/types.ts:169](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L169)

Effect construction helper.

Produces a concrete `Effect<Env, Msg>` instance while preserving full
type inference for:
  - `Env` — program environment
  - `Msg` — message union for the program
  - optional cleanup return value

This helper unifies effect creation across your application.

## Example

```ts
import { fx } from "algebraic-effects";

export const resizeEffect = fx<TVEnv, TVMsg>((env, dispatch) => {
  const onResize = () => dispatch({
    type: "RESIZE",
    msg: {
      width: env.window.innerWidth,
      height: env.window.innerHeight,
    }
  });

  env.window.addEventListener("resize", onResize);
  onResize();

  return () => env.window.removeEventListener("resize", onResize);
});
```

## Type Parameters

### Env

`Env`

### Msg

`Msg`

### Ret

`Ret` *extends* `void` \| () => `void` = `void` \| () => `void`

## Parameters

### run

(`env`, `dispatch`) => `Ret`

## Returns

[`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\>
