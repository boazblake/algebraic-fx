# Benchmarks

This repository has a small microbenchmark harness. The harness does not compare frameworks.

These results come from one run on 2026-11-01. The run used Node v24.11.1 on an Apple M4 (arm64, 10 logical CPUs, 16 GiB memory).

| Workload | Iterations | ops/s |
|---|---:|---:|
| vdom.create 10k | 10,000 | 141,771 |
| vdom.update list 200 | 5,000 | 14,119 |
| runEffects IO x1000 | 500 | 66,926 |
| runEffects Reader x1000 | 500 | 3,122 |
| runEffects custom x1000 | 500 | 272,337 |
| Task chain 10k | 10,000 | 2,837,986 |
| Promise chain 10k | 10,000 | 16,852,749 |
| renderToString 5k | 5,000 | 25,897 |

Each workload runs 10,000 warmup calls before timing. The reported `ops/s` value counts benchmark invocations. The effect workloads run a list of 1,000 effects per invocation.

The vdom update workload uses `FakeDocument`. It does not measure browser rendering. The Task and Promise chain workloads do not await completion. They measure chain evaluation and Promise creation.

Run the harness with:

```sh
npm run bench
```

The `benchmarks/runner.js` file starts these workloads in separate Node processes:

- `vdom.create.js`
- `vdom.update.js`
- `effects.run.js`
- `task.combinators.js`
- `render-to-string.js`
