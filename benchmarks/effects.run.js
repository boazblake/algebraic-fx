// benchmarks/effects.run.js
import { runBench, printResults } from "./util.js";
import { IO } from "../dist/adt/io.js";
import { Reader } from "../dist/adt/reader.js";
import { runEffects, ioEffect, readerEffect } from "../dist/core/render.js";

const mkIOEffects = (n) =>
  Array.from({ length: n }).map(() => ioEffect(IO(() => {})));

const mkReaderEffects = (n) =>
  Array.from({ length: n }).map(() =>
    readerEffect(
      Reader((env) =>
        IO(() => {
          void env.x;
        })
      )
    )
  );

const mkCustomEffects = (n) =>
  Array.from({ length: n }).map(() => ({
    run: (_env, dispatch) => {
      dispatch({ type: "Ping" });
    },
  }));

const main = () => {
  const env = { x: 1 };
  const dispatch = () => {};

  const ioFx = mkIOEffects(1000);
  const readerFx = mkReaderEffects(1000);
  const customFx = mkCustomEffects(1000);

  const results = [
    runBench("runEffects IO x1000", 500, () => {
      runEffects(ioFx, env, dispatch);
    }),
    runBench("runEffects Reader x1000", 500, () => {
      runEffects(readerFx, env, dispatch);
    }),
    runBench("runEffects custom x1000", 500, () => {
      runEffects(customFx, env, dispatch);
    }),
  ];

  printResults(results);
};

main();
