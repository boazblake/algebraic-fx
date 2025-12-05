[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / fetchIO

# Function: fetchIO()

> **fetchIO**(`url`, `options?`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`Promise`\<`Response`\>\>\>

Defined in: [src/helpers/dom-helpers.ts:220](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/helpers/dom-helpers.ts#L220)

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
