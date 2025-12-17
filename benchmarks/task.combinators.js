// benchmarks/task.combinators.js
import { runBench, printResults } from "./util.js";
import { TaskModule as Task } from "../dist/adt/task.js";

const pureTask = Task.of(1);

// Use module-level combinators in small steps
const step1 = Task.map((x) => x + 1)(pureTask);
const step2 = Task.chain((x) => Task.of(x * 2))(step1);
const chainedTask = Task.map((x) => x - 1)(step2);

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
