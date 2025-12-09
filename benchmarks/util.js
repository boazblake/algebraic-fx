// benchmarks/util.js
import { performance } from "node:perf_hooks";

export const runBench = (name, iterations, f) => {
  // Warmup
  for (let i = 0; i < 10000; i++) f();

  const start = performance.now();
  for (let i = 0; i < iterations; i++) f();
  const end = performance.now();

  const durationMs = end - start;
  const opsPerSec = (iterations / durationMs) * 1000;

  return { name, iterations, durationMs, opsPerSec };
};

export const printResults = (results) => {
  console.table(
    results.map((r) => ({
      name: r.name,
      iterations: r.iterations,
      "ms total": r.durationMs.toFixed(2),
      "ops/s": r.opsPerSec.toFixed(0),
    }))
  );
};
