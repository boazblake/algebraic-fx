import { IO } from "../adt/io.js";
import type { Program, RawEffect, IOEffect, ReaderEffect } from "./types.js";
import { IOEffectTag, ReaderEffectTag } from "./types.js";
import { browserEnv } from "./dom-env.js";
import type { DomEnv } from "./dom-env.js";

/**
 * A DOM renderer function.
 *
 * The renderer is responsible for:
 * - receiving a root DOM element
 * - receiving a virtual node (vnode)
 * - updating the DOM to reflect the vnode
 *
 * Compatible with `mithril-lite` and similar virtual DOM renderers.
 *
 * @param root Root DOM element to render into
 * @param vnode Virtual node tree to render
 */
export type Renderer = (root: Element, vnode: any) => void;

/**
 * Connects a `Program<M, P, E>` to a DOM renderer and environment, producing
 * an `IO` that, when executed, starts the application runtime.
 *
 * The runtime:
 * - runs `program.init` to obtain the initial model and effects
 * - renders the view via the provided `renderer`
 * - executes effects (`IOEffect`, `ReaderEffect`, or legacy `EffectLike`)
 * - batches dispatches using `requestAnimationFrame`
 *
 * @typeParam M Model type
 * @typeParam P Payload/message type
 *
 * @param renderer Rendering function that updates the DOM
 * @param env Environment used by `Reader<DomEnv, IO<void>>` effects
 *
 * @returns Function that, given a root `IO<Element>` and a `Program`,
 *          produces an `IO` which starts the program when run.
 */
export const renderApp =
  (renderer: Renderer, env: DomEnv = browserEnv()) =>
  <M, P>(
    /**
     * An `IO` that yields the root DOM element to render into.
     */
    rootIO: IO<Element>,
    /**
     * The program definition (init, update, view).
     */
    program: Program<M, P, DomEnv>
  ): IO<{
    /**
     * Enqueue a payload for processing by `program.update`.
     * Dispatches are batched and processed on the next animation frame.
     */
    dispatch: (payload: P) => void;
    /**
     * Retrieve the current model, or `undefined` if not yet initialized.
     */
    getModel: () => M | undefined;
    /**
     * Stop the runtime:
     * - prevents new dispatches from being processed
     * - clears the pending queue
     * - prevents further rendering or effect execution
     *
     * Safe to call multiple times.
     */
    destroy: () => void;
  }> =>
    rootIO
      .map((root) => {
        let model: M | undefined = undefined;
        const queue: P[] = [];
        let queued = false;
        let destroyed = false;

        /**
         * Execute a list of raw effects against the current environment.
         *
         * Handles:
         * - IOEffect
         * - ReaderEffect<E>
         * - EffectLike(env, dispatch)
         * - Legacy EffectLike: run()
         * - Legacy EffectLike: run(env)
         */
        const runEffects = (fx?: RawEffect<DomEnv>[]) => {
          fx?.forEach((effect) => {
            if (!effect) return;

            // Tagged IOEffect
            if ((effect as IOEffect)._tag === IOEffectTag) {
              (effect as IOEffect).io.run();
              return;
            }

            // Tagged ReaderEffect<E>
            if ((effect as ReaderEffect<DomEnv>)._tag === ReaderEffectTag) {
              const r = (effect as ReaderEffect<DomEnv>).reader;
              const io = r.run(env);
              io.run();
              return;
            }

            // EffectLike — new or legacy
            const cand = effect as any;

            if (typeof cand.run === "function") {
              const arity = cand.run.length;

              switch (arity) {
                case 0:
                  // Legacy: run()
                  cand.run();
                  return;

                case 1:
                  // Legacy: run(env)
                  const result = cand.run(env);
                  if (result && typeof result.run === "function") result.run();
                  return;

                default:
                  // New signature: run(env, dispatch)
                  cand.run(env, dispatch);
                  return;
              }
            }
          });
        };
        /**
         * Render the view for the given model and then execute the provided effects.
         *
         * @param m Current model to render
         * @param effects Effects to run after rendering
         */
        const renderAndRunEffects = (m: M, effects: RawEffect<DomEnv>[]) => {
          renderer(root, program.view(m, dispatch));
          runEffects(effects);
        };

        /**
         * Process a single payload:
         * - runs `program.update`
         * - updates the model
         * - renders and executes effects
         *
         * @param payload Message/payload to process
         */
        const step = (payload: P) => {
          if (model === undefined || destroyed) return;
          const { model: next, effects } = program.update(
            payload,
            model,
            dispatch
          );
          model = next;
          renderAndRunEffects(model, effects);
        };

        /**
         * Dispatches a payload to the program's update function.
         *
         * Dispatch is batched:
         * - multiple dispatches in a frame accumulate in `queue`
         * - the batch is processed in the next animation frame
         *
         * This reduces redundant rendering and improves performance.
         *
         * @param payload Message/payload to enqueue
         */
        const dispatch = (payload: P) => {
          if (destroyed) return;
          queue.push(payload);
          if (!queued) {
            queued = true;
            requestAnimationFrame(() => {
              if (destroyed) return;
              const msgs = queue.splice(0, queue.length);
              queued = false; // reset AFTER draining
              for (const msg of msgs) step(msg);
            });
          }
        };

        /**
         * Initialize the program by:
         * - running `program.init`
         * - setting the initial model
         * - rendering and running the initial effects
         */
        const start = () => {
          const { model: m0, effects } = program.init.run();
          model = m0;
          renderAndRunEffects(model, effects);
        };

        return IO(() => {
          start();
          return {
            dispatch,
            getModel: () => model,
            destroy: () => {
              destroyed = true;
              queue.length = 0;
              queued = true;
            },
          };
        });
      })
      .chain((io) => io);
