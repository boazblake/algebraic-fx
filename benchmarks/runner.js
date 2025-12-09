// benchmarks/runner.js
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const benches = [
  "vdom.create.js",
  "vdom.update.js",
  "effects.run.js",
  "task.combinators.js",
  "render-to-string.js",
];

const run = (file) =>
  new Promise((resolve, reject) => {
    const child = spawn("node", [path.join(__dirname, file)], {
      stdio: "inherit",
    });

    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${file} exited with ${code}`));
    });
  });

const main = async () => {
  console.log("\n=========================================");
  console.log(" algebraic-fx Benchmarks");
  console.log("=========================================\n");

  for (const bench of benches) {
    console.log(`\n>>> Running ${bench} ...\n`);
    await run(bench);
  }

  console.log("\n=========================================");
  console.log(" Benchmarks Completed Successfully");
  console.log("=========================================\n");
};

main().catch((err) => {
  console.error("\nBenchmark runner failed:");
  console.error(err);
  process.exit(1);
});
