[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / fetchIO

# Function: fetchIO()

> **fetchIO**(`url`, `options?`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`Promise`\<`Response`\>\>\>

Defined in: [src/helpers/dom-helpers.ts:220](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/helpers/dom-helpers.ts#L220)

Perform a fetch call inside the DomEnv context.

This is a lightweight effect wrapper for DOM fetch, returning:
  Reader<DomEnv, IO<Promise<Response>>>

For advanced control, prefer httpTask + Task for:
- typed errors
- retries
- cancellation

## Parameters

### url

`string`

URL to fetch.

### options?

`RequestInit`

Fetch init options.

## Returns

[`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`Promise`\<`Response`\>\>\>

## Example

```ts
const effect = fetchIO("/api/users");
runDomIO(effect, env).run().then(r => r.json());
```
