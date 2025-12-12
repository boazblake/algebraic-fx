[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Payload

# Type Alias: Payload\<T, M\>

> **Payload**\<`T`, `M`\> = `object`

Defined in: [core/types.ts:100](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L100)

Canonical tagged-message format for algebraic-fx programs.

## Type Parameters

### T

`T` *extends* `string`

A string literal tag (ex: "Holdings.Add").

### M

`M` *extends* `object` = \{ \}

Message payload (default `{}`).

Messages follow a discriminated-union style:

```ts
type Msg =
  | Payload<"Holdings.Add">
  | Payload<"Holdings.SetTicker", { value: string }>;

dispatch({ type: "Holdings.SetTicker", msg: { value: "AAPL" } });
```

## Properties

### msg

> **msg**: `M`

Defined in: [core/types.ts:102](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L102)

***

### type

> **type**: `T`

Defined in: [core/types.ts:101](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L101)
