// benchmarks/effects.run.js
import { runBench, printResults } from "./util.js";
import { IO } from "../dist/adt/io.js";
import { Reader } from "../dist/adt/reader.js";
import { runEffects } from "../dist/core/effects.js";
import { fx } from "../dist/core/effects.js";

// ---------------------------------------------
// Helpers
// ---------------------------------------------

const mkIOEffects = (n) => Array.from({ length: n }, () => IO(() => {}));

const mkReaderEffects = (n) =>
  Array.from({ length: n }, () =>
    Reader((env) =>
      IO(() => {
        // touch env so it is not optimized away
        void env.x;
      })
    )
  );

const mkCustomEffects = (n) =>
  Array.from({ length: n }, () =>
    fx((_env, dispatch) => {
      dispatch({ type: "Ping" });
      return undefined;
    })
  );

// ---------------------------------------------
// Main
// ---------------------------------------------

const main = () => {
  const env = { x: 1 };
  const dispatch = () => {};

  const ioFx = mkIOEffects(1000);
  const readerFx = mkReaderEffects(1000);
  const customFx = mkCustomEffects(1000);

  const results = [
    runBench("runEffects IO x1000", 500, () => {
      runEffects(env, dispatch, ioFx);
    }),
    runBench("runEffects Reader x1000", 500, () => {
      runEffects(env, dispatch, readerFx);
    }),
    runBench("runEffects custom x1000", 500, () => {
      runEffects(env, dispatch, customFx);
    }),
  ];

  printResults(results);
};

main();
