// benchmarks/task.combinators.js
import { runBench, printResults } from "./util.js";
import Task from "../dist/adt/task.js";
import { Right } from "../dist/adt/either.js";

const pureTask = Task.of(1);

const chainedTask = pureTask
  .map((x) => x + 1)
  .chain((x) => Task.of(x * 2))
  .map((x) => x - 1);

const promiseChain = () =>
  Promise.resolve(1)
    .then((x) => x + 1)
    .then((x) => x * 2)
    .then((x) => x - 1);

const main = async () => {
  const results = [
    runBench("Task chain 10k", 10000, () => {
      chainedTask.run();
    }),
    runBench("Promise chain 10k", 10000, () => {
      promiseChain();
    }),
  ];

  printResults(results);
};

main();
